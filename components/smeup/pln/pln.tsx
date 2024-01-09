import React, { useEffect, useRef } from "react";
import {
  Planner,
  RawComponent,
  Shapes,
} from "../../../declarations/componentDeclarations";
import { KupPlanner } from "@sme.up/ketchup-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getComponentById } from "../../../store/reduces/components";
import { RootState } from "../../../store/store";
import {
  getComponentOptions,
  getCopyOfComponent,
  isFBKData,
  isScheda,
  preElabComponent,
} from "../../../utils/componentUtils";
import { getClassNames, getTitleTag } from "../../utils";
import { KupPlannerEventPayload } from "@sme.up/ketchup";
import { createDynamism } from "../../../utils/dynamismUtils";
import { executeRowDynamism } from "../../../managers/dynamismManager";
import {
  DynamismEntity,
  DynamismEvents,
} from "../../../declarations/dynamismDeclarations";
import { convertersManager } from "../../../managers/convertersManager";
import {
  KupPlannerGanttRowType,
  KupPlannerGanttTask,
  KupPlannerPhase,
  KupPlannerTaskAction,
} from "@sme.up/ketchup/dist/types/components/kup-planner/kup-planner-declarations";
import executeDynamism, {
  addImplicitVariablesForColumnsOfRow,
} from "../../../managers/dynamismManager";
import useKupManager from "../../../composable/useKupManager";
import { KupDataRow } from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import { PlannerOptions } from "../../../managers/converters-manager/converters/components/smeup/pln/planner";
import { logInfo } from "../../../utils/logger";

/* global HTMLKupPlannerElement */

type Props = {
  rawComponent: RawComponent;
};

const Pln: React.FC<Props> = props => {
  const planner: Planner = useSelector((state: RootState) =>
    getComponentById(state, props.rawComponent.id),
  ) as Planner;
  const plannerRef: React.RefObject<HTMLKupPlannerElement> = useRef(null);
  const kupManager = useKupManager();
  const dispatch = useDispatch();
  const preElabOk = useRef(false);
  const firstCall = useRef(true);

  const onClick = async (event: CustomEvent<KupPlannerEventPayload>) => {
    logInfo("onClick", "pln.tsx", [event]);

    const options: PlannerOptions = getComponentOptions(
      Shapes.PLN,
      planner.options,
    ) as PlannerOptions;

    if (!event.detail.taskAction) {
      return;
    }
    const rowType = (event.detail.value as KupPlannerGanttTask).rowType;
    const nativeEventObject = event.detail.value;
    if (event.detail.taskAction == ("onTaskOpening" as KupPlannerTaskAction)) {
      if (options.PhaseFun) {
        const taskId = nativeEventObject.id;
        const rawDynamism: DynamismEntity = {
          event: DynamismEvents.CLICK,
          exec: options.PhaseFun,
        };
        const dynamism = createDynamism(rawDynamism);
        dynamism.source = planner.id;
        dynamism.schedaId = planner.schedaId;
        addImplicitVariablesForColumnsOfRow(
          null,
          planner.data.columns,
          (nativeEventObject as KupPlannerGanttTask).taskRow,
          kupManager,
          dynamism,
        );
        const data = await executeDynamism(dynamism, dispatch);
        if (!isFBKData(data) && !isScheda(data)) {
          const ret = convertersManager(
            Shapes.PLN,
            getCopyOfComponent(planner),
            data,
          );
          plannerRef.current.addPhases(taskId, ret.data);
        }
        // executeDynamism(dynamism, dispatch).then(data => {
        //   if (!isFBKData(data) && !isScheda(data)) {
        //     const ret = convertersManager(
        //       Shapes.PLN,
        //       getCopyOfComponent(planner),
        //       data,
        //     );
        //     plannerRef.current.addPhases(taskId, ret.data);
        //   }
        // });
      } else {
        const row: KupDataRow = (nativeEventObject as KupPlannerGanttTask)
          .taskRow;
        executeRowDynamism(
          planner.id,
          planner.schedaId,
          null,
          planner.data.columns,
          row,
          planner.dynamisms,
          [DynamismEvents.CLICK],
          kupManager,
          dispatch,
        );
      }
    }
    if (
      event.detail.taskAction == ("onClick" as KupPlannerTaskAction) &&
      rowType == ("phase" as KupPlannerGanttRowType)
    ) {
      const row: KupDataRow = (nativeEventObject as KupPlannerPhase).phaseRow;
      executeRowDynamism(
        planner.id,
        planner.schedaId,
        null,
        planner.data.columns,
        row,
        planner.dynamisms,
        [DynamismEvents.CLICK],
        kupManager,
        dispatch,
      );
    }
    if (
      event.detail.taskAction == ("onClick" as KupPlannerTaskAction) &&
      rowType == ("detail" as KupPlannerGanttRowType)
    ) {
      // const row: KupDataRow = (nativeEventObject as KupPlannerDetail)
      //   .taskRow;
      executeRowDynamism(
        planner.id,
        planner.schedaId,
        null,
        planner.data.columns,
        null,
        planner.dynamisms,
        [DynamismEvents.DETAIL_CLICK],
        kupManager,
        dispatch,
      );
    }
  };

  const onReady = () => {};

  const onDateChange = (event: CustomEvent<KupPlannerEventPayload>) => {
    logInfo("onDateChange", "pln.tsx", [event]);
    if (!event.detail.taskAction) {
      return;
    }
    const rowType = (event.detail.value as KupPlannerGanttTask).rowType;
    if (
      event.detail.taskAction == ("onResize" as KupPlannerTaskAction) &&
      rowType == ("task" as KupPlannerGanttRowType)
    ) {
      const row: KupDataRow = (event.detail.value as KupPlannerGanttTask)
        .taskRow;
      executeRowDynamism(
        planner.id,
        planner.schedaId,
        null,
        planner.data.columns,
        row,
        planner.dynamisms,
        [DynamismEvents.CHANGE],
        kupManager,
        dispatch,
      );
    }
    if (
      event.detail.taskAction == ("onResize" as KupPlannerTaskAction) &&
      rowType == ("phase" as KupPlannerGanttRowType)
    ) {
      const row: KupDataRow = (event.detail.value as KupPlannerPhase).phaseRow;
      executeRowDynamism(
        planner.id,
        planner.schedaId,
        null,
        planner.data.columns,
        row,
        planner.dynamisms,
        [DynamismEvents.RESIZE],
        kupManager,
        dispatch,
      );
    }
  };

  useEffect(() => {
    async function buildComponent() {
      preElabOk.current = await preElabComponent(
        planner,
        props.rawComponent,
        Shapes.PLN,
        firstCall,
        dispatch,
        kupManager,
      );
    }
    buildComponent().then(() => {
      if (
        preElabOk.current == true &&
        planner &&
        planner.loaded &&
        planner.data
      ) {
        // event listeners
      }
    });
  });

  if (planner) {
    if (!planner.loaded) {
      // donothing
    } else {
      if (planner.data) {
        return (
          <>
            {getTitleTag(planner)}
            <KupPlanner
              class={getClassNames(
                getComponentOptions(Shapes.PLN, planner.options),
              )}
              {...planner.config}
              id={planner.id}
              data={JSON.parse(JSON.stringify(planner.data))}
              detailData={
                planner.detailData
                  ? JSON.parse(JSON.stringify(planner.detailData))
                  : undefined
              }
              ref={plannerRef}
              onKup-planner-click={onClick}
              onKup-planner-datechange={onDateChange}
              onKup-planner-ready={onReady}
            />
          </>
        );
      }
    }
  }
};

export default Pln;
