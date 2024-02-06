import { ImageData } from "../../../../../../managers/converters-manager/converters/components/smeup/img/image";
import { TreeNodeExt } from "../../../../../../managers/converters-manager/converters/components/smeup/tre/tree";

/**
 * Image data CNCOL
 */
export const createImageDataCNCOL = ():TreeNodeExt[]  => {
  return [{
    obj: {
      t: "CN",
      p: "COL",
      k: "",
    },
    resource: "account-box-outline",
  }];
};

/**
 * Image data J1URL
 */
export const createImageDataJ1URL = (): TreeNodeExt[] => {
  return [{
    obj: {
      t: "J4",
      p: "IMG",
      k: "J1;URL;http://google.com",
    },
    resource: "http://google.com",
  }];
};

/**
 * Image data VO COD_VER
 */
export const createImageDataVOCOD_VER = (): TreeNodeExt[] => {
  return [{
    obj: {
      t: "VO",
      p: "COD_VER",
      k: "000002",
    },
    resource: "close-circle",
  }];
};
