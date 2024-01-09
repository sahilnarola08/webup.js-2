import { store } from "../store/store";
import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { Component, Fun, Scheda } from "../declarations/componentDeclarations";
import {
  activeNotifyFlagForComponent,
  getComponentByScriptId,
  getDevice,
  getMainScheda,
  isDebug,
  resetComponentForNotify,
  setMainScheda,
} from "../store/reduces/components";
import { getCopyOfComponent } from "../utils/componentUtils";
import { createFun } from "../utils/funUtils";
import { Dynamism } from "../declarations/dynamismDeclarations";
import { logWarning } from "../utils/logger";

/**
 * NOTIFY
 * Types:
 *  - NOTIFY(ID): Notify component with id=ID
 *  - NOTIFY(ID1/ID2/ID3): Notify multiple components
 *  - NOTIFY(*SUB): TODO
 *  - NOTIFY(YES): Notify main scheda (reload)
 */
export const executeNotify = (
  fun: Fun | string,
  schedaId: string,
  makeLoadable: boolean,
  dispatch: Dispatch<AnyAction>,
) => {
  let funLocal = null;
  if (typeof fun == "string") {
    funLocal = createFun(
      fun,
      getDevice(store.getState()),
      isDebug(store.getState()),
    );
  } else {
    funLocal = fun;
  }
  if (funLocal.notify) {
    switch (funLocal.notify.trim().toLowerCase()) {
      case "yes": {
        // ricarica main scheda
        let target = getCopyOfComponent(getMainScheda(store.getState()));
        (target as Scheda).sections = null;
        target.loaded = false;
        dispatch(activeNotifyFlagForComponent({ id: target.id }));
        dispatch(
          setMainScheda({
            id: target.id,
            component: target as Scheda,
            makeLoadable: makeLoadable,
          }),
        );
        break;
      }
      case "*sub": {
        //TODO: Notify *SUB
        break;
      }
      case "close": {
        //TODO: Notify CLOSE
        break;
      }
      default: {
        notifyIds(funLocal.notify, schedaId, makeLoadable, dispatch);
      }
    }
  }
};

export const notifyIds = (
  rawIds: string,
  schedaId: string,
  makeLoadable: boolean,
  dispatch: Dispatch<AnyAction>,
  dynamism?: Dynamism,
) => {
  rawIds = rawIds.replace(/\\/g, "/");
  const ids: string[] = rawIds.split("/");
  ids.forEach((id: string) => {
    const notifyComponent: Component = getComponentByScriptId(
      store.getState(),
      id,
      schedaId,
    );
    // exec fun
    if (notifyComponent) {
      dispatch(activeNotifyFlagForComponent({ id: notifyComponent.id }));
      dispatch(
        resetComponentForNotify({
          id: notifyComponent.id,
          makeLoadable: makeLoadable,
          dynamism: dynamism,
        }),
      );
    } else {
      logWarning(
        "notifyIds component not found id=[" + id + "]",
        "notifyManager.ts",
      );
    }
  });
};
