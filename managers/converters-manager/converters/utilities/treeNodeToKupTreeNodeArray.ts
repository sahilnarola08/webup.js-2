import { TreeNodePath } from "@sme.up/ketchup/dist/types/components/kup-tree/kup-tree-declarations";
import { ComponentOptions } from "../../declarations/component";
import { TreeNodeExt } from "../components/smeup/tre/tree";
import { Column } from "../../declarations/data-structures/smeupDataStructure";
import { SmeupTreeNode } from "../../declarations/data-structures/smeupTreeNode";
import { Counter } from "../../utils/regexUtilities";
import { toKupObj } from "../../utils/smeupObjectUtilities";
import { smeupNodeValue } from "../../utils/treeNodeUtilities";
import { rowToKupRow } from "./rowToKupRow";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";

/**
 * Convert single TreeNode to KupTreeNode
 * @param smeupTreeNode
 * @returns Ketchup Tree node
 */
export const treeNodeToKupTreeNodeArray = (
  rootNode: SmeupTreeNode,
  options: ComponentOptions,
  counter: Counter,
  kupManager: KupManager,
): TreeNodeExt[] => {
  // create empty array
  const kupTreeNodeArray: TreeNodeExt[] = [];

  // traverse first node children (first level tree)
  rootNode.children.forEach((firstLevelNode: SmeupTreeNode, index: number) => {
    // create empty kup tree node
    const node: TreeNodeExt = {
      cells: {},
      children: [],
      disabled: false,
      expandable: false,
      obj: {
        t: "",
        p: "",
        k: "",
      },
      value: "",
      path: [index],
    };

    // set object, value and exec
    if (firstLevelNode.content) {
      node.obj = toKupObj(firstLevelNode.content);
      node.value = smeupNodeValue(
        firstLevelNode.content,
        options,
        firstLevelNode.content.codice
          ? firstLevelNode.content.codice
          : firstLevelNode.content.testo,
      );
      node.exec = firstLevelNode.content.exec
        ? firstLevelNode.content.exec
        : "";
      node.expandable =
        firstLevelNode.children && firstLevelNode.children.length > 0;
      node.disabled = firstLevelNode.content?.leaf == "NoSelect";
    }

    if (firstLevelNode.row) {
      node.cells = rowToKupRow(
        firstLevelNode.row,
        firstLevelNode.columns,
        options.dSep,
        kupManager,
      ).cells;
    }

    // traverse children
    firstLevelNode.children.forEach((child: SmeupTreeNode, i: number) => {
      traverseTreeNode(
        firstLevelNode.columns,
        child,
        node,
        options,
        counter,
        i,
        kupManager,
      );
    });

    counter.nr = counter.nr + 1;
    // add to array
    kupTreeNodeArray.push(node);
  });

  return kupTreeNodeArray;
};

/**
 * Recursively function to traverse inside tree structure
 * Assign value by reference to parent node
 * @param treeNode
 * @param kupTreeNodeParent
 */
const traverseTreeNode = (
  columns: Column[] | undefined,
  treeNode: SmeupTreeNode,
  kupTreeNodeParent: TreeNodeExt,
  options: ComponentOptions,
  counter: Counter,
  i: number,
  kupManager: KupManager,
) => {
  // convert treeNode to KupTreeNode
  const path: TreeNodePath = [...kupTreeNodeParent.path];
  path.push(i);
  const node: TreeNodeExt = {
    cells: {},
    children: [],
    disabled: false,
    expandable: false,
    obj: {
      t: "",
      p: "",
      k: "",
    },
    value: "",
    path: path,
  };

  // set object, value and exec
  if (treeNode.content) {
    node.obj = toKupObj(treeNode.content);
    node.value = smeupNodeValue(
      treeNode.content,
      options,
      treeNode.content.codice
        ? treeNode.content.codice
        : treeNode.content.testo,
    );
    node.exec = treeNode.content.exec;
    node.expandable = treeNode.children && treeNode.children.length > 0;
    node.disabled = treeNode.content?.leaf == "NoSelect";
  }

  if (treeNode.row) {
    node.cells = rowToKupRow(
      treeNode.row,
      columns,
      options.dSep,
      kupManager,
    ).cells;
  }

  // traverse children
  treeNode.children.forEach((childNode: SmeupTreeNode, index: number) => {
    traverseTreeNode(
      columns,
      childNode,
      node,
      options,
      counter,
      index,
      kupManager,
    );
  });

  // add node to parent node
  if (kupTreeNodeParent.children) {
    counter.nr = counter.nr + 1;
    kupTreeNodeParent.children.push(node);
  }
};
