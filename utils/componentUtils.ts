import { store } from "../store/store";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { KupDataTableComponent } from "../managers/converters-manager/converters/components/smeup/exb-mat/dataTable";
import {
  KupTreeComponent,
  TreeNodeExt,
} from "../managers/converters-manager/converters/components/smeup/tre/tree";
import {
  SmeupDataStructure,
  SmeupDataStructureType,
} from "../managers/converters-manager/declarations/data-structures/smeupDataStructure";
import { isSmeupObjectArray } from "../managers/converters-manager/utils/smeupDataStructuresUtilities";
import {
  BoxList,
  ButtonList,
  Component,
  ComponentEntity,
  DashList,
  DataTable,
  EventHandlersMap,
  Image,
  InputPanel,
  Label,
  Planner,
  RawComponent,
  Scheda,
  Section,
  Shapes,
  Spotlight,
  Tree,
} from "../declarations/componentDeclarations";
import { ComponentException } from "../exceptions/ComponentException";
import { convertersManager } from "../managers/convertersManager";
import handleError from "../managers/errorManager";
import {
  executeFun,
  executeFunForComponentData,
  executeFunForScheda,
} from "../managers/funManager";
import {
  addMessages,
  getComponentById,
  getMainScheda,
  isBackActionForComponent,
  isComponentLoadable,
  resetBackActionFlagForComponent,
  setComponent,
  setComponentLoadable,
} from "../store/reduces/components";
import { KupButtonListComponent } from "../managers/converters-manager/converters/components/smeup/btn/buttonList";
import {
  InputPanelOptions,
  KupInputPanelComponent,
} from "../managers/converters-manager/converters/components/smeup/inp/inputPanel";
import { layoutFun } from "../managers/inputPanelManager";
import { KupLabelComponent } from "../managers/converters-manager/converters/components/smeup/lab/label";
import { DynamismEntity } from "../declarations/dynamismDeclarations";
import { SmeupLayout } from "../managers/converters-manager/declarations/data-structures/smeupLayout";
import { evaluateExpression } from "../managers/evaluationManager";
import { KupDashListComponent } from "../managers/converters-manager/converters/components/smeup/dsh/dashList";
import { ApplicationException } from "../exceptions/ApplicationException";
import { isDevelopmentEnv } from "./local";
import { MutableRefObject } from "react";
import {
  KupPlannerComponent,
  PlannerOptions,
} from "../managers/converters-manager/converters/components/smeup/pln/planner";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";
import {
  BoxListOptions,
  KupBoxListComponent,
} from "../managers/converters-manager/converters/components/smeup/box/boxList";
import { addVariable } from "../managers/variablesManager";
import { ComponentOptions } from "../managers/converters-manager/declarations/component";
import { logInfo, logWarning } from "./logger";
import { KupImageComponent } from "../managers/converters-manager/converters/components/smeup/img/image";

/**
 * Generate component id
 * @returns id "ixxxx"
 */
const createComponentId = (): string => {
  return "i" + Math.round(Math.random() * 100000) + 1;
};

/**
 * Is RawComponent function
 * @param component
 * @returns
 */
export const isRawComponent = (component: any): component is RawComponent => {
  return !component.config && !component.sections;
};

/**
 * Is FBKData response
 * @param component
 * @returns
 */
export const isFBKData = (component: any): component is SmeupDataStructure => {
  return component && component.type == SmeupDataStructureType.SMEUP_FBK_DATA;
};

