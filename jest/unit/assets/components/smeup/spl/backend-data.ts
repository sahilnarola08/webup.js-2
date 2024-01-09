import { SmeupDataStructureType } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupDataStructure";
import { SmeupObjectArray } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupObjectArray";

export const createEmptyObjectArray = (): SmeupObjectArray => {
  return {
    type: SmeupDataStructureType.EMPTY,
    rows: [],
  };
};
