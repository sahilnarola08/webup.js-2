import { store } from "../store/store";
import { executeFunForScheda } from "../managers/funManager";
import {
  Dynamism,
  DynamismEntity,
  DynamismEvents,
} from "../declarations/dynamismDeclarations";
import {
  getCopyOfComponent,
  isFBKData,
  isScheda,
} from "../utils/componentUtils";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import {
  saveImplicitVariablesFromDynamism,
  saveLooVariablesFromDynamism,
  saveSchVariablesFromDynamism,
  saveSecVariablesFromDynamism,
} from "./variablesManager";
import {
  Component,
  ComponentEntity,
  Fun,
  Scheda,
  SGType,
} from "../declarations/componentDeclarations";
import {
  getComponentById,
  getComponentByScriptId,
  getDevice,
  getMainScheda,
  isDebug,
  setComponent,
  setDialogInfo,
  setMainScheda,
} from "../store/reduces/components";
import handleError from "./errorManager";
import {
  addImplicitVariable,
  createDynamism,
  getDynamismsByType,
} from "../utils/dynamismUtils";
import {
  KupDataColumn,
  KupDataNode,
  KupDataRow,
} from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import { ImplicitVariables } from "../declarations/variablesDeclarations";
import { parseBetweenBrackets } from "../utils/regexUtils";
import { toSmeup } from "../utils/dateUtils";
import {
  KupObj,
  toSmeupObj,
} from "./converters-manager/utils/smeupObjectUtilities";
import { FunException } from "../exceptions/FunException";
import { SmeupDataStructure } from "./converters-manager/declarations/data-structures/smeupDataStructure";
import { KupDataCell } from "./converters-manager/converters/components/smeup/exb-mat/dataTable";
import { createFun } from "../utils/funUtils";
import { evaluateExpression } from "./evaluationManager";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";
import { logWarning } from "../utils/logger";

export const executeTreeNodeDynamism = (
  sourceComponentId: string,
  schedaId: string,
  selectedColumn: KupDataColumn,
  columns: KupDataColumn[],
  treeNode: KupDataNode,
  dynamisms: DynamismEntity[],
  type: DynamismEvents,
  kupManager: KupManager,
  dispatch: Dispatch<AnyAction>,
) => {
  // getting component dynamisms for event click | change
  const rawDynamisms = dynamisms
    ? dynamisms.filter(
        d =>
          d?.event?.toLowerCase() === DynamismEvents.CLICK ||
          d?.event?.toLowerCase() === DynamismEvents.CHANGE,
      )
    : null;
  if (rawDynamisms && rawDynamisms.length > 0) {
    // explicit dynamisms
    rawDynamisms.forEach(rawDynamism => {
      // create dynamism and set source
      const dynamism = createDynamism(rawDynamism);
      dynamism.source = sourceComponentId;
      dynamism.schedaId = schedaId;
      // manage dynamism by event
      // treeNode click
      treeNodeClick(
        selectedColumn,
        columns,
        treeNode,
        dynamism,
        kupManager,
        dispatch,
      );
    });
  } else if (selectedColumn) {
    const cell: KupDataCell = treeNode.cells[selectedColumn.name];
    implicitSmeupObjectClick(
      sourceComponentId,
      schedaId,
      cell.obj,
      type,
      selectedColumn,
      columns,
      treeNode,
      cell.value,
      kupManager,
      dispatch,
    );
  } else {
    implicitSmeupObjectClick(
      sourceComponentId,
      schedaId,
      treeNode.obj,
      type,
      selectedColumn,
      columns,
      treeNode,
      treeNode.value,
      kupManager,
      dispatch,
    );
  }
};