export const prepareScheda = (
  scheda: Scheda,
  originalSchedaId: string,
  defaultDSep: string,
) => {
  if (!scheda) {
    return;
  }
  if (!scheda.dSep) {
    scheda.dSep = defaultDSep;
  }
  scheda.fromScriptId = scheda.id;
  scheda.id = originalSchedaId ?? createComponentId();
  if (!scheda.fromScriptId) {
    scheda.fromScriptId = scheda.id;
  }
  scheda.variables = {};
  const schFromState = getComponentById(store.getState(), scheda.id) as Scheda;
  if (schFromState?.variables) {
    Object.keys(schFromState.variables).forEach(varName => {
      addVariable(scheda.variables, schFromState.variables[varName]);
    });
  }
  if (!scheda.sections) {
    return;
  }
  for (let i = 0; i < scheda.sections.length; i++) {
    prepareSection(scheda.sections[i], scheda.id, defaultDSep);
  }
};

const prepareSection = (
  section: Section,
  schedaId: string,
  defaultDSep: string,
) => {
  section.fromScriptId = section.id;
  section.id = createComponentId();
  if (!section.fromScriptId) {
    section.fromScriptId = section.id;
  }
  if (section.sections && section.sections.length > 0) {
    for (let i = 0; i < section.sections.length; i++) {
      prepareSection(section.sections[i], schedaId, defaultDSep);
    }
  }
  if (section.components && section.components.length > 0) {
    for (let j = 0; j < section.components.length; j++) {
      let component: Component = section.components[j];
      if (isScheda(component)) {
        prepareScheda(component as Scheda, undefined, defaultDSep);
        component.schedaId = schedaId;
      } else {
        component.fromScriptId = component.id;
        component.id = createComponentId();
        if (!component.fromScriptId) {
          component.fromScriptId = component.id;
        }
        component.schedaId = schedaId;
        if (
          component.type === Shapes.SPL &&
          !component.fun &&
          !component.data
        ) {
          component.data = { rows: [] };
        }
        if (component.data) {
          component.dataFromScript = component.data;
          component.data = undefined;
        }
      }
    }
  }
};

export const getCopyOfComponent = (component: Component): Component => {
  if (!component) {
    return undefined;
  }
  const componentCopy = JSON.parse(JSON.stringify(component)) as Component;
  return componentCopy;
};

export const getTitle = (component: Component): string => {
  if (!component) {
    return "";
  }
  if (!component.title && !component.subNote) {
    return "";
  }
  if (component.title && component.title.trim().toLowerCase() !== "*none") {
    return component.title;
  }
  if (component.subNote && component.subNote.trim().toLowerCase() !== "*none") {
    return component.subNote;
  }
  return "";
};

export const addEventHandler = (
  eventHandlers: EventHandlersMap,
  eventName: string,
  component: HTMLElement,
  eventHandler: any,
) => {
  if (!eventHandlers || !eventName || !component || !eventHandler) {
    return;
  }
  component.addEventListener(eventName, eventHandler);
  let handlers = eventHandlers[eventName]?.handlers;
  if (!handlers) {
    eventHandlers[eventName] = {
      handlers: [{ component: component, handler: eventHandler }],
    };
  } else {
    handlers.push({ component: component, handler: eventHandler });
  }
};

export const removeEventHandlers = (eventHandlers: EventHandlersMap) => {
  if (!eventHandlers) {
    return;
  }
  const eventNames = Object.keys(eventHandlers);
  if (!eventNames || eventNames.length == 0) {
    return;
  }
  for (let i = 0; i < eventNames.length; i++) {
    const eventName = eventNames[i];
    const handlers = eventHandlers[eventName].handlers;
    if (!handlers) {
      continue;
    }
    for (let j = 0; j < handlers.length; j++) {
      const handler = handlers[j];
      handler.component.removeEventListener(eventName, handler.handler);
    }
  }
};

export const componentClass = (
  component: Scheda | Section,
  styles: {
    readonly [key: string]: string;
  },
): string => {
  const orientation = component?.layout;
  const hasSections = component?.sections;

  const classes = `${
    orientation !== "column"
      ? styles.grid__cell__auto_columns
      : styles.grid__cell__auto_rows
  } ${styles.grid__cell} ${hasSections ? styles.grid__wrapper : ""}`;
  return classes;
};

