import { Variable } from "./converters-manager/declarations/data-structures/smeupSch";
import { Component } from "../declarations/componentDeclarations";
import {
  getComponentById,
  getMainScheda,
  VariablesMap,
} from "../store/reduces/components";
import { store } from "../store/store";
import { parseBetweenSquareBrackets } from "../utils/regexUtils";
import { getGlobalVariable, getVariable } from "./variablesManager";
import { logInfo, logWarning } from "../utils/logger";

/**
 * Evaluate string fun
 * @param fun
 * @returns string fun evaluated
 */
export const evaluateFun = (fun: string, component: Component): string => {
  const expression = fun;
  return evaluateExpression(expression, component);
};

/**
 * Evaluate variables into string expression by reference
 * @param expression
 * @param component
 */
export const evaluateExpression = (
  expression: string,
  component: Component,
): string => {
  if (!expression) {
    return expression;
  }
  logInfo("expression in: [" + expression + "]", "evaluationManager.ts");
  // Getting main sch
  const sch = getMainScheda(store.getState());
  // Get all variables
  let toEvaluate = parseBetweenSquareBrackets(expression);
  while (toEvaluate.length > 0) {
    toEvaluate.forEach(rawVariable => {
      //try to get variable from component
      let variable = getVariable(component, rawVariable);
      if (variable) {
        expression = expression.replace(`[${rawVariable}]`, variable.value);
      } else {
        if (component) {
          // try to get from parent scheda, parent of parent scheda, ecc.
          let parentSchId = component.schedaId;
          while (parentSchId && parentSchId != sch.id) {
            const parentSch = getComponentById(store.getState(), parentSchId);
            variable = getVariable(parentSch, rawVariable);
            if (variable) {
              break;
            }
            parentSchId = parentSch.schedaId;
          }
        }
        if (variable) {
          expression = expression.replace(`[${rawVariable}]`, variable.value);
        } else {
          //try to get variable from main sch
          variable = getVariable(sch, rawVariable);
          if (variable) {
            expression = expression.replace(`[${rawVariable}]`, variable.value);
          } else {
            //try to get variable from global variables
            variable = getGlobalVariable(rawVariable);
            if (variable) {
              expression = expression.replace(
                `[${rawVariable}]`,
                variable.value,
              );
            } else {
              logWarning(
                "evaluateExpression not found [" + rawVariable + "]",
                "evaluationManager.ts",
              );
              //return blank value
              expression = expression.replace(`[${rawVariable}]`, "");
            }
          }
        }
      }
    });
    toEvaluate = parseBetweenSquareBrackets(expression);
  }
  logInfo("expression out: [" + expression + "]", "evaluationManager.ts");
  return expression;
};

/**
 * evaluate variable from implicit variables
 * @param variable
 * @param variables
 * @return
 */
export const evaluateVariableFromVariables = (
  variableToEvaluate: Variable,
  variables: VariablesMap,
): Variable => {
  if (!variables) {
    return variableToEvaluate;
  }
  let expression = variableToEvaluate.value;
  logInfo(
    "variable from variables expression in: [" + expression + "]",
    "evaluationManager.ts",
  );
  // Get all variables
  let toEvaluate = parseBetweenSquareBrackets(expression);
  toEvaluate.forEach(rawVariable => {
    // Check if variable is into implicit variables
    if (rawVariable.toLowerCase() in variables) {
      // Evaluate variables
      expression = expression.replace(
        `[${rawVariable}]`,
        variables[rawVariable.toLowerCase()].value,
      );
    }
  });
  logInfo(
    "variable from variables expression out: [" + expression + "]",
    "evaluationManager.ts",
  );
  const variable: Variable = { ...variableToEvaluate, value: expression };
  return variable;
};

/**
 * Evaluate component
 * @param component
 */
export const evaluateComponent = (component: Component) => {
  // component title
  if (component.title) {
    component.title = evaluateExpression(component.title, component);
  }
  if (component.subNote) {
    component.subNote = evaluateExpression(component.subNote, component);
  }
  // if (!isSCH(component)) {
  //   // component data
  //   if (component.data && component.data.length > 0) {
  //     component.data.forEach((node: TreeNodeExt) => {
  //       if (node?.value) node.value = evaluateExpression(node.value, component);
  //     });
  //   }
  // }
};
