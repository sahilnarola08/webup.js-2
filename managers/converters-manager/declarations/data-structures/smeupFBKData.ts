import {
  SmeupDataStructure,
  SmeupDataStructureType,
} from "./smeupDataStructure";

/**
 * Smeup feedback Data (FBK)
 */
export interface SmeupFBKData extends SmeupDataStructure {
  type: SmeupDataStructureType.SMEUP_FBK_DATA;
}
