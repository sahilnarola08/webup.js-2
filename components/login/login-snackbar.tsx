import { KupSnackbar } from "@sme.up/ketchup-react";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ApplicationExceptionForStore } from "../../exceptions/ApplicationException";
import { RootState } from "../../store/store";
import styles from "./loading.module.scss";
import { getLoginError, setLoginError } from "../../store/reduces/components";
import { EventHandlersMap } from "../../declarations/componentDeclarations";
import {
  addEventHandler,
  removeEventHandlers,
} from "../../utils/componentUtils";
import { useDispatch } from "react-redux";

/* global HTMLKupSnackbarElement */

const LoginSnackbar: React.FC = () => {
  const errorFromState: ApplicationExceptionForStore = useSelector(
    (state: RootState) => getLoginError(state),
  );
  const dispatch = useDispatch();

  const snackBarRef: React.RefObject<HTMLKupSnackbarElement> = useRef(null);

  const onClick = () => {
    dispatch(setLoginError({ loginError: null }));
  };

  useEffect(() => {
    let eventHandlers: EventHandlersMap = {};
    const snackBarRefLocal = snackBarRef.current;

    async function buildComponent() {
      if (snackBarRefLocal && errorFromState) {
        snackBarRefLocal.text = errorFromState.message;
        snackBarRefLocal.show();
      }
    }
    buildComponent().then(() => {
      if (errorFromState) {
        // event listeners
        if (Object.keys(eventHandlers).length == 0 && snackBarRefLocal) {
          let eventName = "kup-snackbar-actionclick";
          let handler = onClick;
          addEventHandler(eventHandlers, eventName, snackBarRefLocal, handler);
        }
        snackBarRefLocal.show();
      }
    });
    return () => {
      if (Object.keys(eventHandlers).length > 0) {
        removeEventHandlers(eventHandlers);
        eventHandlers = {};
      }
    };
  });

  if (errorFromState) {
    return (
      <div className={styles.snackbar} id="login-snackbar">
        <KupSnackbar
          closeButton={false}
          ref={snackBarRef}
          actionButton={{ icon: "close" }}
        ></KupSnackbar>
      </div>
    );
  }
};

export default LoginSnackbar;
