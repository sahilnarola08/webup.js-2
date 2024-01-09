import { SmeupTreeNode } from "../../../../declarations/data-structures/smeupTreeNode";
import { FieldOptions, FieldShapes, KupFieldComponent } from "./field";
import { SmeupObjectArray } from "../../../../declarations/data-structures/smeupObjectArray";
import { textFieldConverter } from "../graphic-forms/itx/textFieldConverter";
import { radioButtonConverter } from "../graphic-forms/rad/radioButtonConverter";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";

/**
 * Smeup data structure to kup field data and config
 * @param options Field options
 * @param backendData SmeupTable | SmeupTreeNode
 * @param kupManager KupManager
 * @returns
 */
export const fieldConverter = (
  options: FieldOptions,
  backendData: SmeupTreeNode | SmeupObjectArray,
  kupManager: KupManager,
): Pick<KupFieldComponent, "data" | "config"> => {
  if (options && options.Type) {
    switch (options.Type.toLocaleLowerCase()) {
      case FieldShapes.ITX:
        return textFieldConverter(options, backendData, kupManager);
      case FieldShapes.RAD:
        return radioButtonConverter(options, backendData, kupManager);
    }
  } else {
    // call default field
    return textFieldConverter(options, backendData, kupManager);
  }
  return {
    data: {},
    config: {},
  };
};
