import { KupDataColumn } from "@sme.up/ketchup";
import { Column } from "../../declarations/data-structures/smeupDataStructure";
import { SmeupObject } from "../../declarations/data-structures/smeupObject";
import {
  createSmeupObject,
  isDate,
  isTime,
  toKupObj,
} from "../../utils/smeupObjectUtilities";

/**
 * Convert column structure to kup column
 * @param column
 * @returns Ketchup Column
 */
export const columnToKupColumn = (column: Column): KupDataColumn => {
  // create empty column (default value)
  const kupColumn: KupDataColumn = {
    name: "",
    title: "",
  };

  // set column name
  kupColumn.name = column.code;

  // set column title
  if (column.text) {
    kupColumn.title = column.text;
  }

  // set smeup object
  if (column.canonicalForm) {
    kupColumn.obj = toKupObj(createSmeupObject(column.canonicalForm));
  }

  // set visible
  if (isColumnHidden(column)) {
    kupColumn.visible = false;
  }
  if (column.lun) {
    let lun = column.lun;
    const luns = lun.split(";");
    if (luns && luns.length > 1 && luns[1]) {
      kupColumn.decimals = Number(luns[1]);
    }
  }
  return kupColumn;
};

export const isColumnHidden = (column?: Column): boolean => {
  return !column || column.IO === "H";
};

export const isColumnDisabled = (column: Column): boolean => {
  return column && column.IO === "O";
};

export const isColumnAutocomplete = (column: Column): boolean => {
  return column && (column.IO === "E" || column.cmp === "Acp");
};

export const isColumnCombobox = (column: Column): boolean => {
  // FIXME: check IO for combo
  return column && (column.IO === "E" || column.cmp === "Cmb");
};

export const isColumnInputField = (
  column: Column,
  cellSmeupObject: SmeupObject,
): boolean => {
  if (!column || isColumnDisabled(column)) {
    return false;
  }
  if (isColumnFieldExtendsTextField(column, cellSmeupObject)) {
    return true;
  }
  if (
    cellSmeupObject &&
    (cellSmeupObject.tipo == "J4" || cellSmeupObject.tipo == "V2")
  ) {
    return false;
  }

  return true;
};
/**
 *
 * @param column column to check
 * @return true if the column will be a kup-component witch extends f-text-field
 */
export const isColumnFieldExtendsTextField = (
  column: Column,
  smeupObject: SmeupObject,
): boolean => {
  if (isColumnAutocomplete(column)) {
    return true;
  }
  if (isColumnCombobox(column)) {
    return true;
  }
  if (isDate(smeupObject)) {
    return true;
  }
  if (isTime(smeupObject)) {
    return true;
  }
  return false;
};
/**
 *
 * @param columnName column name to find
 * @param columns columns to check
 * @return the column found
 */
export const findColumn = (columnName: string, columns: Column[]): Column => {
  if (!columns || !columnName) {
    return null;
  }

  for (let index = 0; index < columns.length; index++) {
    const column: Column = columns[index];
    if (column.code == columnName) {
      return column;
    }
  }
  return null;
};
