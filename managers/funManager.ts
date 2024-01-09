import { store } from "../store/store";
import { evaluateFun } from "./evaluationManager";
import {
  Component,
  Fun,
  Scheda,
  VirtualFun,
  VirtualFunType,
} from "../declarations/componentDeclarations";
import { createFun } from "../utils/funUtils";
import {
  checkMessages,
  isFBKData,
  isScheda,
  prepareScheda,
} from "../utils/componentUtils";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import router from "next/router";
import ClientConstant from "../constants/client";
import {
  backFromFunctionHistory,
  getDevice,
  isDebug,
  setLastFunction,
} from "../store/reduces/components";
import { SmeupDataStructure } from "./converters-manager/declarations/data-structures/smeupDataStructure";
import { executeNotify, notifyIds } from "./notifyManager";
import { executeActions, hasActions } from "./actionsManager";
import ClientConstants from "../constants/client";
import {
  getLOOVariablesFromResponse,
  getSCHVariablesFromResponse,
  getSECVariablesFromResponse,
  saveLooVariables,
  saveSchVariables,
  saveSecVariables,
  saveVariables,
} from "./variablesManager";
import { VariableTypes } from "./converters-manager/declarations/data-structures/smeupSch";
import { Dynamism } from "../declarations/dynamismDeclarations";
import { logFUN } from "../utils/logger";

/**
 * Execute fun
 * Send fun to server side
 * @param rawFun
 * @returns response
 */
export const executeFun = async (rawFun: string): Promise<any> => {
  if (rawFun) {
    if (rawFun != "PING") {
      const fun = createFun(
        rawFun,
        getDevice(store.getState()),
        isDebug(store.getState()),
      );
      rawFun = fun.toString();
    }

    // get jwt header and signature from local storage
    const jwtHeaderAndPayload = localStorage.getItem(
      "accessTokenHeaderAndPayload",
    );
    // send fun to server side
    logFUN("launchFun [" + rawFun + "]", "funManager.ts");
    try {
      const response = await axios.post(
        ClientConstants.APIS.FUN,
        {
          fun: rawFun,
        },
        {
          headers: {
            "content-type": "application/json;charset=UTF-8",
            "x-smeup-access-token": jwtHeaderAndPayload,
          },
        },
      );
      logFUN("executeFun() response.data", "funManager.ts", [
        JSON.parse(JSON.stringify(response.data)),
      ]);
      return response.data;
    } catch (error) {
      logFUN("executeFun() exception", "funManager.ts", [error], true);
      // check unauthorized
      if (axios.isAxiosError(error) && error.response.status == 401) {
        //TODO: refresh token
        // return to login page
        router.push(ClientConstant.ROUTES.LOGIN);
      } else {
        throw error;
      }
    }
  }
};

export const executeFunForScheda = async (
  funIn: string,
  component: Component,
  originalSchedaId: string,
  dispatch: Dispatch<AnyAction>,
  defaultDSep: string,
  dynamism?: Dynamism,
): Promise<SmeupDataStructure> => {
  const data: SmeupDataStructure = await executeFunForComponentData(
    funIn,
    component,
    originalSchedaId,
    dispatch,
    dynamism,
  );
  if (!isFBKData(data) && isScheda(data)) {
    prepareScheda(data as Scheda, originalSchedaId, defaultDSep);
    saveLooVariables(getLOOVariablesFromResponse(data), dispatch);
    const schV = getSCHVariablesFromResponse(data);
    const secV = getSECVariablesFromResponse(data);
    saveVariables(schV, undefined, data as Scheda, undefined, [
      VariableTypes.SCH,
    ]);
    saveVariables(secV, undefined, data as Scheda, undefined, [
      VariableTypes.SEC,
    ]);
  }
  return data;
};

export const executeFunForComponentData = async (
  funIn: string,
  component: Component,
  originalSchedaId: string,
  dispatch: Dispatch<AnyAction>,
  dynamism?: Dynamism,
): Promise<SmeupDataStructure> => {
  const rawFun = evaluateFun(funIn, component);
  const evaluatedFun = createFun(
    rawFun,
    getDevice(store.getState()),
    isDebug(store.getState()),
  );
  if (evaluatedFun.virtualFun) {
    manageVirtualFun(evaluatedFun, component, dispatch, dynamism);
    return null;
  }
  const data = await executeFun(evaluatedFun.toString());
  // setting variables into source component
  if (component && !isScheda(component)) {
    saveLooVariables(getLOOVariablesFromResponse(data), dispatch);
    saveSchVariables(getSCHVariablesFromResponse(data), dispatch);
    saveSecVariables(getSECVariablesFromResponse(data), component, undefined);
  }
  let makeLoadable = false;
  if (isFBKData(data) && !hasActions(data)) {
    makeLoadable = true;
  } else if (!isScheda(data)) {
    makeLoadable = true;
  } else if (isScheda(data) && originalSchedaId) {
    makeLoadable = true;
  }
  executeNotify(
    funIn,
    component ? component.schedaId : null,
    makeLoadable,
    dispatch,
  );
  executeActions(data, dispatch);
  checkMessages(data, dispatch);
  return data;
};

const VIRTUAL_FUNS: string[] = ["CLOSE", "EXECUTE"];
export const isVirtualFun = (funIn: string): boolean => {
  if (!funIn) {
    return false;
  }
  funIn = funIn.trim().toUpperCase();
  return VIRTUAL_FUNS.findIndex(x => x == funIn) != -1;
};

export const manageVirtualFun = (
  fun: Fun,
  component: Component,
  dispatch: Dispatch<AnyAction>,
  dynamism?: Dynamism,
) => {
  if (!fun) {
    return;
  }
  switch (fun.virtualFun.type) {
    case VirtualFunType.CLOSE: {
      manageVirtualFunCLOSE(fun, component, dispatch);
      break;
    }
    case VirtualFunType.EXECUTE: {
      manageVirtualFunEXECUTE(fun, component, dispatch);
      break;
    }
    case VirtualFunType.LOAD:
    case VirtualFunType.RELOAD: {
      manageVirtualFunLOAD(fun, component, dispatch, dynamism);
      break;
    }
  }
};

const manageVirtualFunCLOSE = (
  fun: Fun,
  component: Component,
  dispatch: Dispatch<AnyAction>,
) => {
  const virtualFun: VirtualFun = fun.virtualFun;
  dispatch(
    backFromFunctionHistory({
      value: evaluateFun(virtualFun.value, component),
    }),
  );
};

//TODO: temporary
export function getPingIntervalMs() {
  let seconds: number = process.env.pingSecondsInterval
    ? parseInt(process.env.pingSecondsInterval)
    : NaN;
  if (isNaN(seconds) || seconds == 0) {
    seconds = 60;
  }
  return seconds * 1000;
}

//TODO: temporary
export const ping = async () => {
  await executeFun("PING");
};

const manageVirtualFunEXECUTE = (
  fun: Fun,
  component: Component,
  dispatch: Dispatch<AnyAction>,
) => {
  const virtualFun: VirtualFun = fun.virtualFun;
  if (virtualFun.value) {
    dispatch(
      setLastFunction({
        fun: createFun(
          evaluateFun(virtualFun.value, component),
          getDevice(store.getState()),
          isDebug(store.getState()),
        ),
      }),
    );
  }
};

const manageVirtualFunLOAD = (
  fun: Fun,
  component: Component,
  dispatch: Dispatch<AnyAction>,
  dynamism?: Dynamism,
) => {
  notifyIds(fun.virtualFun.value, component.schedaId, true, dispatch, dynamism);
};
