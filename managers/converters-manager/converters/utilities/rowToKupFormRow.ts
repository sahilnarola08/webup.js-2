import { KupFormRow } from "@sme.up/ketchup/dist/types/components/kup-form/kup-form-declarations";
import { KupDataRowCells } from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import { KupDataCell } from "../components/smeup/exb-mat/dataTable";
import { InputPanelOptions } from "../components/smeup/inp/inputPanel";
import {
  Column,
  Row,
} from "../../declarations/data-structures/smeupDataStructure";
import {
  SmeupLayout,
  SmeupField,
  SmeupFields,
} from "../../declarations/data-structures/smeupLayout";
import { getColumnByName } from "../../utils/kupDataUtilities";
import { cellToKupCell } from "./cellToKupCell";
import { layoutToKupFormLayout } from "./layout";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";
import {
  isColumnDisabled,
  isColumnFieldExtendsTextField,
  isColumnInputField,
} from "./columnToKupColumn";
import { isNo } from "../../utils/smeupDataStructuresUtilities";

/**
 * Convert row structure to kup form row
 * @param row
 * @returns Ketchup Row
 */
export const rowToKupFormRow = (
  row: Row,
  columns: Column[] | undefined,
  layout: SmeupLayout | undefined,
  options: InputPanelOptions,
  kupManager: KupManager,
): KupFormRow => {
  // create empty cell holder
  const kupCellHolder: KupDataRowCells = {};

  // create empty kup form row
  const kupFormRow: KupFormRow = {
    cells: kupCellHolder,
  };

  // set cells
  for (const cellName in row.fields) {
    // ignore specific cells
    if (cellName != "RowId" && cellName != "ID") {
      const cell = row.fields[cellName];
      const column = getColumnByName(cellName, columns);
      const editableData: boolean = true;
      const kupCell: KupDataCell = cellToKupCell(
        cell,
        column,
        editableData,
        options.dSep,
        kupManager,
      );
      if (editableData && column) {
        const isInputField = isColumnInputField(column, cell.smeupObject);
        if (isInputField) {
          if (options.CharCounter && isNo(options.CharCounter)) {
            if (isColumnFieldExtendsTextField(column, cell.smeupObject)) {
              if (!kupCell.data) {
                kupCell.data = {};
              }
              if (!kupCell.data.data) {
                kupCell.data.data = {};
              }
              if (!kupCell.data.data["kup-text-field"]) {
                kupCell.data.data["kup-text-field"] = {};
              }
              kupCell.data.data["kup-text-field"].hiddenCounter = true;
            } else {
              if (!kupCell.data) {
                kupCell.data = {};
              }
              kupCell.data.hiddenCounter = true;
            }
          }
          if (options.VKeyboardMode && options.VKeyboardMode == "user") {
            if (isColumnFieldExtendsTextField(column, cell.smeupObject)) {
              if (!kupCell.data) {
                kupCell.data = {};
              }
              if (!kupCell.data.data) {
                kupCell.data.data = {};
              }
              if (!kupCell.data.data["kup-text-field"]) {
                kupCell.data.data["kup-text-field"] = {};
              }
              kupCell.data.data["kup-text-field"].inputMode = "none";
              kupCell.data.data["kup-text-field"].icon = "keyboard";
            } else {
              if (!kupCell.data) {
                kupCell.data = {};
              }
              kupCell.data.inputMode = "none";
              kupCell.data.icon = "keyboard";
            }
          }
        }
      }
      if (kupFormRow.cells) {
        kupFormRow.cells[cellName] = kupCell;
      }
    }
  }

  // set id
  if (row.fields && row.fields.RowId) {
    kupFormRow.id = (
      parseInt(row.fields.RowId.smeupObject.codice) + 1
    ).toString();
  }

  const layoutFields: SmeupFields = {};

  // layout
  if (row.layout) {
    kupFormRow.layout = row.layout;
  }
  if (layout) {
    kupFormRow.layout = {};
    layoutToKupFormLayout(
      layout,
      kupFormRow,
      columns,
      row,
      options,
      layoutFields,
    );
  }

  enrichKupDataCellWithLayoutFields(kupFormRow, layoutFields);

  return kupFormRow;
};

export const enrichKupDataCellWithLayoutFields = (
  kupFormRow: KupFormRow,
  layoutFields: SmeupFields,
): void => {
  if (!kupFormRow || !kupFormRow.cells || !layoutFields) {
    return;
  }
  for (const cellName in kupFormRow.cells) {
    const kupCell: KupDataCell = kupFormRow.cells[cellName];
    if (
      layoutFields[cellName] &&
      layoutFields[cellName].attributes &&
      layoutFields[cellName].attributes.Focus == "Yes"
    ) {
      kupCell.hasFocus = true;
    }
  }
};
