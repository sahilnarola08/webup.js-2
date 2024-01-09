import { Components } from "@sme.up/ketchup";
import { FCellPadding } from "@sme.up/ketchup/dist/types/f-components/f-cell/f-cell-declarations";
import {
  KupTreeComponent,
  TreeOptions,
} from "../../../../../../managers/converters-manager/converters/components/smeup/tre/tree";
import { YesNo } from "../../../../../../managers/converters-manager/declarations/data-structures/general";
import { createSimpleKupTreeNode } from "../../../../assets/components/smeup/tre/kup-data";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Create first tree options
 */
export const createFirstTreeOptions = (): TreeOptions => {
  return {
    shape: Shapes.TRE,
    SelFirst: YesNo.Yes,
    dSep: ",",
  };
};

/**
 * Create first tree config
 */
export const createFirstTreeConfig = (): Partial<Components.KupTree> => {
  // TODO: call method setSelectedNode - no more property
  // return {
  //   selectedNode: [0],
  // };
  return {
    density: "medium" as FCellPadding,
    expanded: true,
    showColumns: false,
    showFilters: true,
    globalFilter: true,
    showFooter: false,
    showHeader: true,
    showIcons: true,
    useDynamicExpansion: false,
  };
};

/**
 * Create first convertion result
 */
export const createFirstTreeDataAndConfig = (): Pick<
  KupTreeComponent,
  "data" | "config"
> => {
  return {
    data: createSimpleKupTreeNode(),
    config: createFirstTreeConfig(),
  };
};
