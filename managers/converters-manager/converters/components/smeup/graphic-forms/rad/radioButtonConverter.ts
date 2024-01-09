import { Components, FRadioData } from "@sme.up/ketchup";
import {
  FieldOptions,
  FieldShapes,
  KupFieldProps,
  KupRadioComponent,
} from "../../fld/field";
import {
  SmeupObjectArray,
  SmeupSchObject,
} from "../../../../../declarations/data-structures/smeupObjectArray";
import { SmeupTreeNode } from "../../../../../declarations/data-structures/smeupTreeNode";
import { isSmeupTreeNode } from "../../../../../utils/smeupDataStructuresUtilities";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";

/**
 * Smeup TreeNode or SmeupObjectArray to kup radio button component
 * @param _options
 * @param backendData
 * @param _kupManager KupManager
 * @returns
 */
export const radioButtonConverter = (
  _options: FieldOptions,
  backendData: SmeupTreeNode | SmeupObjectArray,
  _kupManager: KupManager,
): Pick<KupRadioComponent, "data" | "config"> => {
  const config: KupFieldProps & Partial<Components.KupRadio> = {
    fieldType: FieldShapes.RAD,
  };

  // convert data
  let data: FRadioData[];
  if (isSmeupTreeNode(backendData)) {
    data = smeupTreeNodeToRadioData(backendData);
  } else {
    data = smeupObjectArrayToRadioData(backendData);
  }

  // config
  return {
    data,
    config,
  };
};

/**
 * Convert smeup object array to kup radio data
 * @param backendData
 * @returns
 */
export const smeupObjectArrayToRadioData = (
  backendData: SmeupObjectArray,
): FRadioData[] => {
  const kupRadioData: FRadioData[] = [];

  backendData.rows.forEach((row: SmeupSchObject) => {
    const radioElement: FRadioData = {
      value: row.code,
      label: row.code,
      checked: false,
    };
    // set label
    if (row.value) {
      radioElement.label = row.value;
    }
    kupRadioData.push(radioElement);
  });

  return kupRadioData;
};

/**
 * Convert smeup tree node to kup radio data
 * @param backendData
 * @returns
 */
export const smeupTreeNodeToRadioData = (backendData: SmeupTreeNode) => {
  const kupRadioData: FRadioData[] = [];

  backendData.children.forEach((node: SmeupTreeNode) => {
    const radioElement: FRadioData = {
      value: "",
      label: "",
      checked: false,
    };
    // set content
    if (node.content) {
      radioElement.value = node.content.codice;
      radioElement.label = node.content.testo
        ? node.content.testo
        : node.content.codice;
    }
    kupRadioData.push(radioElement);
  });

  return kupRadioData;
};
