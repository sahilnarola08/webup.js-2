import { Shapes } from "../../../../../../declarations/componentDeclarations";
import {
  KupLabelComponent,
  LabelConfig,
  LabelOptions,
} from "../../../../../../managers/converters-manager/converters/components/smeup/lab/label";
import { createSimpleKupTreeNode } from "../../../../assets/components/smeup/lab/kup-data";

/**
 * Create first label options
 */
export const createFirstLabelOptions = (): LabelOptions => {
  return {
    shape: Shapes.LAB,
    dSep: ",",
  };
};

/**
 * Create first label config
 */
export const createFirstLabelConfig = (): Partial<LabelConfig> => {
  return { styles: {} };
};

/**
 * Create first convertion result
 */
export const createFirstLabelDataAndConfig = (): Pick<
  KupLabelComponent,
  "data" | "config"
> => {
  return {
    data: createSimpleKupTreeNode(),
    config: createFirstLabelConfig(),
  };
};
