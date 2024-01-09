import {
  KupDataRow,
  KupDataDataset,
  KupDataColumn,
} from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import {
  Column,
  Row,
} from "../../declarations/data-structures/smeupDataStructure";
import { SmeupTable } from "../../declarations/data-structures/smeupTable";
import { columnToKupColumn } from "./columnToKupColumn";
import { rowToKupRow } from "./rowToKupRow";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";

/**
 * Convert table structure to kup DataTable
 * @param table
 * @returns Ketchup DataTable
 */
export const tableToKupDataTable = (
  table: SmeupTable,
  dSep: string,
  kupManager: KupManager,
): KupDataDataset => {
  // create empty data table
  const dataTable: KupDataDataset = {
    columns: [],
    rows: [],
  };

  // set columns
  table.columns.forEach((column: Column) => {
    const kupColumn: KupDataColumn = columnToKupColumn(column);
    dataTable.columns?.push(kupColumn);
  });

  //set rows
  table.rows.forEach((row: Row) => {
    const kupRow: KupDataRow = rowToKupRow(
      row,
      table.columns,
      dSep,
      kupManager,
    );
    dataTable.rows?.push(kupRow);
  });

  return dataTable;
};
