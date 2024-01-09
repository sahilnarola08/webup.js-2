import { GenericMap } from "@sme.up/ketchup/dist/types/types/GenericTypes";
import { YesNo } from "../../../../declarations/data-structures/general";
import {
  KupComponent,
  ComponentOptions,
} from "../../../../declarations/component";
import { TreeNodeExt } from "../tre/tree";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Tree
 */
export interface KupLabelComponent extends KupComponent {
  /** data */
  data: TreeNodeExt[];
  /** props */
  config: Partial<LabelConfig>;
}

/**
 * Label options
 */
export interface LabelOptions extends ComponentOptions {
  shape: Shapes.LAB;
  Style?: string;
  Border?: YesNo;
  BorderDiam?: number;
  Align?: string;
  FontBold?: string;
  FontItalic?: string;
  FontName?: string;
  FontSize?: string;
  FontULine?: string;
  FontColor?: string;
  BackColor?: string;
}

/**
 * Label config
 */
export interface LabelConfig {
  styles?: GenericMap;
}