export const executeRowDynamism = (
  sourceComponentId: string,
  schedaId: string,
  selectedColumn: KupDataColumn,
  columns: KupDataColumn[],
  row: KupDataRow,
  dynamisms: DynamismEntity[],
  types: DynamismEvents[],
  kupManager: KupManager,
  dispatch: Dispatch<AnyAction>,
  extraObj?: KupObj,
  extraValue?: string,
): boolean => {
  if (selectedColumn && kupManager.objects.isButton(selectedColumn.obj)) {
    const cell: KupDataCell = row?.cells[selectedColumn.name];
    return implicitSmeupObjectClick(
      sourceComponentId,
      schedaId,
      cell?.obj,
      DynamismEvents.CLICK,
      selectedColumn,
      columns,
      row,
      cell?.value,
      kupManager,
      dispatch,
    );
  }

  // getting component dynamisms for event click
  const rawDynamisms = [];
  for (let i = 0; i < types.length; i++) {
    rawDynamisms.push(...getDynamismsByType(dynamisms, types[i]));
  }
  if (rawDynamisms && rawDynamisms.length > 0) {
    // explicit dynamisms
    rawDynamisms.forEach(rawDynamism => {
      // create dynamism and set source
      const dynamism = createDynamism(rawDynamism);
      dynamism.source = sourceComponentId;
      dynamism.schedaId = schedaId;

      // manage dynamism by event
      // row/cell click
      rowClick(
        selectedColumn,
        columns,
        row,
        dynamism,
        kupManager,
        dispatch,
        extraObj,
        extraValue,
      );
    });
    return true;
  }
  return false;
};

// when the button/smeupObject is clicked but dynamism isn't declared
const implicitSmeupObjectClick = (
  sourceComponentId: string,
  schedaId: string,
  obj: KupObj,
  type: string,
  selectedColumn: KupDataColumn,
  columns: KupDataColumn[],
  dataRow: KupDataRow,
  cellValue: string,
  kupManager: KupManager,
  dispatch: Dispatch<AnyAction>,
): boolean => {
  if (!obj) {
    return false;
  }
  let exec = parseBetweenBrackets("E", obj.k);
  if (!exec) {
    exec = obj.e;
  }
  if (!exec) {
    return false;
  }
  const rawImplicitDynamism: DynamismEntity = {
    event: type,
    exec: exec,
  };
  const dynamism: Dynamism = createDynamism(rawImplicitDynamism);
  dynamism.source = sourceComponentId;
  dynamism.schedaId = schedaId;

  addImplicitVariablesForColumnsOfRow(
    selectedColumn,
    columns,
    dataRow,
    kupManager,
    dynamism,
  );
  addImplicitVariablesForSmeupObject(obj, dynamism);
  if (cellValue) {
    addImplicitVariable(dynamism, {
      key: ImplicitVariables.TX,
      value: cellValue,
    });
  }

  // execute
  executeDynamism(dynamism, dispatch);
  return true;
};

/**
 * useDynamism hook
 * execute component dynamism
 */
