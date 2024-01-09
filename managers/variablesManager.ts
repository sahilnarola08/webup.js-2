import { store } from "../store/store";
import {
  Component,
  ComponentEntity,
  Scheda,
} from "../declarations/componentDeclarations";
import { Dynamism } from "../declarations/dynamismDeclarations";
import { evaluateVariableFromVariables } from "./evaluationManager";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import {
  getGlobalVariables,
  getMainScheda,
  putLoocupVariableToStore,
  putVariableToStore,
  setGlobalVariablesToStore,
  VariablesMap,
} from "../store/reduces/components";
import { SmeupDataStructure } from "./converters-manager/declarations/data-structures/smeupDataStructure";
import { isScheda, isTypeSmeupTable } from "../utils/componentUtils";
import {
  Variable,
  VariableTypes,
  VariablesFromService,
} from "./converters-manager/declarations/data-structures/smeupSch";
import { parseBetweenBrackets } from "./converters-manager/utils/regexUtilities";
import { InitVariable } from "../declarations/authDeclarations";
import { logWarning } from "../utils/logger";

/**
 * Global variables
 *   - Env variables
 *   - Client variables
 *   - Other
 *
 * Sch variables
 *   - sch script variables (scheda.variables | ::S.VAR.VAL)
 * arrivano nello script di scheda come array
 * [
 *   {
 *     "name": "*CONAP",
 *     "type": "ssc",
 *     "value": "X1"
 *   }
 * ]
 * e vengono convertite in HashMap:
 * {
 *   "*conap": {
 *     "name": "*CONAP",
 *     "type": "ssc",
 *     "value": "X1"
 *   }
 * }
 *   - dynamism SCH variables (dynamism.variables.type = "sch" | ::G.DIN ... Sch.Var="KEY(VAL)")
 * arrivano nello script di scheda come array
 * [
 *   {
 *     "name": "CntCst",
 *     "type": "sch",
 *     "value": "[CST]"
 *   }
 * ]
 *
 * Component variables
 *   - dynamism implicit variables ([K1], [P1] ...)
 *   - dynamism SEC variables (dynamism.variables.type = "SEC" | ::G.DIN ... Sec.Var="KEY(VAL"))
 */

/**
 * Save implicit variables into component
 * @param dynamism Dynamism
 * @param component Component
 */
export const saveImplicitVariablesFromDynamism = (
  dynamism: Dynamism,
  component: Component,
  dispatch: Dispatch,
) => {
  if (dynamism) {
    saveImplicitVariables(dynamism.implicitVariables, component, dispatch);
  }
};

/**
 * Save implicit variables into component
 * @param implicitVariables VariableMap
 * @param component Component
 */
const saveImplicitVariables = (
  implicitVariables: VariablesMap,
  component: Component,
  dispatch: Dispatch,
) => {
  //save implicit variables into component variables
  if (implicitVariables) {
    for (const implicitVariable in implicitVariables) {
      pushVariable(implicitVariables[implicitVariable], component, dispatch);
    }
  }
};

/**
 * Save dynamism variables into component
 * @param dynamism Dynamism
 * @param component Component
 * @param dispatch Dispatch, for save variables in store
 */
export const saveSecVariablesFromDynamism = (
  dynamism: Dynamism,
  component: Component,
  dispatch: Dispatch,
) => {
  if (dynamism) {
    saveSecVariables(
      dynamism.variables,
      component,
      dispatch,
      dynamism.implicitVariables,
    );
  }
};
/**
 * Save variables into component
 * @param variables Variables
 * @param component Component
 * @param dispatch Dispatch, for save variables in store
 * @param implicitVariables Implicit Variables
 */
export const saveSecVariables = (
  variables: VariablesMap,
  component: Component,
  dispatch: Dispatch,
  implicitVariables?: VariablesMap,
) => {
  saveVariables(variables, implicitVariables, component, dispatch, [
    VariableTypes.SEC,
  ]);
};