export const componentStyles = (
  component: Scheda | Section,
  isDasboardUiMode: boolean,
): {} => {
  const hasSections = component?.sections;
  let styles = {};
  let gridTemplate = "";
  if (hasSections) {
    component.sections.forEach(subSection => {
      let dim = "var(--webup-grid-cell-size)";
      if (
        subSection.dim &&
        (component.layout !== "column" || isDasboardUiMode)
      ) {
        dim =
          subSection.dim.indexOf("%") < 0
            ? subSection.dim + "px"
            : subSection.dim;
      }
      gridTemplate = gridTemplate + " " + dim;
    });
    if (component.layout !== "column") {
      styles["gridTemplateColumns"] = gridTemplate;
    } else {
      styles["gridTemplateRows"] = gridTemplate;
    }
  }
  return styles;
};

export const getComponentOptions = (
  type: Shapes,
  componentOptions: any,
  isSetupEntriesByComponent?: boolean,
) => {
  if (!componentOptions) {
    return { shape: type } as ComponentOptions;
  }
  let options: ComponentOptions = null;

  if (componentOptions[type]) {
    options = isSetupEntriesByComponent
      ? componentOptions[type][0].attributes
      : componentOptions[type].default;
  }
  if (!options) {
    switch (type) {
      case Shapes.CHA: {
        if (
          componentOptions[Shapes.EXA] &&
          componentOptions[Shapes.EXA].length > 0
        ) {
          options = componentOptions[Shapes.EXA][0].attributes;
        }
        break;
      }
      // case Shapes.EXA: {
      //   options = componentOptions[Shapes.CHA].default;
      //   break;
      // }
      case Shapes.MAT: {
        if (
          componentOptions[Shapes.EXB] &&
          componentOptions[Shapes.EXB].length > 0
        ) {
          options = componentOptions[Shapes.EXB][0].attributes;
        }
        break;
      }
      // case Shapes.EXB: {
      //   options = componentOptions[Shapes.MAT].default;
      //   break;
      // }
      case Shapes.SCH: {
        if (
          componentOptions[Shapes.EXD] &&
          componentOptions[Shapes.EXD].length > 0
        ) {
          options = componentOptions[Shapes.EXD][0].attributes;
        }
        break;
      }
      // case Shapes.EXD: {
      //   options = componentOptions[Shapes.SCH].default;
      //   break;
      // }
    }
  }
  if (options && !options.shape) {
    options.shape = type;
  }
  return options;
};

export const setComponentOptions = (
  type: Shapes,
  component: Component,
  componentOptionsForType: ComponentOptions,
) => {
  if (!component || !componentOptionsForType) {
    return;
  }
  if (!component.options) {
    component.options = {};
  }
  if (!component.options[type]) {
    component.options[type] = {};
  }
  component.options[type].default = componentOptionsForType;
};

