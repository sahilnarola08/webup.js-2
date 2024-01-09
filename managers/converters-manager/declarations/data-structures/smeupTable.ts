import {
  SmeupDataStructureType,
  SmeupTableDataStructure,
} from "./smeupDataStructure";

/**
 * Smeup table (EXB)
 */
export interface SmeupTable extends SmeupTableDataStructure {
  type: SmeupDataStructureType.SMEUP_TABLE;
}
