import { KupChartComponent, ChartOptions } from "./chart";
import { SmeupTable } from "../../../../declarations/data-structures/smeupTable";
import { tableToKupDataTable } from "../../../utilities/tableToKupDataTable";
import { Components } from "@sme.up/ketchup/dist/types/components";
import { ChartType } from "@sme.up/ketchup/dist/types/components/kup-chart/kup-chart-declarations";
import { Column } from "../../../../declarations/data-structures/smeupDataStructure";
import { isYes } from "../../../../utils/smeupDataStructuresUtilities";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";

/**
 * Smeup table and Chart options to Chart data and config
 * @param options Chart options
 * @param backendData SmeupTable
 * @param kupManager KupManager
 * @returns Chart data and config
 */
export const chartConverter = (
  options: ChartOptions,
  backendData: SmeupTable,
  kupManager: KupManager,
): Pick<KupChartComponent, "data" | "config"> => {
  return {
    data: tableToKupDataTable(backendData, options.dSep, kupManager),
    config: chartOptionsToChartProps(options, backendData),
  };
};

/**
 * Create Kup Chart component
 * @param options
 * @returns Partial<Components.KupChart>
 */
export const chartOptionsToChartProps = (
  options: ChartOptions,
  backendData: SmeupTable,
): Partial<Components.KupChart> => {
  // defaults
  const config: Partial<Components.KupChart> = {
    series: [],
    types: [],
    sizeY: "300px",
  };

  // find ASSE/SERIE
  backendData.columns.forEach((column: Column) => {
    if (column.fill == "ASSE") {
      config.axis = column.code;
    } else {
      if (column.fill == "SERIE") {
        config.series?.push({
          code: column.code,
          decode: column.text,
        });
      }
    }
  });

  // show marks
  config.showMarks = isYes(options.ShowMarks) ? true : false;

  // types
  switch (options.Typ) {
    case "VBAR":
      config.types?.push("Vbar" as ChartType);
      break;
  }

  return config;
};
