import { Components } from "@sme.up/ketchup";
import { ChartType } from "@sme.up/ketchup/dist/types/components/kup-chart/kup-chart-declarations";
import {
  KupChartComponent,
  ChartOptions,
} from "../../../../../../managers/converters-manager/converters/components/smeup/exa-cha/chart";
import { createSimpleKupDataTable } from "../../../../assets/components/smeup/exa-cha/kup-data";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Create fisrt chart options
 */
export const createFirstChartOptions = (): ChartOptions => {
  return {
    shape: Shapes.CHA,
    Typ: "VBAR",
    dSep: ",",
  };
};

/**
 * Create first kup chart config
 */
export const createFirstChartConfig = (): Partial<Components.KupChart> => {
  return {
    axis: "XXDAT1",
    series: [
      {
        code: "XXDESC",
        decode: "Descrizione",
      },
    ],
    showMarks: false,
    sizeY: "300px",
    types: ["Vbar" as ChartType],
  };
};

/**
 * Create first chart convertion result
 */
export const createFirstChartDataAndConfig = (): Pick<
  KupChartComponent,
  "data" | "config"
> => {
  return {
    data: createSimpleKupDataTable(),
    config: createFirstChartConfig(),
  };
};
