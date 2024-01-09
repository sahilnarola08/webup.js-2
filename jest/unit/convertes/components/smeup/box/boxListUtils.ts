import { Components } from "@sme.up/ketchup";
import {
  createSimpleKupBox,
  createSimpleKupBoxWithCustomLayout,
  createSimpleKupBoxWithDefaultLayout,
} from "../../../../assets/components/smeup/box/kup-data";
import {
  BoxListOptions,
  KupBoxListComponent,
} from "../../../../../../managers/converters-manager/converters/components/smeup/box/boxList";
import { YesNo } from "../../../../../../managers/converters-manager/declarations/data-structures/general";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

export const createSimpleBoxListOptions = (): BoxListOptions => {
  return {
    shape: Shapes.BOX,
    dSep: ",",
  };
};

export const createBoxListOptions = (
  selectFirst?: YesNo,
  selectRow?: number,
  columns?: string,
): BoxListOptions => {
  return {
    shape: Shapes.BOX,
    dSep: ",",
    LoadMRows: YesNo.Yes,
    PageSize: 2,
    SelFirst: selectFirst,
    SelectRow: selectRow,
    ShowSelection: YesNo.Yes,
    Columns: columns,
  };
};

export const createCustomLayoutBoxListOptions = (): BoxListOptions => {
  return {
    shape: Shapes.BOX,
    dSep: ",",
    Layout: "WETEST_0A8",
  };
};

export const createSimpleBoxListConfig = (): Partial<Components.KupBox> => {
  return {};
};

export const createBoxListConfig = (
  selectFirst?: YesNo,
  selectRow?: number,
): Partial<Components.KupBox> => {
  return {
    lazyLoadRows: true,
    pagination: true,
    rowsPerPage: 2,
    selectBox:
      selectFirst && selectFirst == YesNo.Yes
        ? 1
        : selectRow
        ? selectRow
        : undefined,
    showSelection: true,
  };
};

export const createSimpleBoxListDataAndConfig = (): Pick<
  KupBoxListComponent,
  "data" | "config"
> => {
  return {
    data: createSimpleKupBox(),
    config: createSimpleBoxListConfig(),
  };
};

export const createBoxListDataAndConfig = (
  selectFirst?: YesNo,
  selectRow?: number,
): Pick<KupBoxListComponent, "data" | "config"> => {
  return {
    data: createSimpleKupBox(),
    config: createBoxListConfig(selectFirst, selectRow),
  };
};

export const createBoxListDefaultLayoutDataAndConfig = (): Pick<
  KupBoxListComponent,
  "data" | "config"
> => {
  return {
    data: createSimpleKupBoxWithDefaultLayout(),
    config: createBoxListConfig(),
  };
};

export const createBoxListCustomLayoutDataAndConfig = (): Pick<
  KupBoxListComponent,
  "data" | "config"
> => {
  return {
    data: createSimpleKupBoxWithCustomLayout(),
    config: createSimpleBoxListConfig(),
  };
};
