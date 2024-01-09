import {
  SmeupDataStructure,
  SmeupDataStructureType,
  SmeupTableDataStructure,
} from "./smeupDataStructure";
import { SmeupTable } from "./smeupTable";

/**
 * Smeup input panel (INP)
 */
export interface SmeupInputPanel extends SmeupTableDataStructure {
  type: SmeupDataStructureType.SMEUP_INPUT_PANEL;
}

export interface SmeupInputPanelResponse extends SmeupDataStructure {
  type: SmeupDataStructureType.SMEUP_INPUT_PANEL_RESPONSE;
  table: SmeupTable;
}
