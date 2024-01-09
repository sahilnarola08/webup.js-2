import type { NextPage } from "next";
import { useEffect } from "react";
import styles from "./error.module.scss";
import { ApplicationExceptionForStore } from "../../../exceptions/ApplicationException";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { getError } from "../../../store/reduces/components";
import { AxiosError } from "axios";
import { logError } from "../../../utils/logger";

const Error: NextPage = () => {
  const errorFromState: ApplicationExceptionForStore = useSelector(
    (state: RootState) => getError(state),
  );
  const message = errorFromState?.message;
  const error = errorFromState?.error;
  const cause = errorFromState?.cause;
  const fun = errorFromState?.fun;
  useEffect(() => {
    if (errorFromState) {
      logError("Error from state", "error.tsx", [errorFromState]);
    }
  });
  if (errorFromState) {
    let axiosError = error as AxiosError;
    return (
      <>
        <div className={styles.error}>
          <div className={styles.panel}>
            <h2 className={styles.panel__title}>{"Ops :("}</h2>
          </div>
          <div className={styles.panel__text}>
            {fun && <p>FUN: {fun}</p>}
            <p>{message}</p>
            <p>{error.message}</p>
            {axiosError && <p>{JSON.stringify(axiosError)}</p>}
            <pre>{error.stack}</pre>
            <p>{JSON.stringify(cause)}</p>
          </div>
        </div>
      </>
    );
  }
};

export default Error;
