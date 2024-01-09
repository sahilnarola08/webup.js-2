import { ButtonListOptions } from "../components/smeup/btn/buttonList";
import { TreeNodeExt } from "../components/smeup/tre/tree";
import {
  SmeupButton,
  SmeupButtonArray,
} from "../../declarations/data-structures/smeupButtonsArray";
import { isNo } from "../../utils/smeupDataStructuresUtilities";

export const buttonArrayToKupTreeNodeArray = (
  buttonComponentData: SmeupButtonArray,
  options: ButtonListOptions,
): TreeNodeExt[] => {
  // create tree node array
  const treeNodeArray: TreeNodeExt[] = [];
  // scroll through the array
  buttonComponentData.buttons.forEach((firstLevelNode: SmeupButton) => {
    // create empty kup tree node
    const node: TreeNodeExt = {
      cells: {},
      children: [],
      disabled: false,
      expandable: false,
      obj: {
        t: "",
        p: "",
        k: firstLevelNode.id,
      },
      value:
        options.ShowText && isNo(options.ShowText)
          ? null
          : firstLevelNode.title,
      path: [0],
    };
    if (firstLevelNode.icon) {
      node.icon = firstLevelNode.icon;
    }
    /** FIXME: manage children!!!  */
    /** FIXME: manage position!!!  */
    treeNodeArray.push(node);
  });

  return treeNodeArray;
};
