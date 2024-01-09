import { SmeupObject } from "../../declarations/data-structures/smeupObject";
import { SmeupSchObject } from "../../declarations/data-structures/smeupObjectArray";

/**
 * Convert smeup sch objectto kup object
 * @param cell
 * @returns Kup obj array
 */
export const smeupSchObjectToSmeupObject = (
  smeupSchObject: SmeupSchObject
): SmeupObject => {
  return {
    tipo: smeupSchObject.type,
    parametro: smeupSchObject.parameter,
    codice: smeupSchObject.code,
    testo: smeupSchObject.value,
  };
};