export const preElabComponent = async (
  componentFromState: Component,
  componentFromProps: Component,
  type: Shapes,
  firstCall: MutableRefObject<boolean>,
  dispatch: Dispatch<AnyAction>,
  kupManager: KupManager,
): Promise<boolean> => {
  if (firstCall.current && isDevelopmentEnv()) {
    // work-around 2 useEffect in Development mode
    // see https://github.com/facebook/react/issues/24502
    logWarning(
      "type[" +
        type +
        "] firstCall && isDevelopmentEnv - work-around 2 useEffect()",
      "componentUtils.ts",
    );
    firstCall.current = false;
    return false;
  }
  firstCall.current = false;

  const original = componentFromState ? componentFromState : componentFromProps;
  if (isBackActionForComponent(store.getState(), original.id)) {
    logInfo(
      "[" + type + "] isBackActionForComponent reset flag",
      "componentUtils.ts",
    );
    dispatch(resetBackActionFlagForComponent({ id: original.id }));
    if (componentHasData(type, original)) {
      return true;
    }
    logWarning(
      "[" + type + "] isBackActionForComponent but component has no data!!!",
      "componentUtils.ts",
    );
  }

  const component: Component = getCopyOfComponent(original);
  initializeComponentByType(type, component);

  try {
    if (!componentFromState) {
      dispatch(
        setComponentLoadable({
          id: component.id,
          status: !isLoadDComponent(component),
        }),
      );
      // save component into store, without data, will be load the next time
      dispatch(
        setComponent({
          id: component.id,
          component: component,
        }),
      );
    } else if (!isComponentLoadable(store.getState(), original.id)) {
      dispatch(
        setComponentLoadable({
          id: original.id,
          status: true,
        }),
      );
    } else {
      let rawComponentData: SmeupDataStructure | ComponentEntity;
      let rawOtherComponentData: SmeupDataStructure | ComponentEntity;
      let layout: SmeupLayout;
      let dynamisms: DynamismEntity[];

      if (!componentHasData(type, original) || !original.loaded) {
        let maintainVariables: boolean = false;
        if (component.fun) {
          if (isTypeScheda(type)) {
            rawComponentData = await executeFunForScheda(
              component.fun,
              component,
              original.id,
              dispatch,
              getMainScheda(store.getState()).dSep,
            );
          } else {
            rawComponentData = await executeFunForComponentData(
              component.fun,
              component,
              undefined,
              dispatch,
            );
          }
          if (isFBKData(rawComponentData)) {
            rawComponentData = null;
          } else {
            if (type == Shapes.INP || type == Shapes.BOX) {
              dynamisms = component.dynamisms;
              const componentOptions = getComponentOptions(
                type,
                component.options,
              ) as InputPanelOptions | BoxListOptions;

              if (componentOptions && componentOptions.Layout) {
                layout = await executeFun(layoutFun(componentOptions.Layout));
              }
            }
            if (type == Shapes.PLN) {
              const componentOptions = getComponentOptions(
                type,
                component.options,
              ) as PlannerOptions;
              if (componentOptions.DetailFun) {
                rawOtherComponentData = await executeFunForComponentData(
                  componentOptions.DetailFun,
                  component,
                  undefined,
                  dispatch,
                );
              }
            }
          }
        } else {
          if (
            componentFromProps.dataFromScript &&
            isSmeupObjectArray(componentFromProps.dataFromScript)
          ) {
            rawComponentData = JSON.parse(
              JSON.stringify(componentFromProps.dataFromScript),
            );
            maintainVariables = true;
          }
        }
        if (rawComponentData) {
          const ret = convertersManager(
            type,
            component,
            rawComponentData,
            rawOtherComponentData,
            dynamisms,
            layout,
            getMainScheda(store.getState()).styles,
            kupManager,
          );
          if (maintainVariables) {
            ret.variables = component.variables;
          }
          completeComponentDataByType(type, component, ret, layout);
          // save component into store
          dispatch(
            setComponent({
              id: component.id,
              component: component,
            }),
          );
        }
      }
    }
  } catch (error) {
    handleError(new ComponentException(error, type, component.fun), dispatch);
    return false;
  }
  return true;
};

const initializeComponentByType = (type: Shapes, component: Component) => {
  component.type = type;
  component.data = undefined;

  switch (type) {
    case Shapes.TRE: {
      const c: Tree = component as Tree;
      c.config = undefined;
      c.columns = undefined;
      break;
    }
    case Shapes.MAT: {
      const c: DataTable = component as DataTable;
      c.config = undefined;
      break;
    }
    case Shapes.LAB: {
      const c: Label = component as Label;
      c.config = undefined;
      break;
    }
    case Shapes.SCH:
    case Shapes.EXD: {
      const c: Scheda = component as Scheda;
      c.sections = undefined;
      break;
    }
    case Shapes.BOX: {
      const c: BoxList = component as BoxList;
      c.config = undefined;
      break;
    }
    case Shapes.BTN: {
      const c: ButtonList = component as ButtonList;
      c.config = undefined;
      break;
    }
    case Shapes.IMG: {
      const c: Image = component as Image;
      c.config = undefined;
      break;
    }
    case Shapes.INP: {
      const c: InputPanel = component as InputPanel;
      c.config = undefined;
      c.layout = undefined;
      break;
    }
    case Shapes.DSH: {
      const c: DashList = component as DashList;
      c.config = undefined;
      break;
    }
    case Shapes.PLN: {
      const c: Planner = component as Planner;
      c.config = undefined;
      break;
    }
    case Shapes.SPL: {
      const c: Spotlight = component as Spotlight;
      c.config = undefined;
      break;
    }
    default: {
      throw new ApplicationException("Component " + type + " unsupported");
    }
  }
};

