import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { TreeNodePath } from "@sme.up/ketchup/dist/types/components/kup-tree/kup-tree-declarations";
import {
  KupTreeComponent,
  TreeNodeExt,
  TreeOptions,
} from "./converters-manager/converters/components/smeup/tre/tree";
import { SmeupTable } from "./converters-manager/declarations/data-structures/smeupTable";
import { isYes } from "./converters-manager/utils/smeupDataStructuresUtilities";
import { KupObj } from "./converters-manager/utils/smeupObjectUtilities";
import { Shapes, Tree } from "../declarations/componentDeclarations";
import { setComponent } from "../store/reduces/components";
import {
  getComponentOptions,
  getCopyOfComponent,
} from "../utils/componentUtils";
import { convertersManager } from "./convertersManager";
import { executeFunForComponentData } from "./funManager";
import { logInfo } from "../utils/logger";

export const executeExpand = (
  tree: Tree,
  node: TreeNodeExt,
  treeNodePath: TreeNodePath,
  dispatch: Dispatch<AnyAction>,
) => {
  let options: TreeOptions = getComponentOptions(
    Shapes.TRE,
    tree.options,
  ) as TreeOptions;
  if (!options.DynExpand || isYes(options.DynExpand)) {
    return;
  }
  if (node.children && node.children.length > 0) {
    return;
  }
  const fun: string = nodeFun(node);
  if (!fun) {
    return;
  }
  const treeCopy: Tree = getCopyOfComponent(tree) as Tree;
  logInfo("getChildren for dynamic expand", "treeManager.ts");
  executeFunForComponentData(fun, treeCopy, undefined, dispatch).then(
    (nodePart: SmeupTable) => {
      const ret: KupTreeComponent = convertersManager(
        Shapes.TRE,
        treeCopy,
        nodePart,
      ) as KupTreeComponent;
      const node: TreeNodeExt = nodeByPath(treeCopy, treeNodePath);
      node.children = ret.data;
      dispatch(
        setComponent({
          id: treeCopy.id,
          component: treeCopy,
        }),
      );
    },
  );
};

const nodeFun = (node: TreeNodeExt): string => {
  if (!node || !node.obj) {
    return null;
  }
  const obj: KupObj = node.obj;
  if (!obj.e) {
    return null;
  }
  return obj.e;
};

const nodeByPath = (tree: Tree, treeNodePath: TreeNodePath) => {
  let node: TreeNodeExt = null;
  for (let i = 0; i < treeNodePath.length; i++) {
    node = nodeByIndex(tree, node, i);
  }
  return node;
};

const nodeByIndex = (
  tree: Tree,
  node: TreeNodeExt,
  index: number,
): TreeNodeExt => {
  if (node == null) {
    if (tree.data.length > index) return tree.data[index];
    else return null;
  } else {
    return node.children[index];
  }
};
