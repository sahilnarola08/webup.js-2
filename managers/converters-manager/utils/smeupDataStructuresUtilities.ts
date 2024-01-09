import { SmeupDataStructureType } from "../declarations/data-structures/smeupDataStructure";
import { SmeupButtonArray } from "../declarations/data-structures/smeupButtonsArray";
import { SmeupFBKData } from "../declarations/data-structures/smeupFBKData";
import {
  SmeupInputPanel,
  SmeupInputPanelResponse,
} from "../declarations/data-structures/smeupInputPanel";
import { SmeupObjectArray } from "../declarations/data-structures/smeupObjectArray";
import { SmeupTable } from "../declarations/data-structures/smeupTable";
import { SmeupTreeNode } from "../declarations/data-structures/smeupTreeNode";
import { ComponentOptions } from "../declarations/component";
import { TreeOptions } from "../converters/components/smeup/tre/tree";
import { IconType, YesNo } from "../declarations/data-structures/general";
import { ButtonListOptions } from "../converters/components/smeup/btn/buttonList";
import { Shapes } from "../../../declarations/componentDeclarations";

/**
 * Function to check SmeupSchComponentData type
 * @param object
 * @returns
 */
export const isSmeupObjectArray = (object: any): object is SmeupObjectArray => {
  return object && object.rows && !object.columns;
};

/**
 * Function to check SmeupButtonArray type
 * @param object
 * @returns
 */
export const isSmeupButtonArray = (object: any): object is SmeupButtonArray => {
  return object.buttons;
};

/**
 * Function to check SmeupTable data structure
 * @param object
 * @returns
 */
export const isSmeupTable = (object: any): object is SmeupTable => {
  return object.type == SmeupDataStructureType.SMEUP_TABLE;
};

/**
 * Function to check SmeupTreeNode data structure
 * @param object
 * @returns
 */
export const isSmeupTreeNode = (object: any): object is SmeupTreeNode => {
  return object.type == SmeupDataStructureType.SMEUP_TREE_NODE;
};

/**
 * Function to check SmeupInputPanel data structure
 * @param object
 * @returns
 */
export const isSmeupInputPanel = (object: any): object is SmeupInputPanel => {
  return object.type == SmeupDataStructureType.SMEUP_INPUT_PANEL;
};

/**
 * Function to check SmeupInputPanelResponse data structure
 * @param object
 * @returns
 */
export const isSmeupInputPanelResponse = (
  object: any,
): object is SmeupInputPanelResponse => {
  return object.type == SmeupDataStructureType.SMEUP_INPUT_PANEL_RESPONSE;
};

/**
 * Function to check SmeupFbkData data structure
 * @param object
 * @returns
 */
export const isSmeupFbkData = (object: any): object is SmeupFBKData => {
  return object.type == SmeupDataStructureType.SMEUP_FBK_DATA;
};

/**
 * Function to check TreeOptions data structure
 * @param options
 * @returns
 */
export const isTreeOptions = (
  options: ComponentOptions,
): options is TreeOptions => {
  return options != null && options.shape == Shapes.TRE;
};

/**
 * Function to check ButtonListOptions data structure
 * @param options
 * @returns
 */
export const isButtonListOptions = (
  options: ComponentOptions,
): options is ButtonListOptions => {
  return options != null && options.shape == Shapes.BTN;
};

/**
 * Function to check if a property is set to "Yes"
 * @param string
 * @returns
 */
export const isYes = (string?: string): boolean =>
  string?.toLowerCase() == YesNo.Yes.toLowerCase();

/**
 * Function to check if a property is set to "No"
 * @param string
 * @returns
 */
export const isNo = (string?: string): boolean =>
  string?.toLowerCase() == YesNo.No.toLowerCase();

/**
 * Function to check if the property Icone is set to "Yes" or "Partial" or "Specific"
 * @param string
 * @returns
 */
export const isIconTypeVisible = (string?: string): boolean => {
  const s = string?.toLowerCase();
  return (
    s == IconType.Yes.toLowerCase() ||
    s == IconType.Partial.toLowerCase() ||
    s == IconType.Specific.toLowerCase()
  );
};

/**
 * Function to check if the property Icone is set to "No"
 * @param string
 * @returns
 */
export const isIconTypeNotVisible = (string?: string): boolean => {
  return string?.toLowerCase() == IconType.No.toLowerCase();
};
