import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthData,
  InitVariable,
  LoginInfo,
  LoginModuleData,
} from "../../declarations/authDeclarations";
import {
  Component,
  Fun,
  Loading,
  Scheda,
  Section,
  Shapes,
} from "../../declarations/componentDeclarations";
import { Dynamism } from "../../declarations/dynamismDeclarations";
import { ApplicationExceptionForStore } from "../../exceptions/ApplicationException";
import {
  addVariable,
  getGlobalVariable,
} from "../../managers/variablesManager";
import { createFun } from "../../utils/funUtils";
import { RootState } from "../store";
import { Variable } from "../../managers/converters-manager/declarations/data-structures/smeupSch";
import { Message } from "../../managers/converters-manager/declarations/data-structures/smeupDataStructure";
import { logInfo, logWarning } from "../../utils/logger";
import { isMobile as isMobileDevice } from "react-device-detect";

export enum DEVICE {
  W = "W",
  P = "P",
  T = "T",
  C = "C",
}

type ComponentsMap = {
  [id: string]: Component;
};

type ComponentsStateMap = {
  [id: string]: boolean;
};

export type DialogInfo = {
  message: string;
  dynamism: Dynamism;
};

type ComponentsExtraInfoMap = {
  canDoLoad: ComponentsStateMap;
  isBackAction: ComponentsStateMap;
  isNotify: ComponentsStateMap;
  dialog?: DialogInfo;
};

type View = {
  components?: ComponentsMap;
  mainSchedaId?: string;
  mainMenuFun?: Fun;
  extraInfo?: ComponentsExtraInfoMap;
};

type HistoryElement = {
  fun: Fun;
  view?: View;
};

export type VariablesMap = {
  [id: string]: Variable;
};

export interface ApplicationState {
  view?: View;
  globalVariables?: VariablesMap;
  login?: LoginInfo;
  lastFunction?: Fun;
  functionHistory?: HistoryElement[];
  backAction?: boolean;
  error?: ApplicationExceptionForStore;
  messages: Message[];
  device: DEVICE;
  debug: {
    isDebug: boolean;
  };
}

const initialState: ApplicationState = {
  view: {
    components: {},
    mainSchedaId: undefined,
    mainMenuFun: undefined,
    extraInfo: { canDoLoad: {}, isBackAction: {}, isNotify: {} },
  },
  globalVariables: {},
  login: {
    activeModule: null,
    authUser: {},
    state: { loading: true },
    sFunction: null,
    loginError: undefined,
  },
  backAction: false,
  error: undefined,
  lastFunction: null,
  functionHistory: [],
  messages: [],
  device: DEVICE.W,
  debug: { isDebug: false },
};

const componentSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    setError(
      state,
      action: PayloadAction<{ error: ApplicationExceptionForStore }>,
    ) {
      state.error = action.payload.error;
    },
    resetError(state) {
      state.error = undefined;
    },
    setLoginError(
      state,
      action: PayloadAction<{ loginError: ApplicationExceptionForStore }>,
    ) {
      state.login.loginError = action.payload.loginError;
    },
    setLoading(state, action: PayloadAction<{ loading: boolean }>) {
      state.login.state = { loading: action.payload.loading };
    },
    setAuthData(state, action: PayloadAction<{ authData: AuthData }>) {
      cleanStateLocal(state);
      const authDataIn = action.payload.authData;
      const authDataOld = { ...state.login.authUser };
      state.login.authUser = {
        authorization:
          authDataIn.authorization || authDataIn.authorization == ""
            ? authDataIn.authorization
            : authDataOld.authorization,
        debugMode: authDataIn.debugMode
          ? authDataIn.debugMode
          : authDataOld.debugMode,
        env:
          authDataIn.env || authDataIn.env == ""
            ? authDataIn.env
            : authDataOld.env,
        pwd:
          authDataIn.pwd || authDataIn.pwd == ""
            ? authDataIn.pwd
            : authDataOld.pwd,
        server:
          authDataIn.server || authDataIn.server == ""
            ? authDataIn.server
            : authDataOld.server,
        user:
          authDataIn.user || authDataIn.user == ""
            ? authDataIn.user
            : authDataOld.user,
      };
    },
    setActiveLoginModule(
      state,
      action: PayloadAction<{ module: LoginModuleData }>,
    ) {
      state.login.activeModule = action.payload.module;
    },
    setSFunction(state) {
      const url = new URL(window.location.href);
      const sFun = url.searchParams.get("fun");
      cleanStateLocal(state);
      const sf: Variable = sFun
        ? { name: "*SFunction", value: sFun }
        : getGlobalVariable("*SFunction", state.globalVariables);
      if (sf && sf.value) {
        state.login.sFunction = createFun(
          sf.value,
          state.device,
          state.debug.isDebug,
        );
        reducer(state, setLastFunction({ fun: { ...state.login.sFunction } }));
      }
    },
    renewSFunction(state) {
      cleanStateLocal(state);
      if (state.login.sFunction) {
        reducer(state, setLastFunction({ fun: { ...state.login.sFunction } }));
      }
    },
    setLastFunction(
      state,
      action: PayloadAction<{ fun: Fun; isReload?: boolean }>,
    ) {
      reducer(state, resetMessages());
      reducer(state, resetError());
      if (action.payload.fun) {
        state.lastFunction = action.payload.fun;
        reducer(
          state,
          pushToFunctionHistory({
            fun: { ...state.lastFunction },
            isReload: action.payload.isReload,
            checkIfLastIsEqual: false,
          }),
        );
      }
    },
    setMainScheda(
      state,
      action: PayloadAction<{
        id: string;
        component: Scheda;
        makeLoadable: boolean;
      }>,
    ) {
      const newsch = action.payload.component;
      let winId = "";
      if (newsch.laySetup && newsch.laySetup["WinId"]) {
        winId = newsch.laySetup["WinId"];
      }
      action.payload.component.fun = newsch.info;
      action.payload.component.evaluatedFun = createFun(
        newsch.info,
        state.device,
        state.debug.isDebug,
      );
      action.payload.component.evaluatedFun.winId = winId;
      reducer(
        state,
        pushToFunctionHistory({
          fun: { ...action.payload.component.evaluatedFun },
          checkIfLastIsEqual: true,
          isReload: false,
        }),
      );
      /** update saved fun */
      state.functionHistory[state.functionHistory.length - 1].fun =
        action.payload.component.evaluatedFun;
      logInfo(
        "setMainScheda, updated fun in history",
        "components.ts",
        null,
        state.debug.isDebug,
      );
      logFunctionHistory(state);
      state.view.mainSchedaId = action.payload.id;
      logInfo(
        "setMainScheda() id: " + state.view.mainSchedaId,
        "components.ts",
        [action.payload.component],
        state.debug.isDebug,
      );
      reducer(
        state,
        setComponentLoadable({
          id: action.payload.id,
          status: action.payload.makeLoadable,
        }),
      );
      reducer(
        state,
        setComponent({
          id: action.payload.id,
          component: action.payload.component,
        }),
      );
    },
    setComponent(
      state,
      action: PayloadAction<{
        id: string;
        component: Component;
        makeLoadable?: boolean;
      }>,
    ) {
      if (
        action.payload.component &&
        (action.payload.component.type == Shapes.SCH ||
          action.payload.component.type == Shapes.EXD)
      ) {
        const oldsch = state.view.components[action.payload.id] as Scheda;
        reducer(state, resetSchedaComponentsData({ father: oldsch }));
        const newsch = action.payload.component as Scheda;
        if (newsch.laySetup && newsch.laySetup["Menu"]) {
          state.view.mainMenuFun = createFun(
            newsch.laySetup["Menu"],
            state.device,
            state.debug.isDebug,
          );
        }
      }
      if (!action.payload.component.evaluatedFun) {
        action.payload.component.evaluatedFun = createFun(
          action.payload.component.fun,
          state.device,
          state.debug.isDebug,
        );
      }
      state.view.components[action.payload.id] = action.payload.component;
      if (action.payload.makeLoadable == true) {
        reducer(
          state,
          setComponentLoadable({ id: action.payload.id, status: true }),
        );
      }
    },
    setComponentLoadable(
      state,
      action: PayloadAction<{ id: string; status: boolean }>,
    ) {
      state.view.extraInfo.canDoLoad[action.payload.id] = action.payload.status;
    },
    resetSchedaComponentsData(
      state,
      action: PayloadAction<{ father: Scheda }>,
    ) {
      const sch = action.payload.father;
      if (!sch) {
        return;
      }
      const stateSch = state.view.components[sch.id] as Scheda;
      if (!stateSch) {
        return;
      }
      logInfo(
        "resetSchedaComponentsData remove scheda from state: sch.id",
        "components.ts",
        null,
        state.debug.isDebug,
      );
      delete state.view.components[sch.id];
      if (!stateSch.sections || stateSch.sections.length == 0) {
        return;
      }
      for (let i = 0; i < stateSch.sections.length; i++) {
        const sec = stateSch.sections[i];
        reducer(state, resetSectionComponentsData({ father: sec }));
      }
    },
    resetSectionComponentsData(
      state,
      action: PayloadAction<{ father: Section }>,
    ) {
      const sec = action.payload.father;
      if (!sec) {
        return;
      }
      if (sec.components) {
        for (let i = 0; i < sec.components.length; i++) {
          const comp = sec.components[i];
          const stateComp = state.view.components[comp.id] as Component;
          if (stateComp) {
            logInfo(
              "resetSectionComponentsData remove component from state: " +
                comp.id,
              "components.ts",
              null,
              state.debug.isDebug,
            );
            delete state.view.components[comp.id];
          }
          if (comp.type == Shapes.SCH || comp.type == Shapes.EXD) {
            reducer(
              state,
              resetSchedaComponentsData({ father: comp as Scheda }),
            );
          }
        }
      } else if (sec.sections) {
        for (let i = 0; i < sec.sections.length; i++) {
          const ssec = sec.sections[i];
          reducer(state, resetSectionComponentsData({ father: ssec }));
        }
      }
    },
    resetComponentForNotify(
      state,
      action: PayloadAction<{
        id: string;
        makeLoadable: boolean;
        dynamism: Dynamism;
      }>,
    ) {
      const comp = state.view.components[action.payload.id];
      if (comp) {
        if (comp.fun) {
          comp.data = null;
          comp.loaded = false;
        }
        if (action.payload.dynamism) {
          const dynamism = action.payload.dynamism;
          if (dynamism.implicitVariables) {
            if (!comp.variables) {
              comp.variables = {};
            }
            Object.keys(dynamism.implicitVariables).forEach(key => {
              addVariable(comp.variables, dynamism.implicitVariables[key]);
            });
          }
        }
        reducer(
          state,
          setComponentLoadable({
            id: comp.id,
            status: action.payload.makeLoadable,
          }),
        );
        reducer(
          state,
          setComponent({
            id: comp.id,
            component: { ...comp },
          }),
        );
      }
    },
    /**
     * User variables must be save into local memory or cookies
     * @deprecated
     */
    setGlobalVariablesToStore(
      state,
      action: PayloadAction<{
        variables: InitVariable[];
      }>,
    ) {
      state.globalVariables = {};
      for (let i = 0; i < action.payload.variables.length; i++) {
        let varib: InitVariable = action.payload.variables[i];
        reducer(
          state,
          putGlobalVariableToStore({
            variable: {
              name: varib.cod,
              value: varib.value,
            },
          }),
        );
      }
    },
    putGlobalVariableToStore(
      state,
      action: PayloadAction<{
        variable: Variable;
      }>,
    ) {
      addVariable(state.globalVariables, action.payload.variable, true);
    },
    putLoocupVariableToStore(
      state,
      action: PayloadAction<{
        variable: Variable;
      }>,
    ) {
      addVariable(state.globalVariables, action.payload.variable, false);
    },
    putVariableToStore(
      state,
      action: PayloadAction<{
        id: string;
        variable: Variable;
      }>,
    ) {
      let comp = state.view.components[action.payload.id];
      if (!comp.variables) {
        comp.variables = {};
      }
      addVariable(comp.variables, action.payload.variable);
    },
    reloadFromFunctionHistory(state) {
      logInfo(
        "reloadFromFunctionHistory",
        "components.ts",
        null,
        state.debug.isDebug,
      );
      logFunctionHistory(state);
      const lastFromHistory = state.functionHistory?.pop();
      if (lastFromHistory) {
        if (state.backAction) {
          state.view = lastFromHistory.view;
          reducer(state, activeBackActionFlagForComponents());
        }
        reducer(
          state,
          setLastFunction({
            fun: { ...lastFromHistory.fun },
            isReload: true,
          }),
        );
      }
    },
    /** If there are >=2 elements in history, load the previous one */
    backFromFunctionHistory(state, action?: PayloadAction<{ value: string }>) {
      let history = state.functionHistory ? [...state.functionHistory] : null;
      if (!history || history.length <= 1) {
        return;
      }
      logInfo(
        "backFromFunctionHistory",
        "components.ts",
        null,
        state.debug.isDebug,
      );
      logFunctionHistory(state);
      if (history.length > 1) {
        history.pop();
      }
      let found: boolean = true;
      if (action?.payload?.value) {
        logInfo(
          "backFromFunctionHistory to [" + action.payload.value + "]",
          "components.ts",
          null,
          state.debug.isDebug,
        );
        found = false;
        while (!found) {
          const historyElement: HistoryElement = history[history.length - 1];
          const fun: Fun = historyElement.fun;
          logInfo(
            "backFromFunctionHistory fun.winId [" + fun.winId + "]",
            "components.ts",
            null,
            state.debug.isDebug,
          );
          if (fun.winId && fun.winId.trim() == action.payload.value.trim()) {
            found = true;
            break;
          }
          history.pop();
          if (history.length == 0) {
            break;
          }
        }
      }
      if (!found) {
        logWarning(
          "backFromFunctionHistory winId[" +
            action.payload.value +
            "] not found in history! Nothing to do! Stay here!",
          "components.ts",
          null,
          state.debug.isDebug,
        );
        return;
      }
      state.functionHistory = history;
      state.backAction = true;
      reducer(state, reloadFromFunctionHistory());
    },
    activeBackActionFlag(state) {
      state.backAction = true;
    },
    activeBackActionFlagForComponents(state) {
      const keys = Object.keys(state.view.components);
      for (let i = 0; i < keys.length; i++) {
        const component = state.view.components[keys[i]];
        state.view.extraInfo.isBackAction[component.id] = true;
      }
    },
    activeNotifyFlagForComponent(state, action: PayloadAction<{ id: string }>) {
      state.view.extraInfo.isNotify[action.payload.id] = true;
    },
    resetBackActionFlag(state) {
      state.backAction = false;
    },
    resetBackActionFlagForComponent(
      state,
      action: PayloadAction<{ id: string }>,
    ) {
      state.view.extraInfo.isBackAction[action.payload.id] = false;
    },
    resetNotifyFlagForComponent(state, action: PayloadAction<{ id: string }>) {
      state.view.extraInfo.isNotify[action.payload.id] = false;
    },
    pushToFunctionHistory(
      state,
      action: PayloadAction<{
        fun: Fun;
        checkIfLastIsEqual: boolean;
        isReload: boolean;
      }>,
    ) {
      if (action.payload.fun) {
        if (!state.backAction) {
          if (action.payload.isReload) {
            /** do nothing */
          } else if (state.functionHistory.length > 0) {
            const historyElement =
              state.functionHistory[state.functionHistory.length - 1];
            historyElement.view = { ...state.view };
          }
          state.view = {};
          state.view.components = {};
          state.view.extraInfo = {
            canDoLoad: {},
            isBackAction: {},
            isNotify: {},
          };
        }

        let add: boolean = true;
        if (action.payload.checkIfLastIsEqual) {
          const lastHistoryFun =
            state.functionHistory[state.functionHistory.length - 1].fun;
          add = lastHistoryFun.toString() !== action.payload.fun.toString();
        }
        if (add) {
          state.functionHistory.push({ fun: action.payload.fun });
          logInfo(
            "pushToFunctionHistory",
            "components.ts",
            null,
            state.debug.isDebug,
          );
          logFunctionHistory(state);
        }
      }
    },
    resetMessages(state) {
      state.messages = [];
    },
    addMessages(state, action: PayloadAction<{ messages: Message[] }>) {
      if (!state.messages) {
        state.messages = [];
      }
      state.messages.push(...action.payload.messages);
    },
    setDialogInfo(
      state,
      action: PayloadAction<{ message: string; dynamism: Dynamism }>,
    ) {
      state.view.extraInfo.dialog = {
        message: action.payload.message,
        dynamism: action.payload.dynamism,
      };
    },
    resetDialogInfo(state) {
      state.view.extraInfo.dialog = undefined;
    },
    switchDevice(state) {
      state.device = state.device == DEVICE.W ? DEVICE.P : DEVICE.W;
    },
    setResetDevice(state) {
      state.device = isMobileDevice ? DEVICE.P : DEVICE.W;
    },
    switchDebug(state) {
      state.debug.isDebug = !state.debug.isDebug;
    },
  },
});

