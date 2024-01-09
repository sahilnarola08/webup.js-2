import { ImplicitVariables } from "../declarations/variablesDeclarations";
import handleError from "./errorManager";
import { Components, GenericObject } from "@sme.up/ketchup";
import { FCellEventPayload } from "@sme.up/ketchup/dist/types/f-components/f-cell/f-cell-declarations";
import { InputPanelOptions } from "./converters-manager/converters/components/smeup/inp/inputPanel";
import { KupDataColumn } from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import { KupData } from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { VariablesMap } from "../store/reduces/components";
import { addVariable } from "./variablesManager";
import { ApplicationException } from "../exceptions/ApplicationException";
import { KupDataCell } from "./converters-manager/converters/components/smeup/exb-mat/dataTable";

const AUTOCOMPLETE_FUN: string =
  "F(EXB;LOA10_SE;ELK.COM) 1([T1];[P1];) P(K([K1]) RPa(500))";
const LAYOUT_FUN: string =
  "F(EXD;LOSER_09;LAY) 2(;;{0}) P({1} FORMAT(JSON)) SS(ID('{'{2}'}'))";

export const layoutFun = (layoutName: string): string => {
  let fun = LAYOUT_FUN;
  fun = fun.replace(`{0}`, layoutName);
  fun = fun.replace(`{1}`, "");
  fun = fun.replace(`{2}`, "");
  return fun;
};

const executeSupportFunForAutocomplete = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fun: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentId: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sourceComponent: Components.KupAutocomplete,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  columnName: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  implicitVariables?: VariablesMap,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  variables?: VariablesMap,
) => {};
// const executeSupportFunForAutocomplete =  (
//   fun: string,
//   componentId: string,
//   sourceComponent: Components.KupAutocomplete,
//   columnName: string,
//   implicitVariables?: VariablesMap,
//   variables?: Variable[],
// ) {
// store.dispatch(GeneralActionTypes.showWaiting);
// if (componentId) {
//   // getting component
//   const component: Component = store.getters.getComponent(componentId);
//   // save variables
//   if (component) {
//     // setting implicit variables into component
//     saveImplicitVariables(implicitVariables, component);
//     // setting variables into sch or component
//     saveVariables(variables, implicitVariables, component);
//   }
//   const funObj: Fun = createFun(evaluateFun(fun, component));
//   // exec fun
//   exec(funObj, componentId, sourceComponent, columnName);
// }
// store.dispatch(GeneralActionTypes.hideWaiting);
// };

// const exec = (
//   fun: Fun,
//   componentId: string,
//   sourceComponent: Components.KupAutocomplete,
//   columnName: string,
//   dispatch: Dispatch<AnyAction>,
// ): void => {
// executeFun(fun, dispatch)
//   .then(res => {
//     const smeupTable = res as SmeupTableDataStructure;
//     const { data } = listConverter(undefined, smeupTable);
//     const payload: {
//       componentId: string;
//       sourceComponent: Components.KupAutocomplete;
//       columnName: string;
//       listNode: KupListNode[];
//     } = {
//       componentId: componentId,
//       sourceComponent: sourceComponent,
//       columnName: columnName,
//       listNode: data,
//     };
//     // store.dispatch(ComponentsActionTypes.autocompleteRefresh, payload);
//     if (fun.notify) {
//       executeNotify(fun);
//     }
//   })
//   .catch((error: ApplicationException) => {
//     handleError(error, dispatch);
//   })
//   .finally(() => {
//     // store.dispatch(GeneralActionTypes.hideWaiting);
//   });
// };

export const autocompleteDataRequest = (
  componentId: string,
  event: CustomEvent<FCellEventPayload>,
  filter: string,
): void => {
  const fun: string = AUTOCOMPLETE_FUN;
  const sourceComponent: Components.KupAutocomplete =
    event.detail.event.detail.comp;
  const columnName = event.detail.column.name;
  const implicitVariables: VariablesMap = {};
  addVariable(implicitVariables, {
    name: ImplicitVariables.T1,
    value: event.detail.column.obj.t,
  });
  addVariable(implicitVariables, {
    name: ImplicitVariables.P1,
    value: event.detail.column.obj.p,
  });
  addVariable(implicitVariables, {
    name: ImplicitVariables.K1,
    value: filter,
  });

  executeSupportFunForAutocomplete(
    fun,
    componentId,
    sourceComponent,
    columnName,
    implicitVariables,
  );
};

