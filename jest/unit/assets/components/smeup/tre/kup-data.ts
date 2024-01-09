import { TreeNodeExt } from "../../../../../../managers/converters-manager/converters/components/smeup/tre/tree";
import { KupObj } from "../../../../../../managers/converters-manager/utils/smeupObjectUtilities";

/**
 * SIMPLE TREE NODE mock
 */
export const createSimpleKupTreeNode = (): TreeNodeExt[] => {
  return [
    {
      cells: {},
      children: [],
      disabled: false,
      exec: "F(EXD;*SCO;) 1(CN;COL;BONMAI)",
      expandable: false,
      obj: {
        d: "Bonardi Mattia",
        e: "F(EXD;*SCO;) 1(CN;COL;BONMAI)",
        k: "BONMAI",
        p: "COL",
        t: "CN",
      } as KupObj,
      value: "BONMAI: Bonardi Mattia",
      path: [0],
    },
    {
      cells: {},
      children: [],
      disabled: false,
      exec: "F(EXD;*SCO;) 1(CN;COL;MACSTE)",
      expandable: false,
      obj: {
        d: "Macconi Stefano",
        e: "F(EXD;*SCO;) 1(CN;COL;MACSTE)",
        k: "MACSTE",
        p: "COL",
        t: "CN",
      } as KupObj,
      value: "MACSTE: Macconi Stefano",
      path: [1],
    },
  ];
};

export const createNestedKupTreeNode = (): TreeNodeExt[] => {
  return [
    {
      cells: {},
      children: [
        {
          cells: {},
          children: [],
          disabled: false,
          expandable: false,
          exec: undefined,
          obj: {
            t: "",
            p: "",
            k: "AA",
          } as KupObj,
          value: "AA: ",
          path: [0, 0],
        },
        {
          cells: {},
          children: [
            {
              cells: {},
              children: [],
              disabled: false,
              expandable: false,
              exec: undefined,
              obj: {
                t: "",
                p: "",
                k: "ABA",
              } as KupObj,
              value: "ABA: ",
              path: [0, 1, 0],
            },
            {
              cells: {},
              children: [],
              disabled: false,
              expandable: false,
              exec: undefined,
              obj: {
                t: "",
                p: "",
                k: "ABB",
              } as KupObj,
              value: "ABB: ",
              path: [0, 1, 1],
            },
          ],
          disabled: false,
          expandable: true,
          exec: undefined,
          obj: {
            t: "",
            p: "",
            k: "AB",
          } as KupObj,
          value: "AB: ",
          path: [0, 1],
        },
      ],
      disabled: false,
      expandable: true,
      exec: "",
      obj: {
        t: "",
        p: "",
        k: "A",
      } as KupObj,
      value: "A: ",
      path: [0],
    },
    {
      cells: {},
      children: [],
      disabled: false,
      expandable: false,
      exec: "",
      obj: {
        t: "",
        p: "",
        k: "B",
      } as KupObj,
      value: "B: ",
      path: [1],
    },
  ];
};