const getVariablesFromResponse = (
  data: ComponentEntity | SmeupDataStructure,
  type: VariableTypes,
): VariablesMap => {
  if (!data) {
    return;
  }
  if (isTypeSmeupTable((data as SmeupDataStructure).type)) {
    if (data.variables) {
      let variables: VariablesMap = {};
      const variablesFromService = data.variables as VariablesFromService;
      let expressions = [];
      switch (type) {
        case VariableTypes.LOO: {
          expressions = variablesFromService.looExpressions;
          break;
        }
        case VariableTypes.SCH: {
          expressions = variablesFromService.schExpressions;
          break;
        }
        case VariableTypes.SSC: {
          expressions = variablesFromService.sscExpressions;
          break;
        }
        case VariableTypes.SEC: {
          expressions = variablesFromService.comExpressions;
        }
      }
      variables = {
        ...variables,
        ...getParsedVariables(expressions, type),
      };
      return variables;
    }
  }
  if (isScheda(data as ComponentEntity)) {
    if (data.variables) {
      return convertArrayToMap(data.variables as Variable[], type);
    }
  }
};

export const convertArrayToMap = (
  variablesArray: Variable[],
  type?: VariableTypes,
): VariablesMap => {
  let variables: VariablesMap = {};
  for (let i = 0; i < variablesArray.length; i++) {
    const variable = variablesArray[i];
    if (!type || variable.type == type) {
      addVariable(variables, variable);
    }
  }
  return variables;
};
/**
 * Retrieve LOO variables from service
 * @param data data from service
 */
export const getLOOVariablesFromResponse = (
  data: ComponentEntity | SmeupDataStructure,
): VariablesMap => {
  return getVariablesFromResponse(data, VariableTypes.LOO);
};

/**
 * Retrieve SCH variables from service
 * @param data data from service
 */
export const getSCHVariablesFromResponse = (
  data: ComponentEntity | SmeupDataStructure,
): VariablesMap => {
  return getVariablesFromResponse(data, VariableTypes.SCH);
};

// /**
//  * Retrieve SSC variables from service
//  * @param data data from service
//  */
// export const getSSCVariablesFromResponse = (
//   data: ComponentEntity | SmeupDataStructure,
// ): VariablesMap => {
//   return getVariablesFromResponse(data, VariableTypes.SSC);
// };

/**
 * Retrieve SEC variables from service
 * @param data data from service
 */
export const getSECVariablesFromResponse = (
  data: ComponentEntity | SmeupDataStructure,
): VariablesMap => {
  return getVariablesFromResponse(data, VariableTypes.SEC);
};

const getParsedVariables = (
  expressions: string[],
  type: VariableTypes,
): VariablesMap => {
  const variables: VariablesMap = {};
  if (expressions) {
    for (let i = 0; i < expressions.length; i++) {
      const _var = expressions[i];
      const openBracketIndex = _var.indexOf("(");
      if (openBracketIndex < 0) {
        continue;
      }
      const varName = _var.substring(0, openBracketIndex).trim();
      const varValue = parseBetweenBrackets(varName, _var);
      addVariable(variables, {
        name: varName,
        value: varValue,
        type: type,
      });
    }
  }
  return variables;
};

/**
 * Save dynamism variables into global
 * @param dynamism Dynamism
 * @param dispatch Dispatch, for save variables in store
 */
export const saveLooVariablesFromDynamism = (
  dynamism: Dynamism,
  dispatch: Dispatch,
) => {
  if (dynamism) {
    saveLooVariables(dynamism.variables, dispatch, dynamism.implicitVariables);
  }
};

/**
 * Save dynamism variables into global
 * @param variables Variables
 * @param dispatch Dispatch, for save variables in store
 * @param implicitVariables Implicit Variables
 */
export const saveLooVariables = (
  variables: VariablesMap,
  dispatch: Dispatch,
  implicitVariables?: VariablesMap,
) => {
  saveVariables(variables, implicitVariables, null, dispatch, [
    VariableTypes.LOO,
  ]);
};

/**
 * Save dynamism variables into main scheda
 * @param dynamism Dynamism
 * @param dispatch Dispatch, for save variables in store
 */
export const saveSchVariablesFromDynamism = (
  dynamism: Dynamism,
  dispatch: Dispatch,
) => {
  if (dynamism) {
    saveSchVariables(dynamism.variables, dispatch, dynamism.implicitVariables);
  }
};

/**
 * Save variables into main scheda
 * @param variables Variables
 * @param dispatch Dispatch, for save variables in store
 * @param implicitVariables Implicit Variables
 */
