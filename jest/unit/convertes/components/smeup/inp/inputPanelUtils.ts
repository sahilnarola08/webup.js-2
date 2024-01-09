import { Components } from "@sme.up/ketchup";
import {
  KupInputPanelComponent,
  InputPanelOptions,
} from "../../../../../../managers/converters-manager/converters/components/smeup/inp/inputPanel";
import {
  createSimpleButton,
  createSimpleKupInputPanel,
} from "../../../../assets/components/smeup/inp/kup-data";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Create first input panel options
 */
export const createFirstInputPanelOptions = (): InputPanelOptions => {
  return {
    shape: Shapes.INP,
    dSep: ",",
  };
};
/**
 * Create first input panel options
 */
export const createFirstInputPanelConfig = (): Partial<Components.KupBox> => {
  return {};
};

const createValidations = (): Map<string, string> => {
  return new Map<string, string>();
};

/**
 * Create complete input panel convertion result
 */
export const createCompleteInputPanel = (): Pick<
  KupInputPanelComponent,
  "data" | "config" | "options"
> => {
  return {
    data: createSimpleKupInputPanel(),
    config: createFirstInputPanelConfig(),
    options: {
      shape: Shapes.INP,
      toolbars: createSimpleButton(),
      validations: createValidations(),
      dSep: ",",
    },
  };
};
