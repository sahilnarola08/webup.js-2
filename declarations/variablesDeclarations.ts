import { Variable } from "../managers/converters-manager/declarations/data-structures/smeupSch";

/**
 * General implicit variables
 */
export enum ImplicitVariables {
  T1 = "t1",
  P1 = "p1",
  K1 = "k1",
  TX = "tx",
  FU = "fu",
  COLUMN = "Column",
}

/**
 * Implicit Calendar variables
 */
export enum ImplicitVariablesCal {
  INI = "*cal.ini",
  END = "*cal.end",
}

/** Relation between component and its variables */
export interface ComponentVariableData {
  idComponent: string;
  variable: Variable;
  index?: number;
}