export const saveSchVariables = (
  variables: VariablesMap,
  dispatch: Dispatch,
  implicitVariables?: VariablesMap,
) => {
  saveVariables(
    variables,
    implicitVariables,
    getMainScheda(store.getState()),
    dispatch,
    [VariableTypes.SCH],
  );
};

/**
 * Save variables into global, main scheda or component
 * @param variables Variables to save
 * @param implicitVariables Implicit variables for expand values
 * @param component Component
 * @param dispatch Dispatch, for save variables in store
 * @param types Variables types to manage
 */
export const saveVariables = (
  variables: VariablesMap,
  implicitVariables: VariablesMap,
  component: Component,
  dispatch: Dispatch,
  types: VariableTypes[],
) => {
  const globalVariables = getGlobalVariables(store.getState());
  const sch: Scheda = getMainScheda(store.getState());
  //save dynamism variable into sch or component
  if (variables) {
    for (let varName in variables) {
      const variable = variables[varName];
      if (types.findIndex(x => x == variable.type) == -1) {
        continue;
      }
      //evaluate variable
      let evaluatedVariable: Variable = evaluateVariableFromVariables(
        variable,
        implicitVariables,
      );
      if (component && component.variables) {
        evaluatedVariable = evaluateVariableFromVariables(
          evaluatedVariable,
          component.variables,
        );
      }
      evaluatedVariable = evaluateVariableFromVariables(
        evaluatedVariable,
        globalVariables,
      );

      //save into sch
      if (evaluatedVariable.type == VariableTypes.SCH) {
        pushVariable(evaluatedVariable, sch, dispatch);
      }
      //save into component
      if (evaluatedVariable.type == VariableTypes.SEC) {
        pushVariable(evaluatedVariable, component, dispatch);
      }
      if (evaluatedVariable.type == VariableTypes.LOO) {
        pushLoocupVariable(evaluatedVariable, dispatch);
      }
    }
  }
};

/**
 * Check if the variable already exists and push it into component
 * @param variable Variable
 * @param component Component
 */
const pushVariable = (
  variable: Variable,
  component: Component,
  dispatch: Dispatch,
) => {
  if (dispatch) {
    dispatch(
      putVariableToStore({
        id: component.id,
        variable: variable,
      }),
    );
  } else {
    if (!component.variables) {
      component.variables = {};
    }
    addVariable(component.variables, variable);
  }
};

/**
 * Check if the variable already exists and push it into component
 * @param variable Variable
 * @param component Component
 */
const pushLoocupVariable = (variable: Variable, dispatch: Dispatch) => {
  if (dispatch) {
    dispatch(
      putLoocupVariableToStore({
        variable: variable,
      }),
    );
  } else {
    logWarning("pushLoocupVariable() no dispatch!!!", "variablesManager.ts");
  }
};

/**
 * Get variable from component or sch
 * @param component Component
 * @param variableName the name of variable
 */
export const getVariable = (
  component: Component,
  variableName: string,
): Variable => {
  if (component && component.variables) {
    return component.variables[variableName.toLowerCase()];
  } else {
    return null;
  }
};

/**
 * Get global variable
 * @param variableName the name of variable
 */
export const getGlobalVariable = (
  variableName: string,
  values?: VariablesMap,
): Variable => {
  const _values: VariablesMap = values
    ? values
    : getGlobalVariables(store.getState());
  return _values[variableName.toLowerCase()];
};

/**TODO: implement correctly this function with
 * - env variables
 * - client variables
 * - configuration variables
 * - other
 */
export const setGlobalVariables = (
  variables: InitVariable[],
  dispatch: Dispatch<AnyAction>,
) => {
  dispatch(setGlobalVariablesToStore({ variables: variables }));
  /*
  dispatch(
    pushGlobalVariableToStore({
      variable: { name: "*webup", value: generalConstants.AUTH_DEVICE },
    }),
  );
  dispatch(
    pushGlobalVariableToStore({
      variable: {
        name: "*user",
        value: store.getState().components.login.authUser.user,
      },
    }),
  );*/
};

export const addVariable = (
  variables: VariablesMap,
  variable: Variable,
  checkIfAlredyExixts?: boolean,
) => {
  if (variables && variable) {
    const variableName = variable?.name?.toLowerCase();
    if (checkIfAlredyExixts && variables[variableName]) {
      return;
    }
    variables[variableName] = variable;
  }
};
