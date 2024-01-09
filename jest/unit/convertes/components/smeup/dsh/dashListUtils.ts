import { Components, GenericObject } from "@sme.up/ketchup";
import {
  KupDashListComponent,
  DashListOptions,
} from "../../../../../../managers/converters-manager/converters/components/smeup/dsh/dashList";
import {
  createFirstDashListData,
  createSecondDashListData,
} from "../../../../assets/components/smeup/dsh/kup-data";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Create fisrt dash list options
 */
export const createFirstDashListOptions = (): DashListOptions => {
  return {
    shape: Shapes.DSH,
    SelectLayout: "3",
    FontSize: "90%",
    dSep: ",",
  };
};

/**
 * Create first kup dash list config
 */
export const createFirstDashListConfig =
  (): Partial<Components.KupCardList> => {
    return {
      decvalueCol: "DECVAL",
      descrCol: "TEXT",
      iconCol: "ICO",
      iconcolorCol: "ICOCOLOR",
      intvalueCol: "INTVAL",
      layoutCol: "LAYOUT",
      measureCol: "UM",
      textcolorCol: "TEXTCOLOR",
      valueCol: "VALUE",
      valuecolorCol: "VALUECOLOR",
    };
  };
/**
 * Create second kup dash list config
 */
export const createSecondDashListConfig =
  (): Partial<Components.KupCardList> => {
    return {
      decvalueCol: "DECVAL",
      descrCol: "TEXT",
      iconCol: "ICO",
      iconcolorCol: "ICOCOLOR",
      intvalueCol: "INTVAL",
      layoutCol: "LAYOUT",
      measureCol: "UM",
      textcolorCol: "TEXTCOLOR",
      valueCol: "COL1",
      valuecolorCol: "VALUECOLOR",
    };
  };

/**
 * Create first kup dash list style
 */
export const createFirstDashListStyle = (): GenericObject => {
  return {
    "--kup-card-scalable-static-font-size": "90%",
  };
};
/**
 * Create second kup dash list style
 */
export const createSecondDashListStyle = (): GenericObject => {
  return {
    "--kup-card-scalable-static-font-size": "90px",
  };
};

/**
 * Create first dash list convertion result
 */
export const createFirstDashListDataAndConfig = (): Pick<
  KupDashListComponent,
  "data" | "config" | "style"
> => {
  return {
    data: createFirstDashListData(),
    config: createFirstDashListConfig(),
    style: createFirstDashListStyle(),
  };
};

/**
 * Create first dash list convertion result
 */
export const createSecondDashListDataAndConfig = (): Pick<
  KupDashListComponent,
  "data" | "config" | "style"
> => {
  return {
    data: createSecondDashListData(),
    config: createSecondDashListConfig(),
    style: createSecondDashListStyle(),
  };
};

/**
 * Create second dashlist options
 * - Force text
 * - Value col name
 * @returns
 */
export const createSecondDashListOptions = (): DashListOptions => {
  return {
    shape: Shapes.DSH,
    SelectLayout: "3",
    FontSize: "90",
    ForceText: "Text",
    ValueColName: "COL1",
    dSep: ",",
  };
};
