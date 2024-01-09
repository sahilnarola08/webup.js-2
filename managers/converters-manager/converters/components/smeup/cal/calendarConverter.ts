import { KupCalendarComponent, CalendarOptions } from "./calendar";
import { SmeupTable } from "../../../../declarations/data-structures/smeupTable";
import { Components } from "@sme.up/ketchup/dist/types/components";
import {
  KupCalendarColumn,
  KupCalendarData,
  KupCalendarOptions,
} from "@sme.up/ketchup/dist/types/components/kup-calendar/kup-calendar-declarations";
import {
  KupDataColumn,
  KupDataRow,
} from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import { columnToKupColumn } from "../../../utilities/columnToKupColumn";
import { rowToKupRow } from "../../../utilities/rowToKupRow";
import {
  Column,
  Row,
} from "../../../../declarations/data-structures/smeupDataStructure";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";

/**
 * Smeup table and Calendar options to Calendar data and config
 * @param options Calendar options
 * @param backendData SmeupTable
 * @param kupManager KupManager
 * @returns Calendar data and config
 */
export const calendarConverter = (
  options: CalendarOptions,
  backendData: SmeupTable,
  kupManager: KupManager,
): Pick<KupCalendarComponent, "data" | "config"> => {
  const data: KupCalendarData = {
    columns: [],
    rows: [],
  };
  const config: Partial<Components.KupCalendar> = {};
  tableToKupCalendarData(backendData, options, data, config, kupManager);
  calendarOptionsToCalendarProps(options, config);

  return {
    data,
    config,
  };
};

/**
 * Create Kup Calendar component
 * @param options
 * @returns Partial<Components.KupCalendar>
 */
export const calendarOptionsToCalendarProps = (
  _options: CalendarOptions,
  config: Partial<Components.KupCalendar>,
): Partial<Components.KupCalendar> => {
  config.hideNavigation = false;
  // get other props
  return config;
};

/**
 * Convert smeup table and calendar option to KupCalendarData
 * @param table
 * @param options
 */
export const tableToKupCalendarData = (
  table: SmeupTable,
  options: CalendarOptions,
  data: KupCalendarData,
  config: Partial<Components.KupCalendar>,
  kupManager: KupManager,
): KupCalendarData => {
  // set columns
  table.columns.forEach((column: Column) => {
    const kupColumn: KupDataColumn = columnToKupColumn(column);
    const kupCalColumn: KupCalendarColumn = {
      ...kupColumn,
      calendarOption: "" as KupCalendarOptions,
    };
    data.columns.push(kupCalColumn);
  });

  //set rows
  table.rows.forEach((row: Row) => {
    const kupRow: KupDataRow = rowToKupRow(
      row,
      table.columns,
      options.dSep,
      kupManager,
    );
    data.rows.push(kupRow);
  });

  // set calendar column option
  for (const optionName of Object.keys(options)) {
    switch (optionName) {
      // date column
      case "DatCol":
        {
          const columnName = options.DatCol as string;
          const c = kupManager.data.column.find(data.columns, {
            name: columnName,
          });
          if (c && c.length > 0) {
            const column: KupCalendarColumn = c[0] as KupCalendarColumn;
            column.calendarOption = "date" as KupCalendarOptions;
            // set currentDate as first record
            if (data.rows[0].cells) {
              config.currentDate = data.rows[0]?.cells[columnName].value;
            }
          }
        }
        break;
      // title column
      case "TitCol":
        {
          const columnName = options.TitCol as string;
          const c = kupManager.data.column.find(data.columns, {
            name: columnName,
          });
          if (c && c.length > 0) {
            const column: KupCalendarColumn = c[0] as KupCalendarColumn;
            column.calendarOption = "descr" as KupCalendarOptions;
          }
        }
        break;
    }
  }
  return data;
};
