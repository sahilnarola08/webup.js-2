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
      icon: "panorama_fish_eye",
      obj: {
        d: "Bonardi Mattia",
        e: "F(EXD;*SCO;) 1(CN;COL;BONMAI)",
        i: "VO;COD_VER;000000",
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
      icon: "check",
      obj: {
        d: "Macconi Stefano",
        e: "F(EXD;*SCO;) 1(CN;COL;MACSTE)",
        i: "VO;COD_VER;000003",
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
        d: "Bonardi Mattia",
        e: "F(EXD;*SCO;) 1(CN;COL;BONMAI)",
        i: "VO;COD_VER;000000",
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
        i: "VO;COD_VER;000003",
        k: "MACSTE",
        p: "COL",
        t: "CN",
      } as KupObj,
      value: "MACSTE",
      path: [1],
    },
  ];
};
