import {
  ComponentOptions,
  KupComponent,
} from "../../../../declarations/component";
import { Components } from "@sme.up/ketchup/";
import { KupDataDataset } from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import { YesNo } from "../../../../declarations/data-structures/general";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Chart
 */
export interface KupChartComponent extends KupComponent {
  /** data */
  data: KupDataDataset;
  /** props */
  config: Partial<Components.KupChart>;
}

/**
 * Chart options
 */
export interface ChartOptions extends ComponentOptions {
  shape: Shapes.CHA;
  AxisYMax?: string;
  AxisYMin?: string;
  LabelAngle?: string;
  MarkXValue?: YesNo;
  MarkYValue?: YesNo;
  ShowMarks?: YesNo;
  Typ?: "VBAR";
}
