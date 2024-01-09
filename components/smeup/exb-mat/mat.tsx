import { KupDataTable } from "@sme.up/ketchup-react";
import { KupDatatableRowSelectedEventPayload } from "@sme.up/ketchup/dist/types/components/kup-data-table/kup-data-table-declarations";
import { KupDataRow } from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useKupManager from "../../../composable/useKupManager";
import {
  DataTable,
  RawComponent,
  Shapes,
} from "../../../declarations/componentDeclarations";
import { DynamismEvents } from "../../../declarations/dynamismDeclarations";
import { executeRowDynamism } from "../../../managers/dynamismManager";
import {
  getComponentById,
  isBackActionForComponent,
  isNotifyForComponent,
  resetNotifyFlagForComponent,
} from "../../../store/reduces/components";
import { RootState, store } from "../../../store/store";
import {
  getComponentOptions,
  preElabComponent,
} from "../../../utils/componentUtils";
import { getClassNames, getTitleTag } from "../../utils";
import { DataTableOptions } from "../../../managers/converters-manager/converters/components/smeup/exb-mat/dataTable";
import { isYes } from "../../../managers/converters-manager/utils/smeupDataStructuresUtilities";
import { logInfo } from "../../../utils/logger";

/* global HTMLKupDataTableElement */

type Props = {
  rawComponent: RawComponent;
};

const Mat: React.FC<Props> = props => {
  const dataTable = useSelector((state: RootState) =>
    getComponentById(state, props.rawComponent.id),
  ) as DataTable;
  const dispatch = useDispatch();
  const kupManager = useKupManager();
  const dataTableRef: React.RefObject<HTMLKupDataTableElement> = useRef(null);
  const preElabOk = useRef(false);
  const firstCall = useRef(true);

  const isBackActionForComponentRef = useRef(
    isBackActionForComponent(store.getState(), props.rawComponent.id),
  );

  const onRowSelected = (
    event: CustomEvent<KupDatatableRowSelectedEventPayload>,
  ) => {
    let row: KupDataRow = event.detail.clickedRow;
    const columnName: string = event.detail.clickedColumn;

    if (!row) {
      const selectedRows = event.detail.selectedRows;
      if (!selectedRows || selectedRows.length == 0) {
        return;
      }
      row = selectedRows[0];
    }
    let columnArray = null;
    if (columnName) {
      columnArray = dataTable.data.columns
        ? kupManager.data.column.find(dataTable.data.columns, {
            name: columnName,
          })
        : [];
    }
    executeRowDynamism(
      dataTable.id,
      dataTable.schedaId,
      columnArray && columnArray.length > 0 ? columnArray[0] : null,
      dataTable.data.columns,
      row,
      dataTable.dynamisms,
      [DynamismEvents.CLICK, DynamismEvents.CHANGE, DynamismEvents.DBLCLICK],
      kupManager,
      dispatch,
    );
  };

  const onDidLoad = () => {
    const dataTableOptions: DataTableOptions = getComponentOptions(
      Shapes.MAT,
      dataTable.options,
    ) as DataTableOptions;
    let emitEvent = !isBackActionForComponentRef.current;
    if (isNotifyForComponent(store.getState(), dataTable.id)) {
      emitEvent = true;
      dispatch(resetNotifyFlagForComponent({ id: dataTable.id }));
    }
    logInfo("onDidLoad emitEvent[" + emitEvent + "]", "mat.tsx");

    // SelFirst: select first row
    if (isYes(dataTableOptions?.SelFirst)) {
      dataTableRef.current.setSelectedRows(["0"], emitEvent);
    }
    // SelectRow: select row
    if (dataTableOptions?.SelectRow) {
      dataTableRef.current.setSelectedRows(
        [dataTableOptions?.SelectRow],
        emitEvent,
      );
    }
  };

  useEffect(() => {
    isBackActionForComponentRef.current = isBackActionForComponent(
      store.getState(),
      props.rawComponent.id,
    );

    async function buildComponent() {
      preElabOk.current = await preElabComponent(
        dataTable,
        props.rawComponent,
        Shapes.MAT,
        firstCall,
        dispatch,
        kupManager,
      );
    }
    buildComponent().then(() => {
      if (
        preElabOk.current == true &&
        dataTable &&
        dataTable.loaded &&
        dataTable.data
      ) {
        // event listeners
      }
    });
  });

  if (dataTable) {
    if (!dataTable.loaded) {
      // donothing
    } else {
      if (dataTable.data) {
        return (
          <>
            {getTitleTag(dataTable)}
            <KupDataTable
              class={getClassNames(
                getComponentOptions(Shapes.MAT, dataTable.options),
              )}
              {...dataTable.config}
              id={dataTable.id}
              ref={dataTableRef}
              data={JSON.parse(JSON.stringify(dataTable.data))}
              onKup-datatable-rowselected={onRowSelected}
              onKup-datatable-didload={onDidLoad}
            />
          </>
        );
      }
    }
  }
};

export default Mat;
