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
      value: "BONMAI",
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
      value: "MACSTE",
      path: [1],
    },
  ];
};

/**
 * Tree node with icons
 */
export const createKupTreeNodeWithIcons = (): TreeNodeExt[] => {
  return [
    {
      cells: {},
      children: [],
      disabled: false,
      exec: "F(EXD;*SCO;) 1(CN;COL;BONMAI)",
      expandable: false,
      obj: {
        k: "BONMAI",
        p: "COL",
        t: "CN",
      },
      value: "Bonardi Mattia",
      icon: "account-box-outline",
      path: [0],
    },
    {
      cells: {},
      children: [],
      disabled: false,
      exec: "F(EXD;*SCO;) 1(CN;COL;MACSTE)",
      expandable: false,
      obj: {
        k: "MACSTE",
        p: "COL",
        t: "CN",
      },
      value: "Macconi Stefano",
      icon: "account-box-outline",
      path: [0],
    },
  ];
};
