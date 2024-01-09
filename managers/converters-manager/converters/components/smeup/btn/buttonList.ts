import { Components } from "@sme.up/ketchup";
import { YesNo } from "../../../../declarations/data-structures/general";
import {
  KupComponent,
  ComponentOptions,
} from "../../../../declarations/component";
import { TreeNodeExt } from "../tre/tree";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Button List
 */
export interface KupButtonListComponent extends KupComponent {
  /** data */
  data: TreeNodeExt[];
  /** props */
  config: Partial<Components.KupButtonList>;
}

/**
 * Button List options
 */
export interface ButtonListOptions extends ComponentOptions {
  shape: Shapes.BTN;
  Horiz?: YesNo;
  FillSpace?: YesNo;
  Flat?: YesNo;
  ShowIcon?: YesNo;
  ShowText?: YesNo;
}
