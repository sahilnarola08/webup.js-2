import { Components, GenericObject } from "@sme.up/ketchup";
import {
  KupDataColumn,
  KupDataDataset,
} from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";

import { KupBoxData } from "@sme.up/ketchup/dist/types/components/kup-box/kup-box-declarations";
import { DynamismEntity } from "./dynamismDeclarations";
import { KupFormData } from "@sme.up/ketchup/dist/types/components/kup-form/kup-form-declarations";
import { VariablesMap } from "../store/reduces/components";
import { GanttCommonProps } from "@sme.up/gantt-component";
import { SmeupObjectArray } from "../managers/converters-manager/declarations/data-structures/smeupObjectArray";
import { SmeupStyle } from "../managers/converters-manager/declarations/data-structures/smeupSch";
import { DataTableOptions } from "../managers/converters-manager/converters/components/smeup/exb-mat/dataTable";
import {
  TreeNodeExt,
  TreeOptions,
} from "../managers/converters-manager/converters/components/smeup/tre/tree";
import { ButtonListOptions } from "../managers/converters-manager/converters/components/smeup/btn/buttonList";
import {
  LabelConfig,
  LabelOptions,
} from "../managers/converters-manager/converters/components/smeup/lab/label";
import { BoxListOptions } from "../managers/converters-manager/converters/components/smeup/box/boxList";
import { InputPanelOptions } from "../managers/converters-manager/converters/components/smeup/inp/inputPanel";
import { PlannerOptions } from "../managers/converters-manager/converters/components/smeup/pln/planner";
import { DashListOptions } from "../managers/converters-manager/converters/components/smeup/dsh/dashList";
import { KupObj } from "../managers/converters-manager/utils/smeupObjectUtilities";
import { ImageData, ImageOptions } from "../managers/converters-manager/converters/components/smeup/img/image";

export interface ComponentEntity {
  type: Shapes;
  id: string;
  fromScriptId: string;
  schedaId: string;
  loaded: boolean;
  fun?: string;
  evaluatedFun?: Fun;
  title: string;
  subNote?: string;
  variables?: VariablesMap;
  timer?: ReturnType<typeof setTimeout>;
  load?: string;
}

/**
 * Component
 */
export interface Component extends ComponentEntity {
  dynamisms?: DynamismEntity[];
  data?: any;
  options?: any;
  dataFromScript?: any;
}

/**
 * Raw component, before create data and config
 */
export interface RawComponent extends ComponentEntity {
  options?: any;
  dynamisms?: DynamismEntity[];
  data?: SmeupObjectArray;
}

export interface Scheda extends Component {
  info: string;
  type: Shapes.SCH;
  layout: string;
  laySetup?: GenericObject;
  sections: Section[];
  styles?: SmeupStyle[];
  dSep?: string;
}

export interface Section {
  id: string;
  fromScriptId: string;
  loaded: boolean;
  components?: Component[];
  dim?: string;
  layout?: string;
  sections?: Section[];
}

export interface DataTable extends Component {
  type: Shapes.MAT;
  options: DataTableOptions;
  /** data */
  data: KupDataDataset;
  /** props */
  config: Partial<Components.KupDataTable>;
}

export interface Tree extends Component {
  type: Shapes.TRE;
  /** component options (::G.SET) */
  options?: TreeOptions;
  /** data */
  data: TreeNodeExt[];
  /** props */
  config: Partial<Components.KupTree>;
  /** columns */
  columns?: KupDataColumn[];
}

export interface ButtonList extends Component {
  type: Shapes.BTN;
  /** component options (::G.SET) */
  options?: ButtonListOptions;
  /** data */
  data: TreeNodeExt[];
  /** props */
  config: Partial<Components.KupButtonList>;
}
export interface Image extends Component {
  type: Shapes.IMG;
  /** component options (::G.SET) */
  options?: ImageOptions;
  /** data */
  data: ImageData;
  /** props */
  config: Partial<Components.KupImage>;
  /** columns */
  columns?: KupDataColumn[];
}

export interface Label extends Component {
  type: Shapes.LAB;
  /** component options (::G.SET) */
  options?: LabelOptions;
  /** data */
  data: TreeNodeExt[];
  /** props */
  config: Partial<LabelConfig>;
}

