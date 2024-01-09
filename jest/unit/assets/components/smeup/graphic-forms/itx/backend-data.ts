import { SmeupDataStructureType } from "../../../../../../../managers/converters-manager/declarations/data-structures/smeupDataStructure";
import { SmeupObjectArray } from "../../../../../../../managers/converters-manager/declarations/data-structures/smeupObjectArray";
import { SmeupTreeNode } from "../../../../../../../managers/converters-manager/declarations/data-structures/smeupTreeNode";

export const createSingleTreeNode = (): SmeupTreeNode => {
  return {
    children: [
      {
        children: [],
        row: {
          fields: {},
        },
        type: SmeupDataStructureType.SMEUP_TREE_NODE,
        content: {
          tipo: "CN",
          parametro: "COL",
          codice: "BONMAI",
          testo: "Bonardi Mattia",
          exec: "F(EXD;*SCO;) 1(CN;COL;BONMAI)",
        },
      },
    ],
    messages: [],
    row: {
      fields: {},
    },
    type: SmeupDataStructureType.SMEUP_TREE_NODE,
  };
};

export const createSigleObjectArray = (): SmeupObjectArray => {
  return {
    type: SmeupDataStructureType.EMPTY,
    rows: [
      {
        type: "CN",
        parameter: "COL",
        code: "BONMAI",
        value: "Bonardi Mattia",
        exec: "F(EXD;*SCO;) 1(CN;COL;BONMAI)",
      },
    ],
  };
};