const completeComponentDataByType = (
  type: Shapes,
  component: Component,
  retData: any,
  layout: any,
) => {
  component.loaded = true;
  component.variables = retData.variables;
  switch (type) {
    case Shapes.TRE: {
      const c: Tree = component as Tree;
      const ret: KupTreeComponent = retData as KupTreeComponent;
      c.data = ret.data;
      c.config = ret.config;
      c.columns = ret.columns;
      expandVariablesInComponentTreeNode(c.data, c);
      break;
    }
    case Shapes.MAT: {
      const c: DataTable = component as DataTable;
      const ret: KupDataTableComponent = retData as KupDataTableComponent;
      c.data = ret.data;
      c.config = ret.config;
      break;
    }
    case Shapes.LAB: {
      const c: Label = component as Label;
      const ret: KupLabelComponent = retData as KupLabelComponent;
      c.data = ret.data;
      c.config = ret.config;
      expandVariablesInComponentTreeNode(c.data, c);
      break;
    }
    case Shapes.SPL: {
      const c: Spotlight = component as Spotlight;
      const ret: Spotlight = retData as Spotlight;
      c.data = ret.data;
      c.config = ret.config;
      break;
    }
    case Shapes.SCH:
    case Shapes.EXD: {
      const c: Scheda = component as Scheda;
      const ret: Scheda = retData as Scheda;
      c.info = ret.info;
      c.layout = ret.layout;
      c.sections = ret.sections ?? [];
      c.dynamisms = ret.dynamisms;
      c.data = ret.data;
      c.options = ret.options;
      c.evaluatedFun = ret.evaluatedFun;
      c.title = ret.title;
      c.subNote = ret.subNote;
      break;
    }
    case Shapes.BOX: {
      const c: BoxList = component as BoxList;
      const ret: KupBoxListComponent = retData as KupBoxListComponent;
      c.data = ret.data;
      c.config = ret.config;
      c.layout = layout;
      break;
    }
    case Shapes.BTN: {
      const c: ButtonList = component as ButtonList;
      const ret: KupButtonListComponent = retData as KupButtonListComponent;
      c.data = ret.data;
      c.config = ret.config;
      expandVariablesInComponentTreeNode(c.data, c);
      break;
    }
    case Shapes.IMG: {
      const c: Image = component as Image;
      const ret: KupImageComponent = retData as KupImageComponent;
      c.data = ret.data;
      c.config = ret.config;
      c.columns = ret.columns;
      break;
    }
    case Shapes.INP: {
      const c: InputPanel = component as InputPanel;
      const ret: KupInputPanelComponent = retData as KupInputPanelComponent;
      c.data = ret.data;
      c.config = ret.config;
      c.layout = layout;
      c.options.INP.default = ret.options;
      break;
    }
    case Shapes.DSH: {
      const c: DashList = component as DashList;
      const ret: KupDashListComponent = retData as KupDashListComponent;
      c.data = ret.data;
      c.config = ret.config;
      c.style = ret.style;
      break;
    }
    case Shapes.PLN: {
      const c: Planner = component as Planner;
      const ret: KupPlannerComponent = retData as KupPlannerComponent;
      c.data = ret.data;
      c.detailData = ret.detailData;
      c.config = ret.config;
      if (!c.config.titleMess) {
        c.config.titleMess = getTitle(c);
      }
      break;
    }
    default: {
      throw new ApplicationException("Component " + type + " unsupported");
    }
  }
};

