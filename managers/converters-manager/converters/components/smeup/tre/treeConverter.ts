import { Components, KupDataColumn } from "@sme.up/ketchup";
import { KupTreeComponent, TreeOptions } from "./tree";
import { SmeupTreeNode } from "../../../../declarations/data-structures/smeupTreeNode";
import { SmeupObjectArray } from "../../../../declarations/data-structures/smeupObjectArray";
import { objectArrayToKupTreeNodeArray } from "../../../utilities/objectArrayToKupTreeNodeArray";
import { treeNodeToKupTreeNodeArray } from "../../../utilities/treeNodeToKupTreeNodeArray";
import {
  isIconTypeVisible,
  isSmeupObjectArray,
  isSmeupTreeNode,
  isYes,
} from "../../../../utils/smeupDataStructuresUtilities";
import { Counter } from "../../../../utils/regexUtilities";
import { FCellPadding } from "@sme.up/ketchup/dist/types/f-components/f-cell/f-cell-declarations";
import { columnToKupColumn } from "../../../utilities/columnToKupColumn";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";

/**
 * Tree back end data and options to Kup Tree
 * @param options Tree options
 * @param backendData TreeNode[]
 * @param kupManager KupManager
 * @returns Components.KupTree data, config
 */
export const treeConverter = (
  options: TreeOptions,
  backendData: SmeupTreeNode | SmeupObjectArray,
  kupManager: KupManager,
): Pick<KupTreeComponent, "data" | "config" | "columns"> => {
  const counter: Counter = { nr: 0 };
  if (isSmeupObjectArray(backendData)) {
    // convert SmeupObjectArray to TreeNode[]
    return {
      data: objectArrayToKupTreeNodeArray(backendData, options, counter),
      config: treeOptionsToTreeProps(options, counter),
    };
  } else {
    // convert SmeupTreeNode to TreeNode[]
    const data = treeNodeToKupTreeNodeArray(
      backendData,
      options,
      counter,
      kupManager,
    );
    const config = treeOptionsToTreeProps(options, counter);
    const columns = treeNodeToKupColumnsArray(backendData);
    const ret: Pick<KupTreeComponent, "data" | "config" | "columns"> = {
      data: data,
      config: config,
    };
    if (columns) {
      ret.columns = columns;
    }
    return ret;
  }
};

/**
 * Convert tree options to Tree props
 * @param backendData
 * @param options
 * @returns
 */
export const treeOptionsToTreeProps = (
  options: TreeOptions,
  counter: Counter,
): Partial<Components.KupTree> => {
  const config: Partial<Components.KupTree> = {};
  if (counter.nr > 1) {
    if (
      !options.FilterEnabled ||
      isYes(options.FilterEnabled) ||
      (options.AutoFilterOn && counter.nr >= options.AutoFilterOn) ||
      (!options.AutoFilterOn && counter.nr >= 15)
    ) {
      config.globalFilter = true;
      if (isYes(options.GlobalFilt)) {
        config.globalFilterValue = options.GFilterVal;
      }
    }
  }
  config.density = "medium" as FCellPadding;
  if (options.Density) {
    config.density = options.Density.toLowerCase() as FCellPadding;
  }
  config.showFilters = !options.FilterEnabled || isYes(options.FilterEnabled);

  config.expanded = !options.Expanded || isYes(options.Expanded);
  if (!config.expanded) {
    config.expanded = options.SelItem != null && options.SelItem != undefined;
  }
  if (!config.expanded) {
    config.expanded =
      options.SelName != null &&
      options.SelName != undefined &&
      options.SelName != "";
  }
  if (!config.expanded) {
    config.expanded =
      options.ShowColumns && isYes(options.ShowColumns) ? true : false;
  }
  config.showColumns =
    options.ShowColumns && isYes(options.ShowColumns) ? true : false;
  config.showHeader = !options.ShowHeader || isYes(options.ShowHeader);
  config.showIcons = !options.Icone || isIconTypeVisible(options.Icone);
  config.useDynamicExpansion =
    options.DynExpand && isYes(options.DynExpand) ? true : false;
  config.showFooter =
    config.showColumns && (!options.ShowTotal || isYes(options.ShowTotal));

  if (counter.nr <= 1) {
    config.globalFilter = false;
    config.globalFilterValue = "";
    config.showFooter = false;
    config.totals = undefined;
  }
  // showTOoltip
  // className

  // get other props
  return config;
};

const treeNodeToKupColumnsArray = (
  backendData: SmeupTreeNode | SmeupObjectArray,
): KupDataColumn[] | null => {
  if (!backendData || !isSmeupTreeNode(backendData)) {
    return null;
  }
  const data: SmeupTreeNode = backendData;
  if (!data.columns || data.columns.length == 0) {
    return null;
  }
  const columns: KupDataColumn[] = [];
  for (let i = 0; i < data.columns.length; i++) {
    columns.push(columnToKupColumn(data.columns[i]));
  }
  return columns;
};
