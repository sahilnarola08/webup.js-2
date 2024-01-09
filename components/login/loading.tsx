import { KupSpinner } from "@sme.up/ketchup-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginState, setLoading } from "../../store/reduces/components";
import { RootState } from "../../store/store";
import styles from "./loading.module.scss";

const Ldng: React.FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => getLoginState(state));

  useEffect(() => {
    const clearLoading = () => {
      setTimeout(() => {
        if (loading) dispatch(setLoading({ loading: false }));
      }, 1000);
    };
    clearLoading();
  });

  return loading ? (
    <div className={styles.spinner} id="main-spinner">
      <KupSpinner active={true} layout={2}></KupSpinner>
    </div>
  ) : null;
};

export default Ldng;
