import { SmeupDataStructureType } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupDataStructure";
import { SmeupObjectArray } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupObjectArray";
import { SmeupTreeNode } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupTreeNode";

/**
 * Single node CN;COL
 */
export const createSingleNodeCNCOL = (): SmeupTreeNode => {
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
          codice: "",
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

/**
 * Create J1URL single node
 */
export const createSingleNodeJ1URL = (): SmeupTreeNode => {
  return {
    children: [
      {
        children: [],
        row: {
          fields: {},
        },
        type: SmeupDataStructureType.SMEUP_TREE_NODE,
        content: {
          tipo: "J4",
          parametro: "IMG",
          codice: "J1;URL;http://google.com",
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

/**
 * Create single object with CN;COL
 */
export const createSigleObjectArrayCNCOL = (): SmeupObjectArray => {
  return {
    type: SmeupDataStructureType.EMPTY,
    rows: [
      {
        type: "CN",
        parameter: "COL",
        code: "",
      },
    ],
  };
};

export const createSingleNodeVOCOD_VER = (): SmeupTreeNode => {
  return {
    children: [
      {
        children: [],
        row: {
          fields: {},
        },
        type: SmeupDataStructureType.SMEUP_TREE_NODE,
        content: {
          tipo: "VO",
          parametro: "COD_VER",
          codice: "000002",
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
