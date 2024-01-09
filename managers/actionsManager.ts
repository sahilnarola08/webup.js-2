import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { ComponentEntity } from "../declarations/componentDeclarations";
import {
  DynamismEntity,
  DynamismEvents,
} from "../declarations/dynamismDeclarations";
import { isFBKData, isSmeupTableDataStructure } from "../utils/componentUtils";
import { createDynamism } from "../utils/dynamismUtils";
import executeDynamism from "./dynamismManager";
import { isVirtualFun } from "./funManager";
import { SmeupDataStructure } from "./converters-manager/declarations/data-structures/smeupDataStructure";

export const hasActions = (
  rawComponentData: SmeupDataStructure | ComponentEntity,
): boolean => {
  if (
    !isSmeupTableDataStructure(rawComponentData) &&
    !isFBKData(rawComponentData)
  ) {
    return false;
  }
  if (!rawComponentData.actions || rawComponentData.actions.length == 0) {
    return false;
  }
  return true;
};

export const executeActions = (
  rawComponentData: SmeupDataStructure | ComponentEntity,
  dispatch: Dispatch<AnyAction>,
) => {
  if (!hasActions(rawComponentData)) {
    return;
  }
  const data: SmeupDataStructure = rawComponentData as SmeupDataStructure;
  for (let i = 0; i < data.actions.length; i++) {
    const action = data.actions[i];
    const rawDynamism: DynamismEntity = {
      event: DynamismEvents.CLICK,
      exec:
        isVirtualFun(action.type) && action.exec ? action.exec : action.type,
    };
    const dynamism = createDynamism(rawDynamism);
    executeDynamism(dynamism, dispatch);
  }
};
