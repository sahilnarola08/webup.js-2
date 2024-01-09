import { KupListNode } from "@sme.up/ketchup/dist/types/components/kup-list/kup-list-declarations";
import {
  Column,
  Row,
} from "../../declarations/data-structures/smeupDataStructure";
import { isColumnHidden } from "./columnToKupColumn";

/**
 * Convert row structure to kup list node
 * @param row
 * @returns Ketchup Row
 */
export const rowToKupListNode = (
  row: Row,
  columns: Column[] | undefined
): KupListNode | undefined => {
  if (!columns) {
    return undefined;
  }

  var codeColumnName = "";
  var descrColumnName = "";
  for (var i = 0; i < columns?.length; i++) {
    const col = columns[i];
    if (isColumnHidden(col)) {
      continue;
    }
    const colName = col.code;
    if (colName == "RowId" || colName == "ID") {
      continue;
    }
    if (codeColumnName == "") {
      codeColumnName = colName;
      continue;
    }
    if (descrColumnName == "") {
      descrColumnName = colName;
      break;
    }
  }
  const codice = row.fields[codeColumnName].smeupObject.codice;
  if (!codice || codice.trim() == "") {
    return undefined;
  }
  // create empty kup list node
  const kupListNode: KupListNode = {
    value: "",
  };

  kupListNode.id = row.fields[codeColumnName].smeupObject.codice;
  if (row.fields[descrColumnName]?.smeupObject?.testo) {
    kupListNode.value = row.fields[descrColumnName].smeupObject.testo as string;
  } else {
    kupListNode.value = row.fields[descrColumnName].smeupObject
      .codice as string;
  }

  return kupListNode;
};
