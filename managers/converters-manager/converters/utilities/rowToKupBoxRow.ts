import { KupBoxRow } from "@sme.up/ketchup/dist/types/components/kup-box/kup-box-declarations";
import { KupDataRowCells } from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import { BoxListOptions } from "../components/smeup/box/boxList";
import { KupDataCell } from "../components/smeup/exb-mat/dataTable";
import {
  Column,
  Row,
} from "../../declarations/data-structures/smeupDataStructure";
import { SmeupLayout } from "../../declarations/data-structures/smeupLayout";
import { SmeupStyle } from "../../declarations/data-structures/smeupSch";
import { getColumnByName } from "../../utils/kupDataUtilities";
import { cellToKupCell } from "./cellToKupCell";
import { defaultKupBoxLayout, layoutToKupBoxLayout } from "./layout";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";

/**
 * Convert row structure to kup box row
 * @param row
 * @returns Ketchup Row
 */
export const rowToKupBoxRow = (
  row: Row,
  columns: Column[] | undefined,
  layout: SmeupLayout | undefined,
  styles: SmeupStyle[] | undefined,
  options: BoxListOptions,
  kupManager: KupManager,
): KupBoxRow => {
  // create empty cell holder
  const kupCellHolder: KupDataRowCells = {};

  // create empty kup box row
  const kupBoxRow: KupBoxRow = {
    cells: kupCellHolder,
  };

  // set cells
  for (const cellName in row.fields) {
    // ignore specific cells
    if (cellName != "RowId" && cellName != "ID") {
      const cell = row.fields[cellName];
      const column = getColumnByName(cellName, columns);
      const kupCell: KupDataCell = cellToKupCell(
        cell,
        column,
        false,
        options.dSep,
        kupManager,
      );
      if (kupBoxRow.cells) {
        kupBoxRow.cells[cellName] = kupCell;
      }
    }
  }

  // set id
  if (row.fields && row.fields.RowId) {
    kupBoxRow.id = (
      parseInt(row.fields.RowId.smeupObject.codice) + 1
    ).toString();
  }

  // layout
  if (row.layout) {
    kupBoxRow.layout = row.layout;
  } else if (layout) {
    kupBoxRow.layout = {};
    layoutToKupBoxLayout(layout, styles, kupBoxRow, columns, row, options);
  } else {
    kupBoxRow.layout = {};
    defaultKupBoxLayout(kupBoxRow, columns, row, options?.Columns);
  }
  return kupBoxRow;
};
