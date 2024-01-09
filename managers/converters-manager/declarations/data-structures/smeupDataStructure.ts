import { KupBoxLayout } from "@sme.up/ketchup/dist/types/components/kup-box/kup-box-declarations";
import { SmeupObject } from "./smeupObject";
import { Variable, VariablesFromService } from "./smeupSch";

/**
 * Smeup data structure
 */
export interface SmeupDataStructure {
  type: SmeupDataStructureType;
  messages?: Message[];
  actions?: Action[];
  setup?: any;
  variables?: Variable[] | VariablesFromService;
}

export interface Message {
  livello: number;
  tipo: string;
  gravity: MessageGravity;
  message: string;
  fullMessage?: string;
  mode?: MessageMode;
  smeupObject?: SmeupObject;
}

export interface Action {
  type: string;
  exec?: string;
}

export interface SmeupTableDataStructure extends SmeupDataStructure {
  columns: Column[];
  rows: Row[];
}

/** Column */
export interface Column {
  /** Name (code) */
  code: string;
  /** Graphic properties */
  grp?: string;
  /** Field length */
  lun?: string;
  canonicalForm?: string;
  /** render component */
  cmp?: string;
  /**
   * I: Input
   * O: Output
   * B: Input (???)
   * H: Hide
   * E: Autocomplete
   * G: ???
   *
   */
  IO?: "I" | "O" | "B" | "H" | "G" | "E" | "C" | "";
  tooltip?: boolean;
  /** Visibile text */
  text?: string;
  sortMode?: string;
  /**
   * ASSE
   * SERIE
   */
  fill?: "ASSE" | "SERIE";
  /** Smeup object */
  ogg?: string;
  /** simple client validation */
  validation?: string;
  pfk?: string;
  tfk?: string;
  sfk?: string;
}

/** Row */
export interface Row {
  fields: {
    [index: string]: Cell;
  };
  layout?: KupBoxLayout;
}

export const ROW_KEY_NAME = "RowId";
/** Cell */
export interface Cell {
  /** name, refer to column name */
  name: string;
  tooltip: boolean;
  /** smeup object */
  smeupObject: SmeupObject;
}

/**
 * Smeup backend data structures
 */
export enum SmeupDataStructureType {
  /** null */
  EMPTY = "",
  /** Smeup sch (EXD) */
  SMEUP_SCH = "SmeupSch",
  /** Smeup table (EXB) */
  SMEUP_TABLE = "SmeupTable",
  /** Smeup input panel (INP) */
  SMEUP_INPUT_PANEL = "SmeupInputPanel",
  /** Smeup input panel response */
  SMEUP_INPUT_PANEL_RESPONSE = "InputPanelResponse",
  /** Smeup tree node (TRE) */
  SMEUP_TREE_NODE = "SmeupTreeNode",
  /** Smeup feedback data */
  SMEUP_FBK_DATA = "FBKData",
  /** Smeup Layout (for INP and Box) */
  SMEUP_LAYOUT = "Layout",
  /** Smeup buttons array */
  SMEUP_BUTTONS = "Buttons",
}

export enum SmeupDataComponentFunc {
  SUM = "SUM",
  COUNT = "COUNT",
  AVERAGE = "AVG",
  MATH = "MATH",
  MIN = "MIN",
  MAX = "MAX",
  DISTINCT = "DISTINCT",
}

export enum MessageGravity {
  INFO = "INFO",
  ERROR = "ERROR",
  WARNING = "WARNING",
}

/**
 * Mode
 */
export enum MessageMode {
  TN,
  PN,
  TM,
  PM,
  HH,
  TS,
  PS,
  PT,
  TT,
}