export const executeDynamism = async (
  dynamism: Dynamism,
  dispatch: Dispatch<AnyAction>,
): Promise<ComponentEntity | SmeupDataStructure | undefined> => {
  let source = getComponentByScriptId(
    store.getState(),
    dynamism.source,
    dynamism.schedaId,
  );

  // check targets
  if (!dynamism.targets || dynamism.targets.length == 0) {
    if (dynamism.fun) {
      // save variables if dynamism comes from component
      if (source) {
        // setting implicit variables into component
        saveImplicitVariablesFromDynamism(dynamism, source, dispatch);
        // setting dynamism variables into source component
        saveSecVariablesFromDynamism(dynamism, source, dispatch);
        saveSchVariablesFromDynamism(dynamism, dispatch);
        saveLooVariablesFromDynamism(dynamism, dispatch);
        source = getComponentById(store.getState(), source.id);
      }
      if (hasToManageSG(dynamism, source, dispatch)) {
        return;
      }
      try {
        const data: SmeupDataStructure = await executeFunForScheda(
          dynamism.fun,
          getCopyOfComponent(source),
          undefined,
          dispatch,
          getMainScheda(store.getState())?.dSep,
          dynamism,
        );
        if (!isFBKData(data) && isScheda(data)) {
          const scheda: Scheda = data as unknown as Scheda;
          if (scheda) {
            dispatch(
              setMainScheda({
                id: scheda.id,
                component: scheda,
                makeLoadable: true,
              }),
            );
          }
        }
        return data;
      } catch (error) {
        handleError(new FunException(error, dynamism.fun), dispatch);
      }
    }
  } else {
    for (let i = 0; i < dynamism.targets.length; i++) {
      const comp = getComponentByScriptId(
        store.getState(),
        dynamism.targets[i],
        dynamism.schedaId,
      );
      if (!comp) {
        logWarning(
          "executeDynamism() target component not found [" +
            dynamism.targets[i] +
            "]",
          "dynamismManager.ts",
        );
        continue;
      }
      let target = getCopyOfComponent(comp);
      // setting implicit variables into component
      saveImplicitVariablesFromDynamism(dynamism, target, null);
      // setting dynamism variables into sch or component
      saveSecVariablesFromDynamism(dynamism, target, null);
      saveSchVariablesFromDynamism(dynamism, dispatch);
      saveLooVariablesFromDynamism(dynamism, dispatch);
      let addToHistory = false;
      // !!!!!!eliminare data perchè venga ricaricato, se c'è la fun
      if (target.fun) {
        target.data = null;
        target.loaded = false;
        if (isScheda(target)) {
          const scheda: Scheda = target as Scheda;
          scheda.sections = null;
          addToHistory = scheda.id == getMainScheda(store.getState()).id;
        }
      }
      if (addToHistory) {
        dispatch(
          setMainScheda({
            id: target.id,
            component: target as Scheda,
            makeLoadable: true,
          }),
        );
      } else {
        dispatch(
          setComponent({
            id: target.id,
            component: target,
            makeLoadable: true,
          }),
        );
      }
    }
  }
};

const hasToManageSG = (
  dynamism: Dynamism,
  source: Component,
  dispatch: Dispatch<AnyAction>,
): boolean => {
  if (!dynamism.fun) {
    return false;
  }
  if (!dynamism.evaluatedFun) {
    dynamism.evaluatedFun = createFun(
      dynamism.fun,
      getDevice(store.getState()),
      isDebug(store.getState()),
    );
  }
  const fun: Fun = dynamism.evaluatedFun;
  if (!fun.sg) {
    return false;
  }

  if (fun.sg.type == SGType.AskConf) {
    if (fun.sg.message) {
      const message = evaluateExpression(fun.sg.message, source);
      const dynamismLocal = JSON.parse(JSON.stringify(dynamism));
      dynamismLocal.evaluatedFun.sg.type = undefined;
      dynamismLocal.evaluatedFun.sg.message = undefined;
      dispatch(setDialogInfo({ message: message, dynamism: dynamismLocal }));
      return true;
    }
  }
  return false;
};

export const addImplicitVariablesForColumnsOfRow = (
  selectedColumn: KupDataColumn,
  columns: KupDataColumn[],
  row: KupDataRow,
  kupManager: KupManager,
  dynamism: Dynamism,
) => {
  if (columns && row) {
    const dSep = (
      getComponentById(store.getState(), dynamism.schedaId) as Scheda
    ).dSep;
    columns.forEach((column: KupDataColumn) => {
      let value: string;
      if (kupManager.objects.isDate(column.obj)) {
        const cellValue = row.cells[column.name].value;
        const dateValue = new Date(cellValue);
        if (isNaN(dateValue.getTime())) {
          // FIXME:
          value = row.cells[column.name].value;
        } else {
          //value = kupDates.format(cellValue, "YYYYMMDD");
          value = toSmeup(cellValue, toSmeupObj(column.obj));
        }
      } else if (kupManager.objects.isNumber(column.obj)) {
        const cellValue = row.cells[column.name].value;
        value = kupManager.math.numberStringToFormattedString(
          cellValue,
          -1,
          column.obj.p,
          dSep,
        );
      } else if (kupManager.objects.isIcon(column.obj)) {
        value = row.cells[column.name].obj
          ? row.cells[column.name].obj.k
          : row.cells[column.name].value;
      } else {
        value = row.cells[column.name].value ?? "";
      }
      addImplicitVariable(dynamism, {
        key: column.name,
        value: value,
      });
    });
  }
  if (selectedColumn) {
    addImplicitVariable(dynamism, {
      key: ImplicitVariables.COLUMN,
      value: selectedColumn.name,
    });
  }
};

