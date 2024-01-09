import { Variable } from "../managers/converters-manager/declarations/data-structures/smeupSch";
import { VariablesMap } from "../store/reduces/components";
import { Fun } from "./componentDeclarations";

/**
 * Dynamism entity
 */
export interface DynamismEntity {
  event: string;
  exec?: string;
  targets?: string[];
  variables?: Variable[];
}

/**
 * Dynamism
 */
export interface Dynamism {
  event?: string;
  source?: string;
  schedaId?: string;
  targets: string[];
  title?: string;
  fun?: string;
  evaluatedFun?: Fun;
  implicitVariables?: VariablesMap;
  variables?: VariablesMap;
}

/**
 * Dynamism implicit variable
 */
export interface ImplicitVariable {
  key: string;
  value: string;
}

/**
 * Implicit variables wrapper
 */
// export interface VariableMap {
//   [key: string]: string;
// }

/**
 * Dynamism Event
 */
export enum DynamismEvents {
  BTN_CLICK = "btnclick",
  CHANGE = "change",
  CHANGE_MONTH = "changemonth",
  CHANGE_ROW = "changerow",
  CHANGE_VAL = "changeval",
  CLICK = "click",
  DBLCLICK = "dblclick",
  DETAIL_CLICK = "detailclick",
  EXPAND = "expand",
  RESIZE = "resize",
}