export const {
  setError,
  resetError,
  setLoginError,
  setMainScheda,
  setComponent,
  setComponentLoadable,
  setLoading,
  setGlobalVariablesToStore,
  putGlobalVariableToStore,
  putLoocupVariableToStore,
  putVariableToStore,
  setActiveLoginModule,
  setAuthData,
  setSFunction,
  renewSFunction,
  setLastFunction,
  resetSchedaComponentsData,
  resetSectionComponentsData,
  resetComponentForNotify,
  reloadFromFunctionHistory,
  backFromFunctionHistory,
  pushToFunctionHistory,
  activeBackActionFlag,
  activeBackActionFlagForComponents,
  activeNotifyFlagForComponent,
  resetBackActionFlag,
  resetBackActionFlagForComponent,
  resetNotifyFlagForComponent,
  resetMessages,
  addMessages,
  setDialogInfo,
  resetDialogInfo,
  switchDevice,
  setResetDevice,
  switchDebug,
} = componentSlice.actions;

export const getError = (state: RootState): ApplicationExceptionForStore =>
  state.components.error;
export const getLoginError = (state: RootState): ApplicationExceptionForStore =>
  state.components.login.loginError;
export const getMainScheda = (state: RootState): Scheda => {
  if (state?.components?.view?.mainSchedaId) {
    return state?.components?.view?.components[
      state?.components?.view?.mainSchedaId
    ] as Scheda;
  }
  return null;
};
export const getMainMenuFun = (state: RootState): Fun =>
  state.components?.view?.mainMenuFun;
