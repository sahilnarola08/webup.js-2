import { Shapes } from "../../../../../../declarations/componentDeclarations";
import { KupObj } from "../../../../utils/smeupObjectUtilities";
import {
  ComponentOptions,
  KupComponent,
} from "../../../../declarations/component";
import { YesNo } from "../../../../declarations/data-structures/general";
import { TreeNodeExt } from "../tre/tree";

/**
 * Image
 */
export interface KupImageComponent extends KupComponent {
  /** data */
  // data: TreeNodeExt[];
  data: ImageData;
  /** config */
  config: ImageConfig;
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
  shape: Shapes.IMAGE;
  Stretch?: YesNo;
  Zoomable?: YesNo;
  Editable?: YesNo;
  Drag?: YesNo;
  ImageCache?: YesNo;
}
// export interface ImageOptions extends ComponentOptions {
//   shape: Shapes.IMAGE;
// }

// export interface ImageOptions extends ComponentOptions {
//   shape: Shapes.IMAGE;
// }



/**
 * Image config
 */
export interface ImageConfig {}
