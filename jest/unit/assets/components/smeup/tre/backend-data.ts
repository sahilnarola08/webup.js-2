import { SmeupDataStructureType } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupDataStructure";
import { SmeupObjectArray } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupObjectArray";
import { SmeupTreeNode } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupTreeNode";

/**
 * Create simple tree node factory function
 */
export const createSimpleTreeNode = (): SmeupTreeNode => {
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
      {
        children: [],
        row: {
          fields: {},
        },
        type: SmeupDataStructureType.SMEUP_TREE_NODE,
        content: {
          tipo: "CN",
          parametro: "COL",
          codice: "MACSTE",
          testo: "Macconi Stefano",
          exec: "F(EXD;*SCO;) 1(CN;COL;MACSTE)",
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

export const createSimpleObjectArray = (): SmeupObjectArray => {
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
      {
        type: "CN",
        parameter: "COL",
        code: "MACSTE",
        value: "Macconi Stefano",
        exec: "F(EXD;*SCO;) 1(CN;COL;MACSTE)",
      },
    ],
  };
};

/**
 * Nested tree node factory function
 */
export const createNestedTreeNode = (): SmeupTreeNode => {
  return {
    children: [
      {
        children: [
          {
            children: [],
            row: {
              fields: {},
            },
            type: SmeupDataStructureType.SMEUP_TREE_NODE,
            content: {
              tipo: "",
              parametro: "",
              codice: "AA",
            },
          },
          {
            children: [
              {
                children: [],
                row: {
                  fields: {},
                },
                type: SmeupDataStructureType.SMEUP_TREE_NODE,
                content: {
                  tipo: "",
                  parametro: "",
                  codice: "ABA",
                },
              },
              {
                children: [],
                row: {
                  fields: {},
                },
                type: SmeupDataStructureType.SMEUP_TREE_NODE,
                content: {
                  tipo: "",
                  parametro: "",
                  codice: "ABB",
                },
              },
            ],
            row: {
              fields: {},
            },
            type: SmeupDataStructureType.SMEUP_TREE_NODE,
            content: {
              tipo: "",
              parametro: "",
              codice: "AB",
            },
          },
        ],
        row: {
          fields: {},
        },
        type: SmeupDataStructureType.SMEUP_TREE_NODE,
        content: {
          tipo: "",
          parametro: "",
          codice: "A",
        },
      },
      {
        children: [],
        row: {
          fields: {},
        },
        type: SmeupDataStructureType.SMEUP_TREE_NODE,
        content: {
          tipo: "",
          parametro: "",
          codice: "B",
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
