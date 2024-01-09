import { KupObj as KupObjKetchup } from "@sme.up/ketchup/dist/types/managers/kup-objects/kup-objects-declarations";
import { SmeupObject } from "../declarations/data-structures/smeupObject";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";
import { Cell, Row } from "../declarations/data-structures/smeupDataStructure";
import { SmeupTable } from "../declarations/data-structures/smeupTable";
import { SortObject } from "@sme.up/ketchup";
import type { SortMode } from "@sme.up/ketchup/dist/types/components/kup-data-table/kup-data-table-declarations";
import type { KupDatesFormats } from "@sme.up/ketchup/dist/types/managers/kup-dates/kup-dates-declarations";

/**
 * Create smeup object from canonical form (T;P;K)
 * @param canonicalForm
 * @returns
 */
export const createSmeupObject = (canonicalForm: string) => {
  // create empty smeup object
  const smeupObject: SmeupObject = {
    tipo: "",
    parametro: "",
    codice: "",
  };

  if (!canonicalForm) {
    return smeupObject;
  }
  // parse canonical form
  const splitted: string[] = canonicalForm.split(";");
  // set smeup object properties
  if (splitted[0]) {
    smeupObject.tipo = splitted[0];
  }
  if (splitted[1]) {
    smeupObject.parametro = splitted[1];
  }
  if (splitted[2]) {
    smeupObject.codice = splitted[2];
  }
  return smeupObject;
};

export const canonicalForm = (smeupObject: SmeupObject): string => {
  return (
    smeupObject.tipo + ";" + smeupObject.parametro + ";" + smeupObject.codice
  );
};

/**
 * Create empty smeup object
 * @returns
 */
export const createEmptySmeupObject = (): SmeupObject => {
  return {
    tipo: "",
    parametro: "",
    codice: "",
  };
};

/**
 * Is smeup object empty
 * @param smeupObject
 * @returns
 */
