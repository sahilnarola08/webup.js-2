import { Shapes } from "../../../../../../declarations/componentDeclarations";
import { KupObj } from "../../../../utils/smeupObjectUtilities";
import {
  ComponentOptions,
  KupComponent,
} from "../../../../declarations/component";
import { YesNo } from "../../../../declarations/data-structures/general";

/**
 * Image
 */
export interface KupImageComponent extends KupComponent {
  /** data */
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
  Stretch?: YesNo;
  Zoomable?: YesNo;
  Editable?: YesNo;
  Drag?: YesNo;
  ImageCache?: YesNo;
}
// export interface ImageOptions extends ComponentOptions {
//   shape: Shapes.IMG;
// }

export interface ImageListOptions extends ComponentOptions {
  Stretch: YesNo;
  Zoomable?: YesNo;
  Editable?: YesNo;
  Drag?: YesNo;
  ImageCache?: YesNo;
}

export interface ImageListOptions extends ComponentOptions {
  Stretch: YesNo;
  Zoomable?: YesNo;
  Editable?: YesNo;
  Drag?: YesNo;
  ImageCache?: YesNo;
}

/**
 * Image config
 */
export interface ImageConfig {}