export interface Spotlight extends Component {
  type: Shapes.SPL;
  /** component options (::G.SET) */
  options?: LabelOptions;
  /** data */
  data: TreeNodeExt[];
  /** props */
  config: Partial<Components.KupTextField>;
}

export interface BoxList extends Component {
  type: Shapes.BOX;
  /** component options */
  options?: {
    BOX: {
      default: BoxListOptions;
    };
  };
  /** data */
  data: KupBoxData;
  /** props */
  config: Partial<Components.KupBox>;
  layout: any;
}

export interface InputPanel extends Component {
  type: Shapes.INP;
  /** component options */
  options?: {
    INP: {
      default: InputPanelOptions;
    };
  };
  /** data */
  data: KupFormData;
  /** props */
  config: Partial<Components.KupForm>;
  layout: any;
}
export interface Gantt extends Component {
  type: Shapes.GNT;
  data: GanttCommonProps;
  setupOptions: GanttSetupOptions;
}
export interface GanttSetupOptions {
  phaseColorCol: string;
  phaseColumns: string[];
  phaseColParDep: string;
  phaseDates: string[];
  phaseIdCol: string;
  phaseNameCol: string;
  phasePrevDates: string[];
  taskColumns: string[];
  taskDates: string[];
  taskIdCol: string;
  taskNameCol: string;
  taskPrevDates: string[];
}

export interface Planner extends Component {
  type: Shapes.PLN;
  /** data */
  data: KupDataDataset;
  detailData: KupDataDataset;
  /** props */
  config: Partial<Components.KupPlanner>;
  /** component options (::G.SET) */
  options: PlannerOptions;
}

export interface DashList extends Component {
  type: Shapes.DSH;
  /** component options (::G.SET) */
  options?: DashListOptions;
  /** data */
  data: KupDataDataset;
  /** props */
  config: Partial<Components.KupCardList>;
  /** inline style calculated by setup options */
  style: GenericObject;
  layout: string;
}

/**
 * Supported shapes.
 */
export enum Shapes {
  BOX = "BOX",
  BTN = "BTN",
  CAL = "CAL",
  CHA = "CHA", // = EXA
  DSH = "DSH",
  EXA = "EXA", // = CHA
  EXB = "EXB", // = MAT
  EXD = "EXD", // = SCH
  FBK = "FBK",
  FLD = "FLD",
  GNT = "GNT",
  IMG = "IMG",
  LAB = "LAB",
  LST = "LST",
  MAT = "MAT", // = EXB
  PLN = "PLN",
  SCH = "SCH", // = EXD
  TRE = "TRE",
  INP = "INP",
  IML = "IML",
  SPL = "SPL",
  UNK = "UNK",
  DFT = "DFT",
}

/**
 * Fun
 */
export interface Fun {
  type?: FunType;

  component?: string;
  service?: string;
  method?: string;

  obj1?: KupObj;
  obj2?: KupObj;
  obj3?: KupObj;
  obj4?: KupObj;
  obj5?: KupObj;
  obj6?: KupObj;

  p?: string;
  input?: string;
  notify?: string;
  g?: string;
  sg?: SG;
  ss?: string;
  value?: string;
  winId?: string;
  virtualFun?: VirtualFun;
  isVoid?: boolean;
  isInternalSevice?: boolean;

  toString(): any;
}

export interface VirtualFun {
  type: VirtualFunType;
  value: string;
}

export enum VirtualFunType {
  CLOSE = "CLOSE",
  EXECUTE = "EXECUTE",
  LOAD = "LOAD",
  RELOAD = "RELOAD",
}

export enum FunType {
  F = "F",
  A = "A",
  C = "C",
  VIRTUAL = "Virtual",
  UNK = "",
}

export interface Loading {
  loading: boolean;
}

export interface EventHandlersMap {
  [eventName: string]: {
    handlers: [{ component: HTMLElement; handler: any }];
  };
}

export interface SG {
  type: SGType;
  message: string;
}

export enum SGType {
  //SimpleAlert = "SimpleAlert",
  AskConf = "AskConf",
}
