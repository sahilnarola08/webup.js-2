import { SmeupTable } from "../../../../declarations/data-structures/smeupTable";
import { tableToKupDataTable } from "../../../utilities/tableToKupDataTable";
import { Components } from "@sme.up/ketchup/dist/types/components";
import { KupPlannerComponent, PlannerOptions } from "./planner";
import { isYes } from "../../../../utils/smeupDataStructuresUtilities";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";

/**
 * Smeup table and Data Table options to Planner data and config
 * @param options Planner options
 * @param backendData SmeupTable main data
 * @param backendDetailData SmeupTable detail data
 * @param kupManager KupManager
 * @returns Planner data and config
 */
export const plannerConverter = (
  options: PlannerOptions,
  backendData: SmeupTable,
  backendDetailData: SmeupTable,
  kupManager: KupManager,
): Pick<KupPlannerComponent, "data" | "detailData" | "config"> => {
  const config = plannerOptionsToPlannerProps(options);
  const data = tableToKupDataTable(backendData, options.dSep, kupManager);
  const detailData = backendDetailData
    ? tableToKupDataTable(backendDetailData, options.dSep, kupManager)
    : undefined;

  return {
    data,
    detailData,
    config,
  };
};

/**
 * Create Kup Planner component
 * @param backendData
 * @param options
 * @returns Partial<Components.KupPlanner>
 */
export const plannerOptionsToPlannerProps = (
  options: PlannerOptions,
): Partial<Components.KupPlanner> => {
  const kupPlanner: Partial<Components.KupPlanner> = {};

  if (options.TaskColumns) {
    kupPlanner.taskColumns = options.TaskColumns.split("|");
  }
  if (options.TaskDates) {
    kupPlanner.taskDates = options.TaskDates.split("|");
  }
  if (options.TaskHeight) {
    kupPlanner.taskHeight = parseInt(options.TaskHeight);
  }
  if (options.TaskIconCol) {
    kupPlanner.taskIconCol = options.TaskIconCol;
  }
  if (options.TaskIdCol) {
    kupPlanner.taskIdCol = options.TaskIdCol;
  }
  if (options.TaskNameCol) {
    kupPlanner.taskNameCol = options.TaskNameCol;
  }
  if (options.TaskPrevDates) {
    kupPlanner.taskPrevDates = options.TaskPrevDates.split("|");
  }
  if (options.PhaseColorCol) {
    kupPlanner.phaseColorCol = options.PhaseColorCol;
  }
  if (options.PhaseColParDep) {
    kupPlanner.phaseColParDep = options.PhaseColParDep;
  }
  if (options.PhaseColumns) {
    kupPlanner.phaseColumns = options.PhaseColumns.split("|");
  }
  if (options.PhaseDates) {
    kupPlanner.phaseDates = options.PhaseDates.split("|");
  }
  if (options.PhaseIconCol) {
    kupPlanner.phaseIconCol = options.PhaseIconCol;
  }
  if (options.PhaseIdCol) {
    kupPlanner.phaseIdCol = options.PhaseIdCol;
  }
  if (options.PhaseNameCol) {
    kupPlanner.phaseNameCol = options.PhaseNameCol;
  }
  if (options.PhasePrevDates) {
    kupPlanner.phasePrevDates = options.PhasePrevDates.split("|");
  }
  if (options.DetailColorCol) {
    kupPlanner.detailColorCol = options.DetailColorCol;
  }
  if (options.DetailColumns) {
    kupPlanner.detailColumns = options.DetailColumns.split("|");
  }
  if (options.DetailDates) {
    kupPlanner.detailDates = options.DetailDates.split("|");
  }
  if (options.DetailHeight) {
    kupPlanner.detailHeight = parseInt(options.DetailHeight);
  }
  if (options.DetailIconCol) {
    kupPlanner.detailIconCol = options.DetailIconCol;
  }
  if (options.DetailIdCol) {
    kupPlanner.detailIdCol = options.DetailIdCol;
  }
  if (options.DetailNameCol) {
    kupPlanner.detailNameCol = options.DetailNameCol;
  }
  if (options.DetailPrevDates) {
    kupPlanner.detailPrevDates = options.DetailPrevDates.split("|");
  }

  if (options.ListCellWidth) {
    kupPlanner.listCellWidth = options.ListCellWidth;
  }
  if (options.MaxWidth) {
    kupPlanner.maxWidth = options.MaxWidth;
  }
  if (options.ShowSecondaryDates && isYes(options.ShowSecondaryDates)) {
    kupPlanner.showSecondaryDates = true;
  }
  if (options.TitleMess) {
    kupPlanner.titleMess = options.TitleMess;
  }

  // get other props
  return kupPlanner;
};
