import { Shapes } from "../../../../../../declarations/componentDeclarations";
import {
  KupImageComponent,
  ImageOptions,
} from "../../../../../../managers/converters-manager/converters/components/smeup/img/image";
import {
  createImageDataJ1URL,
  createImageDataCNCOL,
  createImageDataVOCOD_VER,
} from "../../../../assets/components/smeup/img/kup-data";

/**
 * Create first image options
 */
export const createFirstImageOptions = (): ImageOptions => {
  return {
    shape: Shapes.IMG,
    dSep: ",",
  };
};

/**
 * Create image from CN;COL
 */
export const createImageCNCOL = (): Pick<
  KupImageComponent,
  "data" | "config"
> => {
  return {
    data: createImageDataCNCOL(),
    config: createFirstImageOptions(),
  };
};

/**
 * Create image from J1;URL
 */
export const createImageJ1URL = (): Pick<
  KupImageComponent,
  "data" | "config"
> => {
  return {
    data: createImageDataJ1URL(),
    config: createFirstImageOptions(),
  };
};

/**
 * Create image from VO;COD_VER
 */
export const createImageVOCOD_VER = (): Pick<
  KupImageComponent,
  "data" | "config"
> => {
  return {
    data: createImageDataVOCOD_VER(),
    config: createFirstImageOptions(),
  };
};
