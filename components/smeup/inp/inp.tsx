import React, { useEffect, useRef } from "react";
import {
  InputPanel,
  RawComponent,
  Shapes,
} from "../../../declarations/componentDeclarations";
import { KupButtonList, KupForm } from "@sme.up/ketchup-react";
import { RootState, store } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getComponentById,
  isBackActionForComponent,
  isNotifyForComponent,
  resetNotifyFlagForComponent,
  setComponent,
} from "../../../store/reduces/components";
import { KupButtonListClickEventPayload } from "@sme.up/ketchup/dist/types/components/kup-button-list/kup-button-list-declarations";
import { DynamismEvents } from "../../../declarations/dynamismDeclarations";
import { executeRowDynamism } from "../../../managers/dynamismManager";
import { FCellEventPayload } from "@sme.up/ketchup/dist/types/f-components/f-cell/f-cell-declarations";
import {
  autocompleteDataRequest,
  executeValidationForCell,
  validateAll,
  setValidationStatus,
} from "../../../managers/inputPanelManager";
import {
  getComponentOptions,
  getCopyOfComponent,
  preElabComponent,
} from "../../../utils/componentUtils";
import useKupManager from "../../../composable/useKupManager";
import { getClassNames, getTitleTag } from "../../utils";
import { executeFun } from "../../../managers/funManager";
import {
  KupDataColumn,
  KupDataRow,
} from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import { InputPanelOptions } from "../../../managers/converters-manager/converters/components/smeup/inp/inputPanel";
import { KupObj } from "../../../managers/converters-manager/utils/smeupObjectUtilities";
import { KupDataCell } from "../../../managers/converters-manager/converters/components/smeup/exb-mat/dataTable";
import { SmeupTableDataStructure } from "../../../managers/converters-manager/declarations/data-structures/smeupDataStructure";
import { listConverter } from "../../../managers/converters-manager/converters/components/smeup/graphic-forms/lst/listConverter";
import { logInfo } from "../../../utils/logger";

/* global HTMLKupButtonListElement, HTMLKupFormElement */

type Props = {
  rawComponent: RawComponent;
};

