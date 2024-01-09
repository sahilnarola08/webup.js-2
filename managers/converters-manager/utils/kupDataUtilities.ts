import { Column } from "../declarations/data-structures/smeupDataStructure";

/**
 * Get column by column name
 * @param columnName
 * @param columns
 * @returns
 */
export function getColumnByName(
  columnName: string,
  columns?: Column[]
): Column {
  if (!columns) {
    return undefined;
  }
  return columns.find((element: Column) => element.code == columnName);
}
