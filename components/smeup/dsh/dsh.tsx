import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  DashList,
  RawComponent,
  Shapes,
} from "../../../declarations/componentDeclarations";
import { getComponentById } from "../../../store/reduces/components";
import { RootState } from "../../../store/store";
import {
  getComponentOptions,
  preElabComponent,
} from "../../../utils/componentUtils";
import { getClassNames, getTitleTag } from "../../utils";
import useKupManager from "../../../composable/useKupManager";
import { KupCardList } from "@sme.up/ketchup-react";
import { KupCardListClickEventPayload } from "@sme.up/ketchup";
import {
  KupDataColumn,
  KupDataRow,
} from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import { executeRowDynamism } from "../../../managers/dynamismManager";
import { DynamismEvents } from "../../../declarations/dynamismDeclarations";

type Props = {
  rawComponent: RawComponent;
};

const Dsh: React.FC<Props> = props => {
  const dash: DashList = useSelector((state: RootState) =>
    getComponentById(state, props.rawComponent.id),
  ) as DashList;
  const dispatch = useDispatch();
  const kupManager = useKupManager();
  const preElabOk = useRef(false);
  const firstCall = useRef(true);

  const onClick = (event: CustomEvent<KupCardListClickEventPayload>) => {
    //const index: number = event.detail.index;
    const row: KupDataRow = event.detail.row;
    const selectedColumn: KupDataColumn = null;
    executeRowDynamism(
      dash.id,
      dash.schedaId,
      selectedColumn,
      dash.data.columns,
      row,
      dash.dynamisms,
      [DynamismEvents.CLICK],
      kupManager,
      dispatch,
    );
  };

  useEffect(() => {
    async function buildComponent() {
      preElabOk.current = await preElabComponent(
        dash,
        props.rawComponent,
        Shapes.DSH,
        firstCall,
        dispatch,
        kupManager,
      );
    }
    buildComponent().then(() => {
      if (preElabOk.current == true && dash && dash.loaded && dash.data) {
        // event listeners
      }
    });
  });

  if (dash) {
    if (!dash.loaded) {
      // donothing
    } else {
      if (dash.data && dash.data.rows?.length > 0) {
        return (
          <>
            {getTitleTag(dash)}
            <div>
              <KupCardList
                class={getClassNames(
                  getComponentOptions(Shapes.DSH, dash.options),
                )}
                style={dash.style}
                {...dash.config}
                isClickable={dash.dynamisms && dash.dynamisms.length > 0}
                data={JSON.parse(JSON.stringify(dash.data))}
                onKup-cardlist-click={onClick}
              ></KupCardList>
            </div>
          </>
        );
      }
    }
  }
};

export default Dsh;
