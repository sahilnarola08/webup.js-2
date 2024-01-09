import { IconMap } from "../constants/iconConstants";
import { SmeupObject } from "../declarations/data-structures/smeupObject";
import { parseBetweenBrackets } from "../utils/regexUtilities";
import {
  KupObj,
  hasIcon,
  isButton,
  isIcon,
} from "../utils/smeupObjectUtilities";

/**
 * Getting icon from smeup object code
 * @param code
 * @return kup icon | ""
 */
export const getIconFromCode = (code: string) => {
  if (code) {
    // getting kup icon from icon map
    const kupIcon: string = IconMap[code];
    if (kupIcon) {
      return kupIcon;
    }
  }
  return "image-broken";
};

/**
 * Extract icon from code and covert it to ketchup icon
 * @param code
 * @returns
 */
export const getIcon = (code: string): string | undefined => {
  // Extract icon from I(....) or M(....) expression
  let icon = parseBetweenBrackets("I", code);
  if (!icon) {
    icon = parseBetweenBrackets("M", code);
  }
  return getIconFromCode(icon);
};

/**
 * Extract style from code and covert it to ketchup style
 * @param code
 * @returns
 */
export const getStyle = (code: string): string | undefined => {
  // Extract style from S(....) expression
  return parseBetweenBrackets("S", code);
};

/**
 * Extract icon text from code
 * @param code
 * @returns
 */
export const getIconText = (code: string): string | undefined => {
  // Extract icon text from T(....) expression
  return parseBetweenBrackets("T", code);
};

/**
 * Get object icon T;P;K
 * @param obj
 * @returns
 */
export const getObjectIcon = (obj: KupObj): string | undefined => {
  if (obj.i) {
    return getIconFromCode(obj.i);
  }
  if (obj.t == "VO") {
    if (
      (obj.p == "COD_SOS" || obj.p == "COD_VER" || obj.p == "COD_AGG") &&
      obj.k
    ) {
      return getIconFromCode(obj.t + ";" + obj.p + ";" + obj.k);
    }
  } else {
    if (obj.t && obj.p) {
      return getIconFromCode(obj.t + ";" + obj.p + ";");
    }
  }
};
/**
 * Get object icon tipo;parametro;codice
 * @param smeupObj
 * @returns
 */
export const getSmeupObjectIcon = (obj: SmeupObject): string | undefined => {
  if (hasIcon(obj.codice)) {
    return getIcon(obj.codice);
  }
  if (obj.i) {
    return getIconFromCode(obj.i);
  }
  if (isIcon(obj) || isButton(obj)) {
    if (obj.codice) {
      const chunks: string[] = obj.codice.split(";", 5);
      if (chunks.length > 2) {
        return getIconFromCode(chunks[0] + ";" + chunks[1] + ";" + chunks[2]);
      }
    }
    return undefined;
  }
  if (obj.tipo == "VO") {
    if (
      (obj.parametro == "COD_SOS" ||
        obj.parametro == "COD_VER" ||
        obj.parametro == "COD_AGG") &&
      obj.codice
    ) {
      return getIconFromCode(obj.tipo + ";" + obj.parametro + ";" + obj.codice);
    }
  } else {
    if (obj.tipo && obj.parametro) {
      return getIconFromCode(obj.tipo + ";" + obj.parametro + ";");
    }
  }
};