export const executeValidationForCell = (
  column: KupDataColumn,
  cell: KupDataCell,
  options: InputPanelOptions,
  dispatch: Dispatch<AnyAction>,
): { valid: boolean; msg: string } => {
  const cellName = column.name;
  const jsValidation = options.validations.get(cellName);
  let result: { valid: boolean; msg: string } = { valid: true, msg: "" };
  if (jsValidation && jsValidation.trim() != "") {
    const field = {
      value: cell.value,
      text: column.title,
    };
    result = executeValidation(field, jsValidation, dispatch);
  }
  return result;
};

export const validateAll = (
  completeProps: GenericObject,
  options: InputPanelOptions,
  kupData: KupData,
  dispatch: Dispatch<AnyAction>,
): boolean => {
  const cProps = completeProps;
  let validated: boolean = true;
  for (let i = 0; i < cProps.data.columns.length; i++) {
    const column = cProps.data.columns[i];
    const cell = cProps.data.rows[0].cells[column.name];
    const result = executeValidationForCell(column, cell, options, dispatch);
    setValidationStatus(result, column, cProps, kupData);
    if (!result.valid) {
      validated = false;
    }
  }
  return validated;
};

const executeValidation = (
  field: { value: string; text: string },
  jsValidation: string,
  dispatch: Dispatch<AnyAction>,
): { valid: boolean; msg: string } => {
  let jsValidationScript = jsValidation;
  if (!jsValidationScript.startsWith("function validate(")) {
    jsValidationScript =
      "function validate(field, variables) { " + jsValidationScript + " }";
  }
  jsValidationScript = "return " + jsValidationScript;

  try {
    const func = new Function("field", "variables", jsValidationScript)();
    return func(field, null);
  } catch (error) {
    handleError(new ApplicationException(error), dispatch);
  }
};

export const setValidationStatus = (
  result: { valid: boolean; msg: string },
  column: KupDataColumn,
  cProps: GenericObject,
  kupData: KupData,
): void => {
  const columnName = column.name;
  const cell = cProps.data.rows[0].cells[columnName];
  if (!cell.data) {
    cell.data = {};
  }
  if (isCellFieldExtendsTextField(kupData, cell, column)) {
    if (!cell.data.data) {
      cell.data.data = {};
    }
    if (!cell.data.data["kup-text-field"]) {
      cell.data.data["kup-text-field"] = {};
    }
    cell.data.data["kup-text-field"].helper = result.msg;
    if (!result.valid) {
      cell.data.data["kup-text-field"].wrapperClass = "kup-danger";
    } else {
      cell.data.data["kup-text-field"].wrapperClass = "";
    }
  } else {
    cell.data.helper = result.msg;
    if (!result.valid) {
      cell.data.wrapperClass = "kup-danger";
    } else {
      cell.data.wrapperClass = "";
    }
  }
};

const isCellFieldExtendsTextField = (
  kupData: KupData,
  cell: KupDataCell,
  column: KupDataColumn,
): boolean => {
  const cellType: string = kupData.cell.getType(
    cell,
    cell.shape || column.shape || null,
  );

  switch (cellType) {
    case "autocomplete":
    case "combobox":
    case "date":
    case "datetime":
    case "number":
    case "time":
      return true;
    default:
      return false;
  }
  // if (isColumnAutocomplete(column)) {
  //   return true;
  // }
  // if (isColumnCombobox(column)) {
  //   return true;
  // }
  // if (kupObjects.isDate(obj)) {
  //   return true;
  // }
  // if (kupObjects.isTime(obj)) {
  //   return true;
  // }
  // if (kupObjects.isNumber(obj)) {
  //   return true;
  // }
};
// export function validateRequiredField(field) {
//   const value = field.value;
//   if (value === undefined || value === null || value.trim() === "") {
//     alert("Field with label " + field.text + " is required");
//     return false;
//   } else {
//     return true;
//   }
// }

// const snackBar = function (message) {
//   logMessage(message);
// };

// const alert = function (message) {
//   logMessage(message);
// };