const Inp: React.FC<Props> = props => {
  const inputPanel = useSelector((state: RootState) =>
    getComponentById(state, props.rawComponent.id),
  ) as InputPanel;
  const dispatch = useDispatch();
  const kupManager = useKupManager();
  const preElabOk = useRef(false);
  const toolbarsRef: React.RefObject<HTMLKupButtonListElement> = useRef(null);
  const inputPanelRef: React.RefObject<HTMLKupFormElement> = useRef(null);
  const firstCall = useRef(true);

  const isBackActionForComponentRef = useRef(
    isBackActionForComponent(store.getState(), props.rawComponent.id),
  );

  const refreshComponent = (inputPanel: InputPanel) => {
    // save component into store
    dispatch(
      setComponent({
        id: inputPanel.id,
        component: inputPanel,
      }),
    );
  };

  const getCopyOfInputPanelComponent = () => {
    return getCopyOfInputPanelComponentById(inputPanelRef.current.id);
  };

  const getCopyOfInputPanelComponentById = (id: string) => {
    const component: InputPanel = getComponentById(
      store.getState(),
      id,
    ) as InputPanel;
    let options: InputPanelOptions = getComponentOptions(
      Shapes.INP,
      component.options,
    ) as InputPanelOptions;
    const componentCopy = getCopyOfComponent(component) as InputPanel;
    if (options.validations) {
      // options.validations.forEach(function (value:string, key: string) =>  {

      // });
      // for (let i=0; i<options.validations.keys().)
      // componentCopy.options.INP.default.validations = {
      //   ...JSON.parse(
      //     JSON.stringify(component.options.INP.default.validations),
      //   ),
      // };
      (
        getComponentOptions(
          Shapes.INP,
          componentCopy.options,
        ) as InputPanelOptions
      ).validations = Object.assign(options.validations);
    }
    return componentCopy;
  };

  const executeSubmit = (ev: Event, smeupObject: KupObj, tx: string) => {
    const inputPanelCopy = getCopyOfInputPanelComponent();
    let options: InputPanelOptions = getComponentOptions(
      Shapes.INP,
      inputPanelCopy.options,
    ) as InputPanelOptions;
    let validated = validateAll(
      inputPanelCopy,
      options,
      kupManager.data,
      dispatch,
    );
    refreshComponent(inputPanelCopy);
    if (!validated) {
      ev.stopPropagation();
      return;
    }

    const component = inputPanelCopy;
    const selectedRow = component.data?.rows[0];

    executeRowDynamism(
      component.id,
      component.schedaId,
      null,
      component.data.columns,
      selectedRow,
      component.dynamisms,
      [DynamismEvents.CLICK],
      kupManager,
      dispatch,
      smeupObject,
      tx,
    );
  };

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    executeSubmit(e, undefined, undefined);
  };

  const onReady = () => {
    const columnToFocus: string = getColumnToFocus(inputPanel);
    if (columnToFocus) {
      inputPanelRef.current.setFocus(columnToFocus, "0");
    }

    let emitEvent = !isBackActionForComponentRef.current;
    if (isNotifyForComponent(store.getState(), inputPanel.id)) {
      emitEvent = true;
      dispatch(resetNotifyFlagForComponent({ id: inputPanel.id }));
    }
    logInfo("onReady emitEvent[" + emitEvent + "]", "inp.tsx");
    if (emitEvent) {
      const selectedRow = inputPanel.data?.rows[0];
      logInfo("execute automatic dynamism", "inp.tsx");
      executeRowDynamism(
        inputPanel.id,
        inputPanel.schedaId,
        null,
        inputPanel.data.columns,
        selectedRow,
        inputPanel.dynamisms,
        [DynamismEvents.CHANGE_ROW, DynamismEvents.CHANGE],
        kupManager,
        dispatch,
      );
    }
  };

  const getColumnToFocus = (inputPanel: InputPanel) => {
    if (
      !inputPanel.data ||
      !inputPanel.data.rows ||
      inputPanel.data.rows.length == 0 ||
      !inputPanel.data.rows[0].cells
    ) {
      return null;
    }
    for (const cellName in inputPanel.data.rows[0].cells) {
      const kupCell: KupDataCell = inputPanel.data.rows[0].cells[cellName];
      if (kupCell.hasFocus) {
        return cellName;
      }
    }
    return null;
  };

  const onCellClick = (event: CustomEvent<FCellEventPayload>) => {
    const column: KupDataColumn = event.detail.column;
    const row: KupDataRow = event.detail.row;
    executeRowDynamism(
      inputPanel.id,
      inputPanel.schedaId,
      column,
      inputPanel.data.columns,
      row,
      inputPanel.dynamisms,
      [DynamismEvents.CLICK],
      kupManager,
      dispatch,
    );
  };

  const onCellUpdate = (event: CustomEvent<FCellEventPayload>) => {
    const inputPanelCopy = getCopyOfInputPanelComponent();
    let options: InputPanelOptions = getComponentOptions(
      Shapes.INP,
      inputPanelCopy.options,
    ) as InputPanelOptions;

    inputPanelCopy.data = JSON.parse(JSON.stringify(event.detail.comp.data));

    let result = executeValidationForCell(
      event.detail.column,
      event.detail.cell,
      options,
      dispatch,
    );
    setValidationStatus(
      result,
      event.detail.column,
      inputPanelCopy,
      kupManager.data,
    );

    refreshComponent(inputPanelCopy);
  };

  const onCellInput = (event: CustomEvent<FCellEventPayload>) => {
    const componentId: string = inputPanelRef.current.id;
    if (event.detail.event.type == "kup-autocomplete-iconclick") {
      let filter = event.detail.event.detail.value;
      autocompleteDataRequest(componentId, event, filter);
    }
    if (event.detail.event.type == "kup-autocomplete-input") {
      let filter = event.detail.event.detail.inputValue;
      autocompleteDataRequest(componentId, event, filter);
    }
  };

  const onCellIconClick = (event: CustomEvent<FCellEventPayload>) => {
    if (event.detail.event.type == "kup-combobox-iconclick") {
      comboDataRequest(event.detail.column.name, event);
      return;
    }

    const cell = event.detail.cell;
    const column = event.detail.column;
    const comp = event.detail.comp;
    const hasInputMode = !!event.detail.cell.data?.inputMode;
    if (hasInputMode) {
      if (cell.data.inputMode === "none") {
        cell.data.icon = "keyboard_hide";
        cell.data.inputMode = "text";
        comp.refresh().then(() => {
          cell.element.querySelector("input").blur();
        });
      } else {
        cell.data.icon = "keyboard";
        cell.data.inputMode = "none";
        comp.refresh().then(() => {
          comp.setFocus(column.name, "0");
        });
      }
    }
  };

  const comboDataRequest = async (
    columnName: string,
    event: CustomEvent<FCellEventPayload>,
  ): Promise<any> => {
    const inputPanelCopy = getCopyOfInputPanelComponent();
    inputPanelCopy.data = JSON.parse(JSON.stringify(event.detail.comp.data));

    const cell: KupDataCell = inputPanelCopy.data.rows[0].cells[columnName];

    if (!cell.data) {
      cell.data = {};
    }
    if (!cell.data.data) {
      cell.data.data = {};
    }

    if (
      !cell.data.data["kup-list"] ||
      !cell.data.data["kup-list"].data ||
      cell.data.data["kup-list"].data.length == 0
    ) {
      if (cell.tfk == "FUN" && cell.pfk) {
        const smeupTable: SmeupTableDataStructure = await executeFun(cell.pfk);
        const list = listConverter(undefined, smeupTable, kupManager);
        cell.data.data["kup-list"] = list;
      }
    }

    refreshComponent(inputPanelCopy);
  };

  const onClick = (event: CustomEvent<KupButtonListClickEventPayload>) => {
    executeSubmit(
      event,
      event.detail.obj,
      event.detail.comp.data[event.detail.comp.selected].value,
    );
  };

  useEffect(() => {
    isBackActionForComponentRef.current = isBackActionForComponent(
      store.getState(),
      props.rawComponent.id,
    );
    async function buildComponent() {
      preElabOk.current = await preElabComponent(
        inputPanel,
        props.rawComponent,
        Shapes.INP,
        firstCall,
        dispatch,
        kupManager,
      );
    }
    buildComponent().then(() => {
      if (
        preElabOk.current == true &&
        inputPanel &&
        inputPanel.loaded &&
        inputPanel.data
      ) {
        // event listeners
      }
    });
  });

  if (inputPanel) {
    if (!inputPanel.loaded) {
      // donothing
    } else {
      if (inputPanel.data) {
        return (
          <>
            {getTitleTag(inputPanel)}
            <KupForm
              class={getClassNames(
                getComponentOptions(Shapes.INP, inputPanel.options),
              )}
              {...inputPanel.config}
              id={inputPanel.id}
              ref={inputPanelRef}
              data={JSON.parse(JSON.stringify(inputPanel.data))}
              hiddenSubmitButton={true}
              submitCb={onSubmit}
              onKup-cell-input={onCellInput}
              onKup-cell-iconclick={onCellIconClick}
              onKup-cell-update={onCellUpdate}
              onKup-form-ready={onReady}
              onKup-cell-click={onCellClick}
            />
            <KupButtonList
              ref={toolbarsRef}
              data={
                (
                  getComponentOptions(
                    Shapes.INP,
                    inputPanel.options,
                  ) as InputPanelOptions
                ).toolbars.data
              }
              show-selection="false"
              onKup-buttonlist-click={onClick}
            />
          </>
        );
      }
    }
  }
};

export default Inp;