export const getComponentById = (state: RootState, id: string): Component => {
  return id ? state.components?.view?.components[id] : null;
};
export const getComponentByScriptId = (
  state: RootState,
  id: string,
  schedaId: string,
): Component => {
  const component = getComponentById(state, id);
  if (component != null) {
    return component;
  }
  const components = getSchedaComponents(
    getComponentById(state, schedaId) as Scheda,
  );
  if (components) {
    for (let i = 0; i < components.length; i++) {
      const component = components[i];
      if (component.fromScriptId == id) {
        return component;
      }
    }
  }
  if (schedaId && schedaId != state.components.view.mainSchedaId) {
    return getComponentByScriptId(
      state,
      id,
      state.components.view.mainSchedaId,
    );
  }
  return null;
};
export const getSFunction = (state: RootState): Fun =>
  state?.components?.login?.sFunction;
export const getLastFunction = (state: RootState): Fun =>
  state?.components?.lastFunction;
export const isBackAction = (state: RootState): boolean =>
  state?.components?.backAction;
export const isBackActionForComponent = (
  state: RootState,
  id: string,
): boolean => state?.components?.view?.extraInfo?.isBackAction[id];
export const isNotifyForComponent = (state: RootState, id: string): boolean =>
  state?.components?.view?.extraInfo?.isNotify[id];
