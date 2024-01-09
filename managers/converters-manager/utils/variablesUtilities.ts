import { logWarning } from "../../../utils/logger";
import { getRegExpFromString } from "./regexUtilities";

export interface VariableAssignment {
  variableName: string;
  variableValue: string;
}

export const assignmentExecutorCompile = (
  expr: string,
): VariableAssignment[] => {
  const assignmentList: VariableAssignment[] = [];
  if (!expr) {
    logWarning(
      "assignmentExecutorCompile() - expr not defined",
      "variablesUtilities.ts",
    );
    return assignmentList;
  }
  const openRoundBrackets = (expr.match(getRegExpFromString("(", "g")) || [])
    .length;
  const closeRoundBrackets = (expr.match(getRegExpFromString(")", "g")) || [])
    .length;
  if (
    openRoundBrackets > 0 &&
    closeRoundBrackets > 0 &&
    openRoundBrackets != closeRoundBrackets
  ) {
    normalizeVars(expr);
  }

  let inValue = false;
  let pCount = 0;
  let statement = "";
  for (let i = 0; i < expr.length; i++) {
    const c = expr[i];
    if (c == "(") {
      if (inValue) {
        pCount++;
      }
      inValue = true;
      statement += c;
    } else if (c == ")") {
      if (inValue && pCount > 0) {
        pCount--;
        statement += c;
      } else {
        if (!inValue) {
          logWarning(
            'assignmentExecutorCompile() - "(" expected at ' +
              expr +
              "(" +
              i +
              ")",
            "variablesUtilities.ts",
          );
          return assignmentList;
        }
        inValue = false;
        statement += c;
        assignmentList.push(variableAssignment(statement));
        statement = "";
      }
    } else if (c == " ") {
      if (inValue) {
        statement += c;
      }
    } else {
      statement += c;
    }
  }
  if (!assignmentList.length) {
    logWarning(
      "assignmentExecutorCompile() - Error validating variables in expression [" +
        expr +
        ']: "(" or ")" expected. Syntax is not valid. Valid syntax is var(val)',
      "variablesUtilities.ts",
    );
  }

  return assignmentList;
};

const normalizeVars = (exprToNormalize: string): string => {
  const regexp = getRegExpFromString(")", "s+");
  let exprNormalized = "";
  const exprInitVar = exprToNormalize.substring(
    0,
    exprToNormalize.indexOf("(") + 1,
  );
  const exprToSplit =
    exprToNormalize.substring(
      exprToNormalize.indexOf("(") + 1,
      exprToNormalize.length - 1,
    ) + " ";

  const values = exprToSplit.split(regexp);
  let varNames: string[];
  let varValue: string[];
  let i = 0;
  values.forEach(value => {
    varNames[i] = value.substring(0, value.indexOf("(") + 1);
    varValue[i] = value.substring(value.indexOf("(") + 1);
    varValue[i] = varValue[i]
      .replace(getRegExpFromString(")", "g"), "*}*")
      .replace(getRegExpFromString("*{*", "g"), "(");
    varValue[i] = varValue[i]
      .replace(getRegExpFromString("]", "g"), "*}}*")
      .replace(getRegExpFromString("*{{*", "g"), "[");
    exprNormalized += varNames[i].trim() + varValue[i] + ") ";
    i++;
  });

  return exprInitVar.trim() + exprNormalized.trim() + ")";
};

const variableAssignment = (expr: string): VariableAssignment => {
  const aperta = expr.indexOf("(");
  const chiusa = expr.lastIndexOf(")");
  if (aperta == -1 || chiusa == -1) {
    throw new Error('"(" or ")" expected in ' + expr);
  }
  const vname = expr.substring(0, aperta);
  if (!vname.length) {
    throw new Error("variable name expected in " + expr);
  }
  let vvalue = expr.substring(aperta + 1, chiusa);
  vvalue = vvalue
    .replace(getRegExpFromString("*{*", "g"), "(")
    .replace(getRegExpFromString("*}*", "g"), ")");
  vvalue = vvalue
    .replace(getRegExpFromString("*{{*", "g"), "[")
    .replace(getRegExpFromString("*}}*", "g"), "]");
  const va: VariableAssignment = { variableName: vname, variableValue: vvalue };
  return va;
};
