import {
  Column,
  Row,
  SmeupDataStructure,
  SmeupDataStructureType,
} from "./smeupDataStructure";
import { SmeupObject } from "./smeupObject";

/**
 * Smeup Tree Node
 */
export interface SmeupTreeNode extends SmeupDataStructure {
  type: SmeupDataStructureType.SMEUP_TREE_NODE | any;
  columns?: Column[];
  children?: SmeupTreeNode[];
  content?: SmeupObject;
  row?: Row;
}
