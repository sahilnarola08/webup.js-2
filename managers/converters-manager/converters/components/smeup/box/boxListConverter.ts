import { BoxListOptions, KupBoxListComponent } from "./boxList";

import {
  Components,
  KupDataColumn,
} from "@sme.up/ketchup/dist/types/components";
import { columnToKupColumn } from "../../../utilities/columnToKupColumn";
import {
  KupBoxData,
  KupBoxRow,
} from "@sme.up/ketchup/dist/types/components/kup-box/kup-box-declarations";
import { rowToKupBoxRow } from "../../../utilities/rowToKupBoxRow";
import {
  Column,
  Row,
  SmeupTableDataStructure,
} from "../../../../declarations/data-structures/smeupDataStructure";
import { SmeupLayout } from "../../../../declarations/data-structures/smeupLayout";
import { SmeupStyle } from "../../../../declarations/data-structures/smeupSch";
import { stylesConverter } from "../../../utilities/layout";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";
import { isYes } from "../../../../utils/smeupDataStructuresUtilities";

/**
 * Smeup table and Box options to Box data and config
 * @param options Box options
 * @param backendData SmeupTable
 * @param kupManager KupManager
 * @returns Box data and config
 */
export const boxListConverter = (
  options: BoxListOptions,
  backendData: SmeupTableDataStructure,
  layout: SmeupLayout | undefined,
  styles: SmeupStyle[] | undefined,
  kupManager: KupManager,
): Pick<KupBoxListComponent, "data" | "config"> => {
  return {
    data: boxDataConverter(
      backendData,
      layout,
      stylesConverter(styles, kupManager),
      options,
      kupManager,
    ),
    config: boxOptionsToBoxProps(options),
  };
};

/**
 * Convert smeup table to box data
 * @param table
 * @returns
 */
export const boxDataConverter = (
  table: SmeupTableDataStructure,
  layout: SmeupLayout | undefined,
  styles: SmeupStyle[] | undefined,
  options: BoxListOptions,
  kupManager: KupManager,
) => {
  // create empty data
  const data: KupBoxData = {
    columns: [],
    rows: [],
  };

  // set columns
  table.columns.forEach((column: Column) => {
    const kupColumn: KupDataColumn = columnToKupColumn(column);
    data.columns?.push(kupColumn);
  });

  //set rows
  table.rows.forEach((row: Row) => {
    const kupBoxRow: KupBoxRow = rowToKupBoxRow(
      row,
      table.columns,
      layout,
      styles,
      options,
      kupManager,
    );
    data.rows?.push(kupBoxRow);
  });

  return data;
};

/**
 * Create Kup Box component
 * @param options
 * @returns Partial<Components.KupBox>
 */
export const boxOptionsToBoxProps = (
  options: BoxListOptions,
): Partial<Components.KupBox> => {
  const config: Partial<Components.KupBox> = {};

  if (options.LoadMRows && isYes(options.LoadMRows)) {
    config.lazyLoadRows = true;
  }

  if (options.PageSize) {
    config.pagination = true;
    config.rowsPerPage = options.PageSize;
  }
  if (options.SelFirst && isYes(options.SelFirst)) {
    config.selectBox = 1;
  } else if (options.SelectRow && options.SelectRow > 0) {
    config.selectBox = options.SelectRow;
  }

  if (options.ShowSelection) {
    config.showSelection = isYes(options.ShowSelection);
  }

  // get other props
  return config;
};
