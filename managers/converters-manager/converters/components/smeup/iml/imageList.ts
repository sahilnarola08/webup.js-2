import { Shapes } from "../../../../../../declarations/componentDeclarations";
import {
  ComponentOptions,
  KupComponent,
} from "../../../../declarations/component";
import { ImageData } from "../img/image";

/**
 * Image List
 */
export interface KupImageListComponent extends KupComponent {
  /** data */
  data: ImageData[];
  /** config */
  config: ImageListConfig;
}

/**
 * Image List options
 */
export interface ImageListOptions extends ComponentOptions {
  shape: Shapes.IML;
}

/**
 * Image List config
 */
export interface ImageListConfig {}
