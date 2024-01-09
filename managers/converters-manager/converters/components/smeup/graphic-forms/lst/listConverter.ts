import { Components } from "@sme.up/ketchup";
import { KupListNode } from "@sme.up/ketchup/dist/types/components/kup-list/kup-list-declarations";
import { KupListComponent, ListOptions } from "./list";
import {
  Row,
  SmeupTableDataStructure,
} from "../../../../../declarations/data-structures/smeupDataStructure";
import { rowToKupListNode } from "../../../../utilities/rowToKupListNode";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";

/**
 * Smeup table and List options to List data and config
 * @param options List options
 * @param backendData SmeupTable
 * @param _kupManager KupManager
 * @returns List data and config
 */
export const listConverter = (
  options: ListOptions,
  backendData: SmeupTableDataStructure,
  _kupManager: KupManager,
): Pick<KupListComponent, "data" | "config"> => {
  return {
    data: listDataConverter(backendData),
    config: listOptionsToListProps(options),
  };
};

/**
 * Convert smeup table to list data
 * @param table
 * @returns
 */
export const listDataConverter = (table: SmeupTableDataStructure) => {
  // create empty data
  const data: KupListNode[] = [];

  //set rows
  table.rows.forEach((row: Row) => {
    const kupListRow: KupListNode | undefined = rowToKupListNode(
      row,
      table.columns,
    );
    if (kupListRow) {
      data.push(kupListRow);
    }
  });

  return data;
};

/**
 * Create Kup list component
 * @param options
 * @returns Partial<Components.KupList>
 */
export const listOptionsToListProps = (
  _options: ListOptions,
): Partial<Components.KupList> => {
  const config: Partial<Components.KupList> = {};

  // get other props
  return config;
};
