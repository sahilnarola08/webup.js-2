import { Shapes } from "../../../../../../declarations/componentDeclarations";
import { KupObj } from "../../../../utils/smeupObjectUtilities";
import {
  ComponentOptions,
  KupComponent,
} from "../../../../declarations/component";
import { YesNo } from "../../../../declarations/data-structures/general";
import { Components, KupDataColumn } from "@sme.up/ketchup";
import { TreeNodeExt } from "../tre/tree";

/**
 * Image
 */
export interface KupImageComponent extends KupComponent {
  /** data */
  // data: ImageData;
  data: TreeNodeExt[];
  /** columns */
  columns?: KupDataColumn[];
  /** config */
  config: Partial<Components.KupImage> | ImageOptions;
}

/**
 * Image data
 */
export interface ImageData {
  // url or image/icon name
  resource: string;
  obj: KupObj;
}

/**
 * Image options
 */
export interface ImageOptions extends ComponentOptions {
  shape: Shapes.IMG;
  Stretch?: YesNo;
  Zoomable?: YesNo;
  Editable?: YesNo;
  Drag?: YesNo;
  ImageCache?: YesNo;
}



