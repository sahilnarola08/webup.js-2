import { DateTime } from "luxon";
import { SmeupObject } from "../managers/converters-manager/declarations/data-structures/smeupObject";
import { isDate } from "../managers/converters-manager/utils/smeupObjectUtilities";

const dateFormats = {
  "*YYMD": "yyyyMMdd",
  "*DMYY": "ddMMyyyy",
  "*MDYY": "MMddyyyy",
  "*YMD": "yyMMdd",
  "*DMY": "ddMMyy",
  "*MDY": "MMddyy",
};

export const toSmeup = (isoDate: string, smeupObject: SmeupObject): string => {
  try {
    const dateFormat = dateFormats[smeupObject?.parametro?.toUpperCase()];
    const parsedDate = DateTime.fromISO(isoDate);
    if (parsedDate.isValid && isDate(smeupObject))
      return parsedDate.toFormat(dateFormat);
  } catch (e) {
    // ignore
  }
  return isoDate;
};

export const toDate = (smeupObject: SmeupObject): string => {
  const defaultResult = DateTime.now().toISODate();
  if (!isDate(smeupObject)) {
    return defaultResult;
  }

  const dateFormat = dateFormats[smeupObject?.parametro?.toUpperCase()];
  const sanitizedDateFormat = dateFormat?.replace(/[-/]/g, "") ?? "ddMMyy";

  const sanitizedValue = smeupObject.codice.replace(/[-/]/g, "");
  return (
    DateTime.fromFormat(sanitizedValue, sanitizedDateFormat).toISODate() ??
    defaultResult
  );
};