export const addImplicitVariablesForSmeupObject = (
  obj: KupObj,
  dynamism: Dynamism,
) => {
  if (!obj) {
    return;
  }
  // cell object implicit variables
  addImplicitVariable(dynamism, {
    key: ImplicitVariables.T1,
    value: obj.t,
  });
  addImplicitVariable(dynamism, {
    key: ImplicitVariables.P1,
    value: obj.p,
  });
  addImplicitVariable(dynamism, {
    key: ImplicitVariables.K1,
    value: obj.k,
  });
  if (obj.e) {
    addImplicitVariable(dynamism, {
      key: ImplicitVariables.FU,
      value: obj.e,
    });
  }
};

export const addImplicitVariablesForDynamismChange = (
  startDateNewValue: string,
  startDateField: string,
  endDateNewValue: string,
  endDateField: string,
  dynamism: Dynamism,
) => {
  if (!startDateNewValue && !endDateNewValue) {
    return;
  }

  addImplicitVariable(dynamism, {
    key: startDateField,
    value: startDateNewValue,
  });
  addImplicitVariable(dynamism, {
    key: endDateField,
    value: endDateNewValue,
  });
};

// when the cell is clicked and Click dynamism event is declared
const rowClick = (
  selectedColumn: KupDataColumn,
  columns: KupDataColumn[],
  row: KupDataRow,
  dynamism: Dynamism,
  kupManager: KupManager,
  dispatch: Dispatch<AnyAction>,
  extraObj: KupObj,
  extraValue: string,
) => {
  // getting selected cell
  const cellValue: string = selectedColumn
    ? row.cells[selectedColumn.name].value
    : extraValue;
  const cellObj: KupObj = selectedColumn
    ? row.cells[selectedColumn.name].obj
    : extraObj;
  click(
    selectedColumn,
    columns,
    row,
    cellValue,
    cellObj,
    dynamism,
    kupManager,
    dispatch,
  );
};

// when the cell is clicked and Click dynamism event is declared
const treeNodeClick = (
  selectedColumn: KupDataColumn,
  columns: KupDataColumn[],
  treeNode: KupDataNode,
  dynamism: Dynamism,
  kupManager: KupManager,
  dispatch: Dispatch<AnyAction>,
) => {
  // getting selected cell
  const cellValue: string = selectedColumn
    ? treeNode.cells[selectedColumn.name].value
    : treeNode.value;
  const cellObj: KupObj = selectedColumn
    ? treeNode.cells[selectedColumn.name].obj
    : treeNode.obj;
  click(
    selectedColumn,
    columns,
    treeNode,
    cellValue,
    cellObj,
    dynamism,
    kupManager,
    dispatch,
  );
};

const click = (
  selectedColumn: KupDataColumn,
  columns: KupDataColumn[],
  dataRow: KupDataRow,
  cellValue: string,
  cellObj: KupObj,
  dynamism: Dynamism,
  kupManager: KupManager,
  dispatch: Dispatch<AnyAction>,
) => {
  addImplicitVariablesForColumnsOfRow(
    selectedColumn,
    columns,
    dataRow,
    kupManager,
    dynamism,
  );
  addImplicitVariablesForSmeupObject(cellObj, dynamism);
  if (cellValue) {
    addImplicitVariable(dynamism, {
      key: ImplicitVariables.TX,
      value: cellValue,
    });
  }
  // execute
  executeDynamism(dynamism, dispatch);
};

Object.freeze(executeDynamism);
export default executeDynamism;
