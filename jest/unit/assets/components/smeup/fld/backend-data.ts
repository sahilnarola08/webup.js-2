import { SmeupDataStructureType } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupDataStructure";
import { SmeupTreeNode } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupTreeNode";

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
