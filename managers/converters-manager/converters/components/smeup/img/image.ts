import { Shapes } from "../../../../../../declarations/componentDeclarations";
import { KupObj } from "../../../../utils/smeupObjectUtilities";
import {
  ComponentOptions,
  KupComponent,
} from "../../../../declarations/component";

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
  shape: Shapes.IMG;
}

/**
 * Image config
 */
export interface ImageConfig {}
