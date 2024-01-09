import { Components } from "@sme.up/ketchup";
import {
  FieldOptions,
  FieldShapes,
  KupFieldProps,
  KupTextfieldComponent,
} from "../../fld/field";
import { SmeupObjectArray } from "../../../../../declarations/data-structures/smeupObjectArray";
import { SmeupTreeNode } from "../../../../../declarations/data-structures/smeupTreeNode";
import { isSmeupTreeNode } from "../../../../../utils/smeupDataStructuresUtilities";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";

/**
 * Smeup treenode or SmeupObjectArray to kup textfield component
 * @param options
 * @param backendData
 * @param _kupManager KupManager
 * @returns
 */
export const textFieldConverter = (
  options: FieldOptions,
  backendData: SmeupTreeNode | SmeupObjectArray,
  _kupManager: KupManager,
): Pick<KupTextfieldComponent, "data" | "config"> => {
  const config: KupFieldProps & Partial<Components.KupTextField> = {
    fieldType: FieldShapes.ITX,
  };

  // initial value from backend data
  if (isSmeupTreeNode(backendData)) {
    config.initialValue = backendData.children[0]?.content?.codice;
  } else {
    config.initialValue = backendData.rows[0]?.code;
  }

  // initial value from default option
  if (options?.DefaultValue) {
    config.initialValue = options.DefaultValue;
  }

  return {
    data: {},
    config: config,
  };
};
