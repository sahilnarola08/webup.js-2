import {
  ComponentOptions,
  KupComponent,
} from "../../../../declarations/component";
import { Components, GenericObject } from "@sme.up/ketchup/";
import { KupDataDataset } from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import { YesNo } from "../../../../declarations/data-structures/general";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Dash List
 */
export interface KupDashListComponent extends KupComponent {
  /** data */
  data: KupDataDataset;
  /** props */
  config: Partial<Components.KupCardList>;
  /** inline style calculated by setup options */
  style: GenericObject;
}

/**
 * Dash List options
 */
export interface DashListOptions extends ComponentOptions {
  shape: Shapes.DSH;

  ColumnsNumber?: number;
  DecodeText?: YesNo;
  Fillspace?: YesNo;
  FontSize?: string;
  ForceIcon?: string;
  ForceText?: string;
  ForceUM?: string;
  ForceValue?: string;
  Formulas?: string;
  GroupColName?: string;
  Horizontal?: YesNo;
  IconColName?: string;
  IconColor?: string;
  Inv?: YesNo;
  NumberFormat?: string;
  SelectLayout?: string;
  TextColName?: string;
  TextColor?: string;
  Thresh1?: string;
  Thresh2?: string;
  UmColName?: string;
  ValueColName?: string;
  ValueColor?: string;
}

export enum COLUMN_NAMES {
  ICO = "ICO",
  UM = "UM",
  TEXT = "TEXT",
  VALUE = "VALUE",
  INTVAL = "INTVAL",
  DECVAL = "DECVAL",
  TEXTCOLOR = "TEXTCOLOR",
  VALUECOLOR = "VALUECOLOR",
  ICOCOLOR = "ICOCOLOR",
  LAYOUT = "LAYOUT",
  GROUP = "GROUP",
}

export enum COLUMN_DESCRS {
  ICO = "Icona",
  UM = "Um",
  TEXT = "Testo",
  VALUE = "Valore",
  INTVAL = "Valore parte intera",
  DECVAL = "Valore parte decimale",
  TEXTCOLOR = "Colore del testo",
  VALUECOLOR = "Colore del valore",
  ICOCOLOR = "Colore dell'icona",
  LAYOUT = "Layout della riga",
  GROUP = "Group",
}
