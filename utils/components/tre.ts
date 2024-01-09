import { TreeNodePath } from "@sme.up/ketchup/dist/types/components/kup-tree/kup-tree-declarations";
import { Shapes } from "../../declarations/componentDeclarations";
import { ComponentException } from "../../exceptions/ComponentException";
import { TreeNodeExt } from "../../managers/converters-manager/converters/components/smeup/tre/tree";

/**
 * Find node by its name and return TreeNodePath
 * @param nodes
 * @param name
 */
export const findNodePathByName = (
  nodes: TreeNodeExt[],
  name: string,
): TreeNodePath => {
  let treeNode: TreeNodeExt;
  findNode(nodes);
  if (treeNode) {
    return treeNode.path;
  } else {
    throw new ComponentException(
      `Node with name ${name} not found`,
      Shapes.TRE,
    );
  }

  function findNode(nodes: TreeNodeExt[]) {
    nodes.forEach(node => {
      if ((node.obj as any).d == name) {
        treeNode = node;
      } else {
        findNode(node.children);
      }
    });
  }
};

/**
 * Find node by its index and return TreeNodePath
 * @param nodes
 * @param index
 */
export const findNodePathByIndex = (
  nodes: TreeNodeExt[],
  index: number,
): TreeNodePath => {
  let i = 0;
  let treeNode: TreeNodeExt;
  findNode(nodes);
  if (treeNode) {
    return treeNode.path;
  } else {
    throw new ComponentException(
      `Node with index ${index} not found`,
      Shapes.TRE,
    );
  }

  function findNode(nodes: TreeNodeExt[]) {
    nodes.forEach(node => {
      i++;
      if (i == index) {
        treeNode = node;
      } else {
        findNode(node.children);
      }
    });
  }
};