export const isSmeupObjectEmpty = (smeupObject: SmeupObject): boolean => {
  if (
    smeupObject.tipo === "" &&
    smeupObject.parametro === "" &&
    smeupObject.codice === ""
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * Is button ? (J4;BTN)
 * @param smeupObject
 * @returns
 */
export const isButton = (smeupObject: SmeupObject): boolean => {
  if (smeupObject.tipo == "J4" && smeupObject.parametro == "BTN") {
    return true;
  } else {
    return false;
  }
};

/**
 * Is ico ? (J4;ICO)
 * @param smeupObject
 * @returns
 */
export const isIcon = (smeupObject: SmeupObject): boolean => {
  if (smeupObject.tipo == "J4" && smeupObject.parametro == "ICO") {
    return true;
  } else {
    return false;
  }
};

/**
 * Checks whether the object represents a radio button or not.
 * @param {SmeupObject} smeupObject - Object to check.
 * @returns {boolean} True when the object is a radio button.
 */
export const isRadio = (smeupObject: SmeupObject): boolean => {
  if (!smeupObject) return false;
  return "V2" == smeupObject.tipo && "RADIO" == smeupObject.parametro;
};

/**
 * Checks whether the object represents a switch button or not.
 * @param {SmeupObject} smeupObject - Object to check.
 * @returns {boolean} True when the object is a switch button.
 */
export const isSwitch = (smeupObject: SmeupObject): boolean => {
  if (!smeupObject) return false;
  return "V2" == smeupObject.tipo && "ONOFF" == smeupObject.parametro;
};

/**
 * Checks whether the object represents a date or not.
 * @param {SmeupObject} smeupObject - Object to check.
 * @returns {boolean} True when the object is a date.
 */
export const isDate = (smeupObject: SmeupObject): boolean => {
  if (!smeupObject) return false;
  return "D8" == smeupObject.tipo;
};

/**
 * Checks whether the object represents a time or not.
 * @param {SmeupObject} smeupObject - Object to check.
 * @returns {boolean} True when the object is a time.
 */
export const isTime = (smeupObject: SmeupObject): boolean => {
  if (!smeupObject) return false;
  return "I1" === smeupObject.tipo || "I2" === smeupObject.tipo;
};

/**
 * Checks whether the object represents a number or not.
 * @param {SmeupObject} smeupObject - Object to check.
 * @returns {boolean} True when the object is a number.
 */
export const isNumber = (smeupObject: SmeupObject): boolean => {
  if (!smeupObject) return false;
  return "NR" === smeupObject.tipo;
};

/**
 * Is image url ? (J4;IMG;J1;URL;http://....)
 * @param smeupObject
 * @returns
 */
export const isImageUrl = (smeupObject: SmeupObject): boolean => {
  if (
    smeupObject.tipo == "J4" &&
    smeupObject.parametro == "IMG" &&
    smeupObject.codice.includes("J1;URL;")
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * Is pathfile ? (J1;PATHFILE;)
 * @param smeupObject
 * @returns
 */
export const isPathfile = (smeupObject: SmeupObject): boolean => {
  if (smeupObject.tipo == "J1" && smeupObject.parametro == "PATHFILE") {
    return true;
  } else {
    return false;
  }
};

/**
 * Has icon ? I(......) or M(......)
 * @param code
 * @returns
 */
export const hasIcon = (code: string): boolean => {
  if (
    code &&
    (code.startsWith("I(") ||
      code.includes(" I(") ||
      code.startsWith("M(") ||
      code.includes(" M("))
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * Has style ? S(......)
 * @param code
 * @returns
 */
export const hasStyle = (code: string): boolean => {
  if (code && (code.startsWith("S(") || code.includes(" S("))) {
    return true;
  } else {
    return false;
  }
};

/**
 * Has icon text ? T(......)
 * @param code
 * @returns
 */
export const hasIconText = (code: string): boolean => {
  if (code && (code.startsWith("T(") || code.includes(" T("))) {
    return true;
  } else {
    return false;
  }
};

export const toKupObj = (obj: SmeupObject): KupObj => {
  if (!obj) {
    return { t: "", p: "", k: "" };
  }
  const kObj: KupObj = { t: obj.tipo, p: obj.parametro, k: obj.codice };
  if (obj.testo) {
    kObj.d = obj.testo;
  }
  if (obj.exec) {
    kObj.e = obj.exec;
  }
  if (obj.fld) {
    kObj.fld = obj.fld;
  }
  if (obj.leaf) {
    kObj.leaf = obj.leaf;
  }
  if (obj.i) {
    kObj.i = obj.i;
  }
  return kObj;
};

export const toSmeupObj = (kObj: KupObj): SmeupObject => {
  if (!kObj) {
    return { tipo: "", parametro: "", codice: "" };
  }
  const obj: SmeupObject = { tipo: kObj.t, parametro: kObj.p, codice: kObj.k };
  if (kObj.d) {
    obj.testo = kObj.d;
  }
  if (kObj.e) {
    obj.exec = kObj.e;
  }
  if (kObj.fld) {
    obj.fld = kObj.fld;
  }
  if (kObj.leaf) {
    obj.leaf = kObj.leaf;
  }
  if (kObj.i) {
    obj.i = kObj.i;
  }
  return obj;
};

export interface KupObj extends KupObjKetchup {
  /** text (D) */
  d?: string;
  /** exec (E) */
  e?: string;
  /** Field */
  fld?: string;
  /** Leaf */
  leaf?: string;
  /** i (I) */
  i?: string;
}

export const sortByRows = (
  table: SmeupTable,
  cols: string[],
  kupManager: KupManager,
): Row[] => {
  const sortBy = toSortObjectList(cols);
  // check multiple sort
  const isMultiSort = sortBy.length > 1;

  // sorting rows
  return table.rows.slice(0).sort((r1: Row, r2: Row) => {
    if (isMultiSort) {
      for (let i = 0; i < sortBy.length; i++) {
        const compare = compareRows(r1, r2, sortBy[i], kupManager);

        if (compare !== 0) {
          // not same row
          return compare;
        }
      }

      // same row
      return 0;
    } else {
      return compareRows(r1, r2, sortBy[0], kupManager);
    }
  });
};

const compareRows = (
  r1: Row,
  r2: Row,
  sortObj: SortObject,
  kupManager: KupManager,
): number => {
  const cell1: Cell = r1.fields[sortObj.column];
  const cell2: Cell = r2.fields[sortObj.column];

  if (!cell1 && !cell2) {
    return 0;
  }

  if (!cell1) {
    return 1;
  }

  if (!cell2) {
    return -1;
  }

  return compareCell(cell1, cell2, sortObj.sortMode, kupManager);
};

const compareCell = (
  cell1: Cell,
  cell2: Cell,
  sortMode: SortMode,
  kupManager: KupManager,
): number => {
  return compareValues(
    cell1.smeupObject,
    cell2.smeupObject,
    sortMode,
    kupManager,
  );
};

const compareValues = (
  obj1: SmeupObject,
  obj2: SmeupObject,
  sortMode: SortMode,
  kupManager: KupManager,
): number => {
  const sm = sortMode === "A" ? 1 : -1;

  if (!obj1 && !obj2) {
    return 0;
  }
  if (obj1 && !obj2) {
    return sm * 1;
  }
  if (!obj1 && obj2) {
    return sm * -1;
  }

  let o1: KupObj = toKupObj(obj1);
  let o2: KupObj = toKupObj(obj2);
  // If either the type or the parameter of the current object are not equal.
  if (!(obj1.tipo === obj2.tipo && obj1.parametro === obj2.parametro)) {
    let compare = localCompareAsInJava(obj1.tipo, obj2.tipo);
    if (compare === 0) {
      compare = localCompareAsInJava(obj1.parametro, obj2.parametro);
    }
    return compare * sm;
  }

  let s1: string = o1.k;
  let s2: string = o2.k;

  if (s1 == s2) {
    return 0;
  }

  if (s1 == "") {
    return sm * -1;
  }

  if (s2 == "") {
    return sm * 1;
  }

  let v1: any = s1;
  let v2: any = s2;
  if (kupManager.objects.isNumber(o1)) {
    v1 = kupManager.math.numberifySafe(s1);
    v2 = kupManager.math.numberifySafe(s2);
  } else if (kupManager.objects.isDate(o1)) {
    v1 = kupManager.dates.toDate(
      kupManager.dates.format(s1, "YYYY-MM-DD" as KupDatesFormats),
    );
    v2 = kupManager.dates.toDate(
      kupManager.dates.format(s2, "YYYY-MM-DD" as KupDatesFormats),
    );
  } else if (kupManager.objects.isTime(o1)) {
    // Previous code could not work because dayjs
    // returns an invalid date when it tries to parse a time
    // This solution is simpler and it works because the time format
    // was assumed to be equals to HH:mm:ss or HH:mm
    v1 = Number(s1.replace(/:/g, ""));
    v2 = Number(s2.replace(/:/g, ""));
  } else if (kupManager.objects.isTimestamp(o1)) {
    v1 = kupManager.dates.toDate(
      kupManager.dates.format(s1, "YYYY-MM-DD" as KupDatesFormats),
    );
    v2 = kupManager.dates.toDate(
      kupManager.dates.format(s2, "YYYY-MM-DD" as KupDatesFormats),
    );
  }
  if (v1 > v2) {
    return sm * 1;
  }
  if (v1 < v2) {
    return sm * -1;
  }
  return 0;
};

/**
 * Given two strings to compare, the functions decides which string comes before the other or if they are equal.
 * This is meant as a replacement for the JavaScript function localCompare() which produces a slightly different result from
 * the Java version of compareTo().
 *
 * Re-implemented from java source method compareTo() of java.lang.String
 * @param t1 firstString the first string to be compared
 * @param t2 anotherString the another string to be compared to the first one
 * @returns the value 0 if the anotherString is equal to
 *          firstString; a value less than 0 if firstString
 *          is lexicographically less than the anotherString; and a
 *          value greater than 0 if firstString is
 *          lexicographically greater than the anotherString.
 */
const localCompareAsInJava = (t1: string, t2: string): number => {
  let t1Length = t1 == null ? 0 : t1.length;
  let t2Length = t2 == null ? 0 : t2.length;
  const lim = Math.min(t1Length, t2Length);

  let k = 0;
  while (k < lim) {
    const c1 = t1[k];
    const c2 = t2[k];
    if (c1 !== c2) {
      return c1.charCodeAt(0) - c2.charCodeAt(0);
    }
    k++;
  }
  return t1Length - t2Length;
};

const toSortObjectList = (cols: string[]): SortObject[] => {
  const sortByArray: SortObject[] = [];
  for (let i = 0; i < cols.length; i++) {
    sortByArray.push({ column: cols[i], sortMode: "A" as SortMode });
  }
  return sortByArray;
};
