import { Components, KupDataDataset } from "@sme.up/ketchup";
import { YesNo } from "../../../../declarations/data-structures/general";
import {
  ComponentOptions,
  KupComponent,
} from "../../../../declarations/component";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

export interface KupPlannerComponent extends KupComponent {
  /** data */
  data: KupDataDataset;
  /** detail data */
  detailData: KupDataDataset;
  /** props */
  config: Partial<Components.KupPlanner>;
}

/**
 * Planner options
 */
export interface PlannerOptions extends ComponentOptions {
  shape: Shapes.PLN;
  TaskColumns: string;
  TaskDates: string;
  TaskHeight: string;
  TaskIconCol: string;
  TaskIdCol: string;
  TaskNameCol: string;
  TaskPrevDates: string;

  PhaseColorCol: string;
  PhaseColParDep: string;
  PhaseColumns: string;
  PhaseDates: string;
  PhaseFun: string;
  PhaseIconCol: string;
  PhaseIdCol: string;
  PhaseNameCol: string;
  PhasePrevDates: string;

  DetailColorCol: string;
  DetailColumns: string;
  DetailDates: string;
  DetailFun: string;
  DetailHeight: string;
  DetailIconCol: string;
  DetailIdCol: string;
  DetailNameCol: string;
  DetailPrevDates: string;

  ListCellWidth: string;
  MaxWidth: string;
  ShowSecondaryDates: YesNo;
  TitleMess: string;
}
