import { KupSnackbar } from "@sme.up/ketchup-react";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "../../login/loading.module.scss";

import { useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { getMessages, resetMessages } from "../../../store/reduces/components";
import {
  Message,
  MessageMode,
} from "../../../managers/converters-manager/declarations/data-structures/smeupDataStructure";

/* global HTMLKupSnackbarElement */

const Snackbar: React.FC = () => {
  const messages: Message[] = useSelector((state: RootState) =>
    getMessages(state),
  );
  const dispatch = useDispatch();

  const snackBarRef: React.RefObject<HTMLKupSnackbarElement> = useRef(null);

  const onClick = () => {
    dispatch(resetMessages());
  };

  useEffect(() => {
    const snackBarRefLocal = snackBarRef.current;

    async function buildComponent() {
      if (snackBarRefLocal && messages && messages.length > 0) {
        let message = messages[messages.length - 1];
        snackBarRefLocal.text = message.message;
        if (message.mode == MessageMode.TS) {
          snackBarRefLocal.timeout = 2000;
        } else {
          snackBarRefLocal.timeout = null;
        }
        snackBarRefLocal.show();
      }
    }
    buildComponent().then(() => {
      if (messages && messages.length > 0) {
        // event listeners
        snackBarRefLocal.show();
      }
    });
  });

  if (messages && messages.length > 0) {
    return (
      <div className={styles.snackbar} id="snackbar">
        <KupSnackbar
          closeButton={false}
          ref={snackBarRef}
          actionButton={{ icon: "close" }}
          onKup-snackbar-actionclick={onClick}
          onKup-snackbar-timeoutcomplete={onClick}
        ></KupSnackbar>
      </div>
    );
  }
};

export default Snackbar;
