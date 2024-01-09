import { Components, FButtonStyling } from "@sme.up/ketchup";
import {
  KupButtonListComponent,
  ButtonListOptions,
} from "../../../../../../managers/converters-manager/converters/components/smeup/btn/buttonList";
import { YesNo } from "../../../../../../managers/converters-manager/declarations/data-structures/general";
import {
  createKupTreeNodeWithIcons,
  createSimpleKupTreeNode,
} from "../../../../assets/components/smeup/btn/kup-data";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

export const createSimpleButtonListOptions = (): ButtonListOptions => {
  return {
    shape: Shapes.BTN,
    dSep: ",",
  };
};

export const createSimpleButtonListConfig =
  (): Partial<Components.KupButtonList> => {
    return { columns: 1 };
  };

export const createSimpleButtonListDataAndConfig = (): Pick<
  KupButtonListComponent,
  "data" | "config"
> => {
  return {
    data: createSimpleKupTreeNode(),
    config: createSimpleButtonListConfig(),
  };
};

export const createButtonWithIconOptions = (): ButtonListOptions => {
  return {
    shape: Shapes.BTN,
    ShowIcon: YesNo.No,
    ShowText: YesNo.Yes,
    FillSpace: YesNo.Yes,
    Flat: YesNo.Yes,
    Horiz: YesNo.Yes,
    dSep: ",",
  };
};
export const createButtonWithIconConfig =
  (): Partial<Components.KupButtonList> => {
    return { styling: "flat" as FButtonStyling };
  };
export const createButtonWithIcon = (): Pick<
  KupButtonListComponent,
  "data" | "config"
> => {
  return {
    data: createKupTreeNodeWithIcons(),
    config: createButtonWithIconConfig(),
  };
};
