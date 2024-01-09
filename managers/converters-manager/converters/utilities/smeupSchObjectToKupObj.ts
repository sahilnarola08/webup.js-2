import { SmeupSchObject } from "../../declarations/data-structures/smeupObjectArray";
import { KupObj } from "../../utils/smeupObjectUtilities";

/**
 * Convert smeup sch objectto kup object
 * @param cell
 * @returns Kup obj array
 */
export const smeupSchObjectToKupObject = (
  smeupSchObject: SmeupSchObject
): KupObj => {
  return {
    t: smeupSchObject.type,
    p: smeupSchObject.parameter,
    k: smeupSchObject.code,
    d: smeupSchObject.value,
    e: smeupSchObject.exec,
  };
};
