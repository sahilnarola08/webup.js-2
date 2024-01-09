import { Shapes } from "../../../../../../declarations/componentDeclarations";
import {
  KupImageListComponent,
  ImageListOptions,
} from "../../../../../../managers/converters-manager/converters/components/smeup/iml/imageList";
import {
  createImageDataCNCOL,
  createImageDataJ1URL,
} from "../../../../assets/components/smeup/iml/kup-data";

/**
 * Create first image list options
 */
export const createFirstImageListOptions = (): ImageListOptions => {
  return {
    shape: Shapes.IML,
    dSep: ",",
  };
};

/**
 * Create image list CNCOL
 */
export const createImageListCNCOL = (): Pick<
  KupImageListComponent,
  "data" | "config"
> => {
  return {
    data: [createImageDataCNCOL()],
    config: createFirstImageListOptions(),
  };
};

/**
 * Create image list J1URL
 */
export const createImageListJ1URL = (): Pick<
  KupImageListComponent,
  "data" | "config"
> => {
  return {
    data: [createImageDataJ1URL()],
    config: createFirstImageListOptions(),
  };
};
