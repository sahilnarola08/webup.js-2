import {
  SmeupObjectArray,
  SmeupSchObject,
} from "../../declarations/data-structures/smeupObjectArray";
import { KupObj } from "../../utils/smeupObjectUtilities";
import { smeupSchObjectToKupObject } from "./smeupSchObjectToKupObj";

/**
 * Convert smeup object array to kup object array
 * @param cell
 * @returns Kup obj array
 */
export const smeupObjectArrayToKupObjArray = (
  smeupObjectArray: SmeupObjectArray
): KupObj[] => {
  // create empty kup obj array
  const kupObjArray: KupObj[] = [];

  smeupObjectArray.rows.forEach((object: SmeupSchObject) => {
    kupObjArray.push(smeupSchObjectToKupObject(object));
  });

  return kupObjArray;
};
