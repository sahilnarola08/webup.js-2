import { KupCardData, KupCardFamily } from "@sme.up/ketchup";
import { KupCard, KupDialog } from "@sme.up/ketchup-react";
import { KupCardBuiltInMessageBoxOptions } from "@sme.up/ketchup/dist/types/components/kup-card/kup-card-declarations";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import executeDynamism from "../../../managers/dynamismManager";
import {
  DialogInfo,
  getDialogInfo,
  resetDialogInfo,
} from "../../../store/reduces/components";
import { RootState } from "../../../store/store";

const Dialog = () => {
  const dialogInfo: DialogInfo = useSelector((state: RootState) =>
    getDialogInfo(state),
  ) as DialogInfo;
  const dispatch = useDispatch();

  const onConfirm = () => {
    executeDynamism(dialogInfo.dynamism, dispatch);
    dispatch(resetDialogInfo());
  };

  const onReady = () => {};
  const onClose = () => {
    dispatch(resetDialogInfo());
  };

  useEffect(() => {});

  if (dialogInfo) {
    const data: KupCardData = {
      options: {
        text: dialogInfo.message,
        cancelCb: onClose,
        confirmCb: onConfirm,
      } as KupCardBuiltInMessageBoxOptions,
    };

    return (
      <div>
        <KupDialog
          modal={{ closeOnBackdropClick: false }}
          onKup-dialog-close={onClose}
          onKup-dialog-ready={onReady}
          header={null}
          resizable={false}
        >
          {
            (
              <KupCard
                layoutNumber={6}
                layoutFamily={"built-in" as KupCardFamily}
                data={data}
              ></KupCard>
            ) as any
          }
        </KupDialog>
      </div>
    );
  }
};

export default Dialog;
