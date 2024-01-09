import {
  KupDataRowCells,
  KupDataRow,
} from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import { KupDataCell } from "../components/smeup/exb-mat/dataTable";
import {
  Column,
  Row,
} from "../../declarations/data-structures/smeupDataStructure";
import { getColumnByName } from "../../utils/kupDataUtilities";
import { cellToKupCell } from "./cellToKupCell";
import { ComponentOptions } from "../../declarations/component";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";

/**
 * Convert row structure to kup row
 * @param row
 * @returns Ketchup Row
 */
export const rowToKupRow = (
  row: Row,
  columns: Column[] | undefined,
  dSep: string,
  kupManager: KupManager,
): KupDataRow => {
  // create empty cell holder
  const kupCellHolder: KupDataRowCells = {};

  // create empty kup row
  const kupRow: KupDataRow = {
    cells: kupCellHolder,
  };

  if (!row) {
    return kupRow;
  }
  // set cells
  for (const cellName in row.fields) {
    // ignore specific cells
    if (cellName != "RowId" && cellName != "ID") {
      const kupCell: KupDataCell = cellToKupCell(
        row.fields[cellName],
        getColumnByName(cellName, columns),
        false,
        dSep,
        kupManager,
      );
      if (kupRow.cells) {
        kupRow.cells[cellName] = kupCell;
      }
    }
  }

  // set id
  if (row.fields && row.fields.RowId) {
    kupRow.id = (parseInt(row.fields.RowId.smeupObject.codice) + 1).toString();
  }

  return kupRow;
};
