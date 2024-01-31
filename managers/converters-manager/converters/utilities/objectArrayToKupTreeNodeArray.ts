import { ComponentOptions } from "../../declarations/component";
import { TreeNodeExt } from "../components/smeup/tre/tree";
import {
  SmeupObjectArray,
  SmeupSchObject,
} from "../../declarations/data-structures/smeupObjectArray";
import { Counter } from "../../utils/regexUtilities";
import { KupObj } from "../../utils/smeupObjectUtilities";
import { smeupSchNodeValue } from "../../utils/treeNodeUtilities";

/**
 * Convert smeup sch component data structure to ketchup tree node array
 * @param SchComponentData  smeup structure
 * @returns Ketchup tree node array
 */
export const objectArrayToKupTreeNodeArray = (
  schComponentData:  SmeupObjectArray | any,
  options: ComponentOptions,
  counter: Counter,
): TreeNodeExt[] => {
  // create tree node array
  const treeNodeArray: TreeNodeExt[] = [];

  // scroll through the array
  schComponentData.rows.forEach((object: SmeupSchObject, index: number) => {
    const node: TreeNodeExt = {
      obj: {
        t: object.type,
        p: object.parameter,
        k: object.code,
        d: object.value as string,
        e: object.exec as string,
        i: object.i,
      } as KupObj,
      value: smeupSchNodeValue(object, options, object.value as string),
      exec: object.exec as string,
      cells: {},
      children: [],
      disabled: false,
      expandable: false,
      path: [index],
    };
    counter.nr = counter.nr + 1;
    treeNodeArray.push(node);
  });

  return treeNodeArray;
};
