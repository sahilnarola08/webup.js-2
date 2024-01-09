import {
  Dynamism,
  DynamismEntity,
  DynamismEvents,
  ImplicitVariable,
} from "../declarations/dynamismDeclarations";
import { addVariable, convertArrayToMap } from "../managers/variablesManager";
import { VariablesMap } from "../store/reduces/components";

export const createDynamism = (rawDynamism: DynamismEntity): Dynamism => {
  return {
    event: rawDynamism.event,
    targets: rawDynamism.targets,
    implicitVariables: {},
    variables: convertDynamismVariables(rawDynamism),
    fun: rawDynamism.exec,
  };
};

const convertDynamismVariables = (
  rawDynamism: DynamismEntity,
): VariablesMap => {
  if (rawDynamism && rawDynamism.variables) {
    return convertArrayToMap(rawDynamism.variables);
  }
  return {};
};

export const getDynamismsByType = (
  dynamisms: DynamismEntity[] = [],
  type: DynamismEvents,
): DynamismEntity[] =>
  dynamisms.filter(d => d?.event?.toLowerCase() === type.toLowerCase());

/**
 * Setting dynamism implicit variables into a map key val
 * @param dynamism
 * @param variable
 */
export const addImplicitVariable = (
  dynamism: Dynamism,
  variable: ImplicitVariable,
) => {
  addVariable(dynamism.implicitVariables, {
    name: variable.key,
    value: variable.value,
  });
};
