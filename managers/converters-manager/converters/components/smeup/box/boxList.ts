import {
  ComponentOptions,
  KupComponent,
} from "../../../../declarations/component";
import { Components } from "@sme.up/ketchup/";
import { KupBoxData } from "@sme.up/ketchup/dist/types/components/kup-box/kup-box-declarations";
import { YesNo } from "../../../../declarations/data-structures/general";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Box
 */
export interface KupBoxListComponent extends KupComponent {
  /** data */
  data: KupBoxData;
  /** props */
  config: Partial<Components.KupBox>;
}

/**
 * Box options
 */
export interface BoxListOptions extends ComponentOptions {
  shape: Shapes.BOX;
  Columns?: string;
  Layout?: string;
  LoadMRows?: YesNo;
  PageSize?: number;
  SelFirst?: YesNo;
  SelectRow?: number;
  ShowSelection?: YesNo;
}