export const getGlobalVariables = (state: RootState): VariablesMap =>
  state?.components?.globalVariables;
export const getMessages = (state: RootState): Message[] =>
  state.components.messages;
export const isComponentLoadable = (state: RootState, id: string): boolean =>
  state.components.view.extraInfo.canDoLoad[id];
export const getLoginActiveModule = (state: RootState): LoginModuleData =>
  state.components.login.activeModule;
export const getLoginAuthUserData = (state: RootState): AuthData =>
  state.components.login.authUser;
export const getLoginState = (state: RootState): Loading =>
  state.components.login.state;
export const getDialogInfo = (state: RootState): DialogInfo =>
  state.components.view.extraInfo.dialog;
export const isMobile = (state: RootState): boolean =>
  state.components.device == DEVICE.P;
export const getDevice = (state: RootState): string => state.components.device;
export const isDebug = (state: RootState): boolean =>
  state.components.debug.isDebug;

const reducer = componentSlice.reducer;
export default reducer;

const getSchedaComponents = (scheda: Scheda): Component[] => {
  if (!scheda) {
    return null;
  }
  const components = [];
  if (scheda.sections) {
    for (let i = 0; i < scheda.sections.length; i++) {
      components.push(...getSectionComponents(scheda.sections[i]));
    }
  }
  return components;
};

const getSectionComponents = (section: Section): Component[] => {
  if (section.components) {
    return section.components;
  }
  const components = [];
  if (section.sections) {
    for (let i = 0; i < section.sections.length; i++) {
      components.push(...getSectionComponents(section.sections[i]));
    }
  }
  return components;
};

const cleanStateLocal = (state: ApplicationState) => {
  state.view = {
    components: {},
    mainSchedaId: undefined,
    mainMenuFun: undefined,
    extraInfo: { canDoLoad: {}, isBackAction: {}, isNotify: {} },
  };
  state.backAction = false;
  state.error = undefined;
  state.lastFunction = null;
  state.functionHistory = [];
  state.messages = [];
};

const logFunctionHistory = (state: ApplicationState) => {
  logInfo("logFunctionHistory", "components.ts", null, state.debug.isDebug);
  for (let i = 0; i < state.functionHistory.length; i++) {
    const el: HistoryElement = state.functionHistory[i];
    logInfo(
      "[" + el.fun.winId + "]" + " - " + el.fun.toString(),
      "components.ts",
      null,
      state.debug.isDebug,
    );
  }
};