const componentHasData = (type: Shapes, component: Component): boolean => {
  switch (type) {
    case Shapes.SCH:
    case Shapes.EXD: {
      const c: Scheda = component as Scheda;
      return c.sections != null && c.sections != undefined;
    }
    default: {
      return component.data != null && component.data != undefined;
    }
  }
};

export const isScheda = (component: ComponentEntity): boolean => {
  if (!component) {
    return false;
  }
  return isTypeScheda(component.type);
};

export const isTypeScheda = (type: Shapes): boolean => {
  if (!type) {
    return false;
  }
  return type == Shapes.EXD || type == Shapes.SCH;
};

export const isTypeMatrice = (type: Shapes): boolean => {
  if (!type) {
    return false;
  }
  return type == Shapes.EXB || type == Shapes.MAT;
};

export const isTypeChart = (type: Shapes): boolean => {
  if (!type) {
    return false;
  }
  return type == Shapes.EXA || type == Shapes.CHA;
};

export const isSmeupTableDataStructure = (
  data: SmeupDataStructure | ComponentEntity,
): data is SmeupDataStructure => {
  return data && isTypeSmeupTable(data.type as SmeupDataStructureType);
};

export const isTypeSmeupTable = (type: SmeupDataStructureType): boolean => {
  return (
    type == SmeupDataStructureType.SMEUP_TABLE ||
    type == SmeupDataStructureType.SMEUP_TREE_NODE
  );
};

export const checkMessages = (
  rawComponentData: SmeupDataStructure | ComponentEntity,
  dispatch: Dispatch<AnyAction>,
) => {
  if (
    !isSmeupTableDataStructure(rawComponentData) &&
    !isFBKData(rawComponentData)
  ) {
    return;
  }
  if (!rawComponentData.messages) {
    return;
  }

  dispatch(addMessages({ messages: rawComponentData.messages }));
};

export const isHiddenSection = (section: Section): boolean => {
  if (!section) {
    return true;
  }
  if (!section.dim) {
    return false;
  }
  const dim = section.dim.trim();
  return dim == "0" || dim == "0%";
};

const expandVariablesInComponentTreeNode = (
  data: TreeNodeExt[],
  component: Component,
) => {
  if (!data) {
    return;
  }
  for (let i = 0; i < data.length; i++) {
    const treeNode: TreeNodeExt = data[i];
    if (!treeNode) {
      continue;
    }
    if (treeNode.value) {
      treeNode.value = evaluateExpression(treeNode.value, component);
    }
    if (treeNode.obj) {
      treeNode.obj.t = evaluateExpression(treeNode.obj.t, component);
      treeNode.obj.p = evaluateExpression(treeNode.obj.p, component);
      treeNode.obj.k = evaluateExpression(treeNode.obj.k, component);
    }
    expandVariablesInComponentTreeNode(treeNode.children, component);
  }
};

const isLoadDComponent = (component: Component): boolean => {
  if (component.loaded && !component.dataFromScript) {
    return false;
  }
  const options = getAllComponentOptions(component.options, component.type);
  return (
    component.load?.toLowerCase() == "d" || options?.Load?.toLowerCase() == "d"
  );
};

export const getAllComponentOptions = (
  componentOptions: any,
  type: Shapes,
  backendData?: any,
): ComponentOptions => {
  return {
    ...getComponentOptions(Shapes.DFT, componentOptions),
    ...getComponentOptions(type, componentOptions),
    ...getComponentOptions(
      Shapes.DFT,
      backendData?.setup?.setupEntriesByComponent,
      true,
    ),
    ...getComponentOptions(
      type,
      backendData?.setup?.setupEntriesByComponent,
      true,
    ),
  };
};
