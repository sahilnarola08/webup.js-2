import { Components } from "@sme.up/ketchup";
import { SmeupTreeNode } from "../../../../declarations/data-structures/smeupTreeNode";
import { SmeupObjectArray } from "../../../../declarations/data-structures/smeupObjectArray";
import { objectArrayToKupTreeNodeArray } from "../../../utilities/objectArrayToKupTreeNodeArray";
import { treeNodeToKupTreeNodeArray } from "../../../utilities/treeNodeToKupTreeNodeArray";
import { KupButtonListComponent, ButtonListOptions } from "./buttonList";
import { TreeNodeExt } from "../tre/tree";
import { getObjectIcon } from "../../../../services/iconService";
import {
  isSmeupButtonArray,
  isSmeupObjectArray,
  isYes,
} from "../../../../utils/smeupDataStructuresUtilities";
import { SmeupButtonArray } from "../../../../declarations/data-structures/smeupButtonsArray";
import { buttonArrayToKupTreeNodeArray } from "../../../utilities/buttonArrayToKupTreeNodeArray";
import { Counter } from "../../../../utils/regexUtilities";
import { FButtonStyling } from "@sme.up/ketchup/dist/types/f-components/f-button/f-button-declarations";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";

/**
 * Convert tree data and tree options to TreeNodeExt[] and Button List props
 * @param options Button List options
 * @param backendData TreeNode[]
 * @param kupManager KupManager
 * @returns Components.KupButtonList data, config
 */
export const buttonListConverter = (
  options: ButtonListOptions,
  backendData: SmeupTreeNode | SmeupObjectArray | SmeupButtonArray,
  kupManager: KupManager,
): Pick<KupButtonListComponent, "data" | "config"> => {
  let data: TreeNodeExt[] = [];
  const counter: Counter = { nr: 0 };
  if (isSmeupObjectArray(backendData)) {
    // convert SmeupObjectArray to TreeNode[]
    data = objectArrayToKupTreeNodeArray(backendData, options, counter);
  } else if (isSmeupButtonArray(backendData)) {
    data = buttonArrayToKupTreeNodeArray(backendData, options);
  } else {
    // convert SmeupTreeNode to TreeNode[]
    data = treeNodeToKupTreeNodeArray(
      backendData,
      options,
      counter,
      kupManager,
    );
  }
  // create config
  const config: Partial<Components.KupButtonList> =
    buttonListOptionsToButtonListProps(options, data);
  return {
    data,
    config,
  };
};

/**
 * Convert Button List options to Button List props
 * @param backendData
 * @param options
 * @returns
 */
export const buttonListOptionsToButtonListProps = (
  options: ButtonListOptions,
  data: TreeNodeExt[],
): Partial<Components.KupButtonList> => {
  const config: Partial<Components.KupButtonList> = {};

  // Horiz
  if (!options.Horiz || !isYes(options.Horiz)) {
    config.columns = 1;
  }

  if (isYes(options.Flat)) {
    config.styling = "flat" as FButtonStyling;
  }

  //Show icon
  if (!options.ShowIcon || isYes(options.ShowIcon)) {
    data.forEach((treeNode: TreeNodeExt) => {
      if (treeNode.obj) {
        const icon = getObjectIcon(treeNode.obj);
        if (icon) {
          treeNode.icon = icon;
        }
      }
    });
  }

  // get other props
  return config;
};
