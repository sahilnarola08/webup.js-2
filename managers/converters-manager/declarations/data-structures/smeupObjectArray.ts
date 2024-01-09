import { SmeupDataStructure } from "./smeupDataStructure";

/**
 * Data of sch component (::D.OGG)
 */
export interface SmeupObjectArray extends SmeupDataStructure {
  rows: SmeupSchObject[];
}

/**
 * Smeup object into sch structure
 */
export interface SmeupSchObject {
  type: string;
  parameter: string;
  code: string;
  value?: string;
  exec?: string;
  i?: string;
}
