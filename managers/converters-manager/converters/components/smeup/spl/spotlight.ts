import { Components } from "@sme.up/ketchup";
import {
  KupComponent,
  ComponentOptions,
} from "../../../../declarations/component";
import { TreeNodeExt } from "../tre/tree";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Tree
 */
export interface KupSpotlightComponent extends KupComponent {
  /** data */
  data: TreeNodeExt[];
  /** props */
  config: Partial<Components.KupTextField>;
}

/**
 * Label options
 */
export interface SpotlightOptions extends ComponentOptions {
  shape: Shapes.SPL;
  Watermark?: string;
}
