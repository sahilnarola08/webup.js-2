import { Components, KupDataColumn } from "@sme.up/ketchup";
import {
  KupTreeNode,
  TreeNodePath,
} from "@sme.up/ketchup/dist/types/components/kup-tree/kup-tree-declarations";
import {
  IconType,
  YesNo,
} from "../../../../declarations/data-structures/general";
import {
  KupComponent,
  ComponentOptions,
} from "../../../../declarations/component";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Tree
 */
export interface KupTreeComponent extends KupComponent {
  /** data */
  data: TreeNodeExt[];
  /** columns */
  columns?: KupDataColumn[];
  /** props */
  config: Partial<Components.KupTree>;
}

/**
 * Tree options
 */
export interface TreeOptions extends ComponentOptions {
  shape: Shapes.TRE;
  SelFirst?: YesNo;
  SelItem?: number;
  SelName?: string;
  ClickItem?: string;
  DynExpand?: YesNo; //ok manca fun da invocare per espansione
  MaxDepth?: number;
  Expanded?: YesNo; //ok
  FilterEnabled?: YesNo; //ok
  Filter?: string;
  GlobalFilt?: YesNo; //ok
  GFilterVal?: string; //ok
  AutoFilterOn?: number; //ok
  ReadOnly?: YesNo;
  Icone?: IconType; //ok manca reperimento icone
  ShowHeader?: YesNo; //ok
  ShowColumns?: YesNo; //ok
  NodeText?: "Text" | "Code" | "Both"; //ok
  Density?: "medium" | "dense" | "wide"; //ok
  ShowObj?: YesNo;
  ShowTooltip?: YesNo;
  ShowTotal?: YesNo; //ok manca calcolo dei totali
  DftTotal?: string;
  ShowCmdBar?: YesNo;
}

/**
 * Tree data extended
 */
export interface TreeNodeExt extends KupTreeNode {
  exec?: string;
  resource?: string;
  path: TreeNodePath;
  children: TreeNodeExt[];
}
