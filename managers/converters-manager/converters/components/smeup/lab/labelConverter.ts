import { SmeupTreeNode } from "../../../../declarations/data-structures/smeupTreeNode";
import { SmeupObjectArray } from "../../../../declarations/data-structures/smeupObjectArray";
import { objectArrayToKupTreeNodeArray } from "../../../utilities/objectArrayToKupTreeNodeArray";
import { treeNodeToKupTreeNodeArray } from "../../../utilities/treeNodeToKupTreeNodeArray";
import { KupLabelComponent, LabelConfig, LabelOptions } from "./label";
import { isSmeupObjectArray } from "../../../../utils/smeupDataStructuresUtilities";
import { Counter } from "../../../../utils/regexUtilities";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";
import { styleConverter } from "../../../utilities/layout";
import { SmeupStyleOptions } from "../../../../declarations/data-structures/smeupSch";

/**
 * Tree back end data and options to Label
 * @param options Label options
 * @param backendData TreeNode[]
 * @param kupManager KupManager
 * @returns LabelComponent data, config
 */
export const labelConverter = (
  options: LabelOptions,
  backendData: SmeupTreeNode | SmeupObjectArray,
  kupManager: KupManager,
): Pick<KupLabelComponent, "data" | "config"> => {
  const counter: Counter = { nr: 0 };
  if (isSmeupObjectArray(backendData)) {
    // convert SmeupObjectArray to TreeNode[]
    return {
      data: objectArrayToKupTreeNodeArray(backendData, options, counter),
      config: labelOptionsToLabelProps(options, kupManager),
    };
  } else {
    // convert SmeupTreeNode to TreeNode[]
    return {
      data: treeNodeToKupTreeNodeArray(
        backendData,
        options,
        counter,
        kupManager,
      ),
      config: labelOptionsToLabelProps(options, kupManager),
    };
  }
};

/**
 * Convert Label options to Label props
 * @param backendData
 * @param options
 * @returns
 */
export const labelOptionsToLabelProps = (
  options: LabelOptions,
  kupManager: KupManager,
): Partial<LabelConfig> => {
  const config: Partial<LabelConfig> = {};
  config.styles = styleConverter(options as SmeupStyleOptions, kupManager);
  // get other props
  return config;
};
