import { KupDataCell } from "../components/smeup/exb-mat/dataTable";
import {
  Cell,
  Column,
} from "../../declarations/data-structures/smeupDataStructure";
import {
  getIcon,
  getIconText,
  getSmeupObjectIcon,
  getStyle,
} from "../../services/iconService";
import {
  hasIcon,
  hasIconText,
  hasStyle,
  isButton,
  isDate,
  isIcon,
  isNumber,
  toKupObj,
} from "../../utils/smeupObjectUtilities";
import {
  isColumnAutocomplete,
  isColumnCombobox,
  isColumnDisabled,
  isColumnFieldExtendsTextField,
} from "./columnToKupColumn";
import { parseBetweenBrackets } from "../../utils/regexUtilities";

import { FCellShapes } from "@sme.up/ketchup/dist/types/f-components/f-cell/f-cell-declarations";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";
import { toDate } from "../../../../utils/dateUtils";

/**
 * Convert cell structure to kup cell
 * @param cell
 * @returns Ketchup Cell
 */
export const cellToKupCell = (
  cell: Cell,
  column: Column | undefined,
  editableData: boolean,
  dSep: string,
  kupManager: KupManager,
): KupDataCell => {
  // create empty kup cell
  const kupCell: KupDataCell = {
    value: "",
  };
  if (!cell.smeupObject) {
    return kupCell;
  }
  if (isNumber(cell.smeupObject)) {
    kupCell.value = kupManager.math.formattedStringToNumberString(
      cell.smeupObject.codice,
      cell.smeupObject.parametro,
      dSep,
    );
  } else {
    kupCell.value = cell.smeupObject.testo
      ? cell.smeupObject.testo
      : cell.smeupObject.codice;
  }
  kupCell.obj = toKupObj(cell.smeupObject);
  kupCell.isEditable = editableData;

  if (editableData && column) {
    if (isColumnFieldExtendsTextField(column, cell.smeupObject)) {
      if (isColumnDisabled(column)) {
        if (!kupCell.data) {
          kupCell.data = {};
        }
        if (!kupCell.data.data) {
          kupCell.data.data = {};
        }
        if (!kupCell.data.data["kup-text-field"]) {
          kupCell.data.data["kup-text-field"] = {};
        }
        kupCell.data.data["kup-text-field"].disabled = isColumnDisabled(column);
        kupCell.data.data["kup-text-field"].hiddenCounter = true;
      }
      if (column.grp) {
        let gLun = parseBetweenBrackets("GLUN", column.grp);
        if (!gLun) {
          gLun = column.lun;
        }
        if (gLun) {
          if (gLun.indexOf(";") < 0) {
            gLun += ";0";
          }
          const gLuns = gLun.split(";");
          if (!kupCell.data) {
            kupCell.data = {};
          }
          if (!kupCell.data.data) {
            kupCell.data.data = {};
          }
          if (!kupCell.data.data["kup-text-field"]) {
            kupCell.data.data["kup-text-field"] = {};
          }
          kupCell.data.data["kup-text-field"].size = Number(gLuns[0]);
        }
      }
      if (column.lun) {
        let lun = column.lun;
        if (lun.indexOf(";") < 0) {
          lun += ";0";
        }
        const luns = lun.split(";");
        if (!kupCell.data) {
          kupCell.data = {};
        }
        if (!kupCell.data.data) {
          kupCell.data.data = {};
        }
        if (!kupCell.data.data["kup-text-field"]) {
          kupCell.data.data["kup-text-field"] = {};
        }
        if (isNumber(cell.smeupObject)) {
          if (luns[0]) {
            kupCell.data.data["kup-text-field"].integers = Number(luns[0]);
          }
          if (luns[1] && Number(luns[1]) > 0) {
            kupCell.data.data["kup-text-field"].decimals = Number(luns[1]);
          }
        } else {
          if (luns[0]) {
            kupCell.data.data["kup-text-field"].maxLength = Number(luns[0]);
          }
        }
      }
    } else {
      if (isColumnDisabled(column)) {
        if (!kupCell.data) {
          kupCell.data = {};
        }
        kupCell.data.disabled = isColumnDisabled(column);
        kupCell.data.hiddenCounter = true;
      }
      if (column.grp) {
        let gLun = parseBetweenBrackets("GLUN", column.grp);
        if (!gLun) {
          gLun = column.lun;
        }
        if (gLun) {
          if (gLun.indexOf(";") < 0) {
            gLun += ";0";
          }
          const gLuns = gLun.split(";");
          if (!kupCell.data) {
            kupCell.data = {};
          }
          kupCell.data.size = Number(gLuns[0]);
        }
      }
      if (column.lun) {
        let lun = column.lun;
        if (lun.indexOf(";") < 0) {
          lun += ";0";
        }
        const luns = lun.split(";");
        if (!kupCell.data) {
          kupCell.data = {};
        }
        if (isNumber(cell.smeupObject)) {
          if (luns[0]) {
            kupCell.data.integers = Number(luns[0]);
          }
          if (luns[1] && Number(luns[1]) > 0) {
            kupCell.data.decimals = Number(luns[1]);
          }
        } else {
          if (luns[0]) {
            kupCell.data.maxLength = Number(luns[0]);
          }
        }
      }
    }
  }

  if (isIcon(cell.smeupObject)) {
    // icon check
    if (hasIcon(cell.smeupObject.codice)) {
      const kupIcon = getIcon(cell.smeupObject.codice);
      if (kupIcon) {
        if (!kupCell.data) {
          kupCell.data = {};
        }
        kupCell.data.icon = kupIcon;
        kupCell.value = "";
      }
    }
    // style check
    if (hasStyle(cell.smeupObject.codice)) {
      const kupStyle = getStyle(cell.smeupObject.codice);
      if (kupStyle) {
        kupCell.style = JSON.parse(kupStyle);
      }
    }
  }

  // is button
  if (isButton(cell.smeupObject)) {
    // icon check
    const kupIcon = getSmeupObjectIcon(cell.smeupObject);
    if (kupIcon) {
      if (!kupCell.data) {
        kupCell.data = {};
      }
      kupCell.data.icon = kupIcon;
      kupCell.value = "";
    }
    if (hasIconText(cell.smeupObject.codice)) {
      const kupIconText = getIconText(cell.smeupObject.codice);
      if (kupIconText) {
        if (!kupCell.data) {
          kupCell.data = {};
        }
        kupCell.data.label = kupIconText;
        kupCell.value = kupIconText;
      }
    }
    return kupCell;
  }
  if (isDate(cell.smeupObject)) {
    kupCell.value = toDate(cell.smeupObject);
    return kupCell;
  }

  if (column && isColumnAutocomplete(column)) {
    kupCell.shape = "ACP" as FCellShapes;
    if (editableData) {
      if (!kupCell.data) {
        kupCell.data = {};
      }
      if (!kupCell.data.data) {
        kupCell.data.data = {};
      }
      if (!kupCell.data.data["kup-list"]) {
        kupCell.data.data["kup-list"] = {};
      }

      kupCell.data.displayMode = "both";
      kupCell.data.selectMode = "code";
      kupCell.data.serverHandledFilter = true;
      kupCell.data.allowInconsistentValues = true;
      kupCell.data.data["kup-list"].displayMode = "both";
    }
    return kupCell;
  }

  if (column && isColumnCombobox(column)) {
    kupCell.shape = "CMB" as FCellShapes;
    kupCell.pfk = column.pfk;
    kupCell.tfk = column.tfk;
    kupCell.sfk = column.sfk;
    if (!kupCell.data) {
      kupCell.data = {};
    }
    if (!kupCell.data.data) {
      kupCell.data.data = {};
    }
    if (!kupCell.data.data["kup-list"]) {
      kupCell.data.data["kup-list"] = {};
    }
    return kupCell;
  }

  return kupCell;
};
