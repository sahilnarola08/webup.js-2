import { Components } from "@sme.up/ketchup";
import {
  KupDataTableComponent,
  DataTableOptions,
} from "../../../../../../managers/converters-manager/converters/components/smeup/exb-mat/dataTable";
import { createSimpleKupDataTable } from "../../../../assets/components/smeup/exb-mat/kup-data";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Create first data table options
 */
export const createFirstDataTableOptions = (): DataTableOptions => {
  return {
    shape: Shapes.MAT,
    dSep: ",",
  };
};

/**
 * Create first data table config
 */
export const createFirstDataTableConfig =
  (): Partial<Components.KupDataTable> => {
    return {};
  };

/**
 * Create first convertion result
 */
export const createFirstDataTableDataAndConfig = (): Pick<
  KupDataTableComponent,
  "data" | "config"
> => {
  return {
    data: createSimpleKupDataTable(),
    config: createFirstDataTableConfig(),
  };
};
