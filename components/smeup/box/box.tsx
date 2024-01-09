import React, { useEffect, useRef } from "react";
import {
  BoxList,
  RawComponent,
  Shapes,
} from "../../../declarations/componentDeclarations";
import { KupBox } from "@sme.up/ketchup-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getComponentById } from "../../../store/reduces/components";
import { RootState } from "../../../store/store";
import {
  getComponentOptions,
  preElabComponent,
} from "../../../utils/componentUtils";
import { getClassNames, getTitleTag } from "../../utils";
import {
  KupBoxAutoSelectEventPayload,
  KupBoxClickEventPayload,
} from "@sme.up/ketchup/dist/types/components/kup-box/kup-box-declarations";
import {
  KupDataColumn,
  KupDataRow,
} from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import { executeRowDynamism } from "../../../managers/dynamismManager";
import { DynamismEvents } from "../../../declarations/dynamismDeclarations";
import useKupManager from "../../../composable/useKupManager";
import { FCellEventPayload } from "@sme.up/ketchup/dist/types/f-components/f-cell/f-cell-declarations";

/* global HTMLKupBoxElement */

type Props = {
  rawComponent: RawComponent;
};

const Box: React.FC<Props> = props => {
  const boxList: BoxList = useSelector((state: RootState) =>
    getComponentById(state, props.rawComponent.id),
  ) as BoxList;
  const boxListRef: React.RefObject<HTMLKupBoxElement> = useRef(null);
  const kupManager = useKupManager();
  const dispatch = useDispatch();
  const preElabOk = useRef(false);
  const firstCall = useRef(true);

  const onClick = (event: CustomEvent<KupBoxClickEventPayload>) => {
    const columnName: string = event.detail.column;
    const row: KupDataRow = event.detail.row;
    const columnArray =
      boxList.data.columns && columnName
        ? kupManager.data.column.find(boxList.data, {
            name: columnName,
          })
        : [];

    const selectedColumn: KupDataColumn =
      columnArray && columnArray.length > 0 ? columnArray[0] : null;

    if (selectedColumn && kupManager.objects.isButton(selectedColumn.obj)) {
      return;
    }

    executeRowDynamism(
      boxList.id,
      boxList.schedaId,
      selectedColumn,
      boxList.data.columns,
      row,
      boxList.dynamisms,
      [DynamismEvents.CLICK],
      kupManager,
      dispatch,
    );
  };

  const onAutoselect = (event: CustomEvent<KupBoxAutoSelectEventPayload>) => {
    const row: KupDataRow = event.detail.row;

    executeRowDynamism(
      boxList.id,
      boxList.schedaId,
      undefined,
      boxList.data.columns,
      row,
      boxList.dynamisms,
      [DynamismEvents.CHANGE],
      kupManager,
      dispatch,
    );
  };

  const onButtonClick = (event: CustomEvent<FCellEventPayload>) => {
    const column: KupDataColumn = event.detail.column;
    const row: KupDataRow = event.detail.row;

    if (column && kupManager.objects.isButton(column.obj)) {
      executeRowDynamism(
        boxList.id,
        boxList.schedaId,
        column,
        boxList.data.columns,
        row,
        boxList.dynamisms,
        [DynamismEvents.CLICK],
        kupManager,
        dispatch,
      );
    }
  };

  const onDidLoad = () => {};

  useEffect(() => {
    async function buildComponent() {
      preElabOk.current = await preElabComponent(
        boxList,
        props.rawComponent,
        Shapes.BOX,
        firstCall,
        dispatch,
        kupManager,
      );
    }
    buildComponent().then(() => {
      if (
        preElabOk.current == true &&
        boxList &&
        boxList.loaded &&
        boxList.data
      ) {
        // event listeners
      }
    });
  });

  if (boxList) {
    if (!boxList.loaded) {
      // donothing
    } else {
      if (boxList.data) {
        return (
          <>
            {getTitleTag(boxList)}
            <KupBox
              class={getClassNames(
                getComponentOptions(Shapes.BOX, boxList.options),
              )}
              {...boxList.config}
              id={boxList.id}
              data={JSON.parse(JSON.stringify(boxList.data))}
              ref={boxListRef}
              onKup-box-click={onClick}
              onKup-box-didload={onDidLoad}
              onKup-cell-click={onButtonClick}
              onKup-box-autoselect={onAutoselect}
            />
          </>
        );
      }
    }
  }
};

export default Box;
