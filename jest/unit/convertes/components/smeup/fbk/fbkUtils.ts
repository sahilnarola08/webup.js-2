import {
  FbkComponent,
  FbkConfig,
} from "../../../../../../managers/converters-manager/converters/components/smeup/fbk/fbk";
import { createFbkMessages } from "../../../../assets/components/smeup/fbk/kup-data";

/**
 * Create first fbk config
 */
export const createFirstFbkConfig = (): FbkConfig => {
  return {};
};

/**
 * Create first Fbk convertion result
 */
export const createFirstFbkDataAndConfig = (): Pick<
  FbkComponent,
  "data" | "config"
> => {
  return {
    data: {
      messages: createFbkMessages(),
    },
    config: createFirstFbkConfig(),
  };
};
