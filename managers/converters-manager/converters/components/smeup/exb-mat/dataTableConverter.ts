import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";
import { KupDataTableComponent, DataTableOptions } from "./dataTable";
import { SmeupTable } from "../../../../declarations/data-structures/smeupTable";
import { tableToKupDataTable } from "../../../utilities/tableToKupDataTable";
import { Components } from "@sme.up/ketchup/dist/types/components";

/**
 * Smeup table and Data Table options to Data Table data and config
 * @param options Data table options
 * @param backendData SmeupTable
 * @param kupManager KupManager
 * @returns Data Table data and config
 */
export const dataTableConverter = (
  options: DataTableOptions,
  backendData: SmeupTable,
  kupManager: KupManager,
): Pick<KupDataTableComponent, "data" | "config"> => {
  return {
    data: tableToKupDataTable(backendData, options.dSep, kupManager),
    config: dataTableOptionsToDataTableProps(options),
  };
};

/**
 * Create Kup Data Table component
 * @param backendData
 * @param options
 * @returns Partial<Components.KupDataTable>
 */
export const dataTableOptionsToDataTableProps = (
  options: DataTableOptions,
): Partial<Components.KupDataTable> => {
  const kupDataTable: Partial<Components.KupDataTable> = {};

  if (options.RowsPerPage) {
    kupDataTable.rowsPerPage = options.RowsPerPage;
  }
  // get other props
  return kupDataTable;
};
