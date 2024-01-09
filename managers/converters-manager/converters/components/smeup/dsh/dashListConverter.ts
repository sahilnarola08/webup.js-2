import {
  KupDashListComponent,
  DashListOptions,
  COLUMN_NAMES,
  COLUMN_DESCRS,
} from "./dashList";
import { SmeupTable } from "../../../../declarations/data-structures/smeupTable";
import {
  Components,
  GenericObject,
} from "@sme.up/ketchup/dist/types/components";
import {
  KupDataColumn,
  KupDataDataset,
  KupDataRow,
  KupDataRowCells,
} from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import { KupObj, sortByRows } from "../../../../utils/smeupObjectUtilities";
import { getIconFromCode } from "../../../../services/iconService";
import {
  Cell,
  Column,
  ROW_KEY_NAME,
  Row,
  SmeupDataComponentFunc,
} from "../../../../declarations/data-structures/smeupDataStructure";
import { KupDataCell } from "../exb-mat/dataTable";
import { isNo, isYes } from "../../../../utils/smeupDataStructuresUtilities";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";
import {
  columnToKupColumn,
  findColumn,
} from "../../../utilities/columnToKupColumn";
import { SmeupObject } from "../../../../declarations/data-structures/smeupObject";
import { getRegExpFromString } from "../../../../utils/regexUtilities";
import { cellToKupCell } from "../../../utilities/cellToKupCell";
import {
  VariableAssignment,
  assignmentExecutorCompile,
} from "../../../../utils/variablesUtilities";
import { getColumnByName } from "../../../../utils/kupDataUtilities";

/**
 * Smeup table and Dash List options to Dash List data and config
 * @param options Dash List options
 * @param backendData SmeupTable
 * @param kupManager KupManager
 * @returns Dash List data and config
 */
export const dashListConverter = (
  options: DashListOptions,
  backendData: SmeupTable,
  kupManager: KupManager,
): Pick<KupDashListComponent, "data" | "config" | "style"> => {
  return {
    data: tableToKupDashListData(backendData, options, kupManager),
    config: dashListOptionsToDashListProps(options),
    style: styleForComponent(options, kupManager),
  };
};

/**
 * Create Kup Dash List component
 * @param options
 * @returns Partial<Components.KupDashList>
 */
export const dashListOptionsToDashListProps = (
  options: DashListOptions,
): Partial<Components.KupCardList> => {
  const config: Partial<Components.KupCardList> = {};

  if (options.Horizontal && isYes(options.Horizontal)) {
    config.horizontal = true;
  }

  if (options.Fillspace && isYes(options.Fillspace)) {
    config.fullWidth = true;
  }

  if (options.ColumnsNumber) {
    config.columnsNumber = options.ColumnsNumber;
  }

  config.iconCol = options.IconColName ? options.IconColName : COLUMN_NAMES.ICO;
  config.measureCol = options.UmColName ? options.UmColName : COLUMN_NAMES.UM;
  config.descrCol = options.TextColName
    ? options.TextColName
    : COLUMN_NAMES.TEXT;
  config.valueCol = options.ValueColName
    ? options.ValueColName
    : COLUMN_NAMES.VALUE;
  config.intvalueCol = COLUMN_NAMES.INTVAL;
  config.decvalueCol = COLUMN_NAMES.DECVAL;
  config.textcolorCol = COLUMN_NAMES.TEXTCOLOR;
  config.valuecolorCol = COLUMN_NAMES.VALUECOLOR;
  config.iconcolorCol = COLUMN_NAMES.ICOCOLOR;
  config.layoutCol = COLUMN_NAMES.LAYOUT;
  // get other props
  return config;
};

/**
 * Convert table structure to kup dash list data
 * @param table
 * @returns Ketchup DataTable
 */
export const tableToKupDashListData = (
  table: SmeupTable,
  options: DashListOptions,
  kupManager: KupManager,
): KupDataDataset => {
  // create empty table
  const dataTable: KupDataDataset = {
    columns: [],
    rows: [],
  };

  // create columns
  const columns: KupDataColumn[] = [];

  const icon: KupDataColumn = {
    name: COLUMN_NAMES.ICO,
    title: COLUMN_DESCRS.ICO,
    obj: {
      t: "J4",
      p: "ICO",
      k: "",
    },
  };
  columns.push(icon);

  const uM: KupDataColumn = {
    name: COLUMN_NAMES.UM,
    title: COLUMN_DESCRS.UM,
  };
  columns.push(uM);

  const text: KupDataColumn = {
    name: COLUMN_NAMES.TEXT,
    title: COLUMN_DESCRS.TEXT,
  };
  columns.push(text);

  const value: KupDataColumn = {
    name: COLUMN_NAMES.VALUE,
    title: COLUMN_DESCRS.VALUE,
    obj: {
      k: "",
      p: "",
      t: "NR",
    },
  };
  columns.push(value);

  const groupColumn: KupDataColumn = {
    name: COLUMN_NAMES.GROUP,
    title: COLUMN_DESCRS.GROUP,
  };
  columns.push(groupColumn);

  const intValue: KupDataColumn = {
    name: COLUMN_NAMES.INTVAL,
    title: COLUMN_DESCRS.INTVAL,
    obj: {
      k: "",
      p: "",
      t: "NR",
    },
  };
  columns.push(intValue);

  const decimalValue: KupDataColumn = {
    name: COLUMN_NAMES.DECVAL,
    title: COLUMN_DESCRS.DECVAL,
  };
  columns.push(decimalValue);

  const textColor: KupDataColumn = {
    name: COLUMN_NAMES.TEXTCOLOR,
    title: COLUMN_DESCRS.TEXTCOLOR,
  };
  columns.push(textColor);

  const valueColor: KupDataColumn = {
    name: COLUMN_NAMES.VALUECOLOR,
    title: COLUMN_DESCRS.VALUECOLOR,
  };
  columns.push(valueColor);

  const iconColor: KupDataColumn = {
    name: COLUMN_NAMES.ICOCOLOR,
    title: COLUMN_DESCRS.ICOCOLOR,
  };
  columns.push(iconColor);

  const layout: KupDataColumn = {
    name: COLUMN_NAMES.LAYOUT,
    title: COLUMN_DESCRS.LAYOUT,
  };
  columns.push(layout);

  const otherColumns: Column[] = [];
  for (let i = 0; i < table.columns.length; i++) {
    const column = table.columns[i];
    if (
      kupManager.data.column.find(columns, {
        name: column.code.trim().toUpperCase(),
      }).length == 0
    ) {
      columns.push(columnToKupColumn(column));
      otherColumns.push(column);
    }
  }

  const values = getValues(table, options, kupManager);
  const ums = getUms(table, options);
  const texts = getTexts(table, options);
  const icons = getIcons(table, options);
  const groups = getGroups(table, options);
  const intValues = getIntValues(values, options.dSep);
  const decValues = getDecValues(values, options.dSep);
  const textColors = getTextColors(values, options, kupManager);
  const valueColors = getValueColors(values, options, kupManager);
  const iconsColors = getIconColors(values, options, kupManager);
  const layouts = getLayouts(options);

  let size = values.length;
  if (ums.length > size) {
    size = ums.length;
  }
  if (texts.length > size) {
    size = texts.length;
  }
  if (icons.length > size) {
    size = icons.length;
  }
  if (groups.length > size) {
    size = groups.length;
  }
  if (intValues.length > size) {
    size = intValues.length;
  }
  if (decValues.length > size) {
    size = decValues.length;
  }

  // Create rows and cells
  const listRow: KupDataRow[] = [];

  for (let i = 0; i < size; i++) {
    const cells: KupDataRowCells = {};
    const row: KupDataRow = {
      cells: cells,
      readOnly: true,
    };

    createCell(i, COLUMN_NAMES.ICO, icons, cells, table, options, kupManager);
    createCell(i, COLUMN_NAMES.UM, ums, cells, table, options, kupManager);
    createCell(i, COLUMN_NAMES.TEXT, texts, cells, table, options, kupManager);
    createCell(
      i,
      COLUMN_NAMES.VALUE,
      values,
      cells,
      table,
      options,
      kupManager,
    );
    createCell(
      i,
      COLUMN_NAMES.GROUP,
      groups,
      cells,
      table,
      options,
      kupManager,
    );
    createCell(
      i,
      COLUMN_NAMES.INTVAL,
      intValues,
      cells,
      table,
      options,
      kupManager,
    );
    createCell(
      i,
      COLUMN_NAMES.DECVAL,
      decValues,
      cells,
      table,
      options,
      kupManager,
    );

    createCell(
      i,
      COLUMN_NAMES.TEXTCOLOR,
      textColors,
      cells,
      table,
      options,
      kupManager,
    );
    createCell(
      i,
      COLUMN_NAMES.VALUECOLOR,
      valueColors,
      cells,
      table,
      options,
      kupManager,
    );
    createCell(
      i,
      COLUMN_NAMES.ICOCOLOR,
      iconsColors,
      cells,
      table,
      options,
      kupManager,
    );
    createCell(
      i,
      COLUMN_NAMES.LAYOUT,
      layouts,
      cells,
      table,
      options,
      kupManager,
    );

    row.id = (i + 1).toString();
    row.readOnly = true;

    addOtherColumnsToRow(row, otherColumns, table.rows[i], options, kupManager);
    listRow.push(row);
  }
  dataTable.columns = columns;
  dataTable.rows = listRow;

  return dataTable;
};

const createCell = (
  index: number,
  cellName: string,
  list:
    | string[]
    | {
        icon: string;
        iconClass: string;
      }[],
  cells: KupDataRowCells,
  _table: SmeupTable,
  options: DashListOptions,
  kupManager: KupManager,
) => {
  const cellDto: KupDataCell = { value: "" };
  const obj: KupObj = { t: "", p: "", k: "" };

  /** TODO: prelevare dSep dalla SmeupTable (se c'è) - da gestire anche lato openProxy */
  // String dSep = table.getDecimalSeparator() != null ? table.getDecimalSeparator().trim() : null;
  // String tSep = table.getThousandSeparator() != null ? table.getThousandSeparator().trim() : null;
  const dSep = options.dSep;
  // const tSep = dSep == "," ? "." : ",";

  if (
    list &&
    list.length > 0 &&
    (index < list.length || cellName == COLUMN_NAMES.LAYOUT)
  ) {
    switch (cellName) {
      case COLUMN_NAMES.LAYOUT: {
        const layout = (index < list.length ? list[index] : list[0]) as string;
        cellDto.value = layout;
        obj.k = cellDto.value;
        break;
      }
      case COLUMN_NAMES.ICO: {
        let ico = list[index] as {
          icon: string;
          iconClass: string;
        };
        cellDto.value = ico.iconClass;
        obj.k = ico.icon;
        break;
      }
      case COLUMN_NAMES.VALUE:
      case COLUMN_NAMES.INTVAL: {
        let value = list[index] as string;
        let tipo = "NR";
        obj.t = tipo;
        obj.p = "";
        obj.k = value;
        if (!value) {
          value = "N/A";
          tipo = "";
          obj.t = tipo;
        }
        if (tipo == "NR") {
          value = kupManager.math.formattedStringToNumberString(
            value,
            "",
            dSep,
          );
        }
        cellDto.value = value;
        break;
      }
      default: {
        cellDto.value = list[index] as string;
        obj.k = cellDto.value;
        break;
      }
    }
  } else {
    cellDto.value = "";
    obj.k = cellDto.value;
  }

  cellDto.obj = obj;
  cells[cellName] = cellDto;
};

const addOtherColumnsToRow = (
  kupRow: KupDataRow,
  otherColumns: Column[],
  row: Row,
  options: DashListOptions,
  kupManager: KupManager,
) => {
  for (let i = 0; i < otherColumns.length; i++) {
    const column: Column = otherColumns[i];
    const cell: Cell = row.fields[column.code];

    kupRow.cells[column.code] = cellToKupCell(
      cell,
      column,
      false,
      options.dSep,
      kupManager,
    );
  }
};

enum Colors {
  RED = "#ff323f",
  GREEN = "#00b207",
  YELLOW = "#fe8a23",
}

const getRGB = (color: string): string => {
  // conversion will be done later, by component
  return color;
};

const getValues = (
  table: SmeupTable,
  options: DashListOptions,
  kupManager: KupManager,
): string[] => {
  let listVal: string[] = [];
  const list: string[] = [];
  orderMat(table, options, kupManager);

  if (options.ForceValue) {
    listVal = getValueByForcedValue(options.ForceValue, table, options);
  } else if (
    table &&
    table.rows &&
    table.rows.length > 0 &&
    options.ValueColName
  ) {
    listVal = getValueforDash(true, table, options, kupManager);
  } else if (
    table &&
    table.columns &&
    table.rows &&
    table.columns.length > 0 &&
    table.rows.length > 0
  ) {
    listVal = getValueforDash(false, table, options, kupManager);
  }

  if (listVal) {
    for (let i = 0; i < listVal.length; i++) {
      list.push(numberFormat(listVal[i], options, kupManager));
    }
  }
  return list;
};

const getIntValues = (valueV: string[], decSeparator: string): string[] => {
  const list: string[] = [];
  if (valueV && valueV.length > 0) {
    for (let i = 0; i < valueV.length; i++) {
      const value = valueV[i];
      const split = value.split(decSeparator);
      if (split.length > 1) {
        list.push(split[0]);
      } else {
        list.push(value);
      }
    }
  }
  return list;
};

const getDecValues = (valueV: string[], decSeparator: string): string[] => {
  const list: string[] = [];
  if (valueV && valueV.length > 0) {
    for (let i = 0; i < valueV.length; i++) {
      const value = valueV[i];
      const split = value.split(decSeparator);
      if (split.length > 1) {
        list.push(split[1]);
      } else {
        list.push("");
      }
    }
  }
  return list;
};

const getUms = (table: SmeupTable, options: DashListOptions): string[] => {
  // Forced value
  if (options.ForceUM) {
    return getValueByForcedValue(options.ForceUM, table, options);
  }
  if (table && table.rows && table.rows.length > 0 && options.UmColName) {
    return getValueByColumn(options.UmColName, table, options);
  }
  if (
    table &&
    table.columns &&
    table.rows &&
    table.columns.length > 1 &&
    table.rows.length > 0
  ) {
    return getValueByIndex(1, table, options);
  }
  return [];
};

const getTexts = (table: SmeupTable, options: DashListOptions): string[] => {
  // Forced value
  if (options.ForceText) {
    return getValueByForcedValue(options.ForceText, table, options);
  }
  if (table && table.rows && table.rows.length > 0 && options.TextColName) {
    return getValueByColumn(options.TextColName, table, options);
  }
  if (
    table &&
    table.columns &&
    table.rows &&
    table.columns.length > 2 &&
    table.rows.length > 0
  ) {
    return getValueByIndex(2, table, options);
  }
  return [];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getTextDecode = (
  table: SmeupTable,
  options: DashListOptions,
  texts: string[],
): string[] => {
  if (!options.DecodeText || isNo(options.DecodeText)) {
    return texts;
  }
  let obj: string = null;
  let column: string = null;

  if (
    table &&
    table.columns &&
    table.columns.length > 0 &&
    options.TextColName
  ) {
    column = options.TextColName;
    const col: Column = findColumn(column, table.columns);
    if (col) {
      obj = col.ogg;
    }
  } else if (
    table &&
    table.columns &&
    table.columns.length > 2 &&
    table.rows &&
    table.rows.length > 0
  ) {
    column = table.columns[2].code;
    obj = table.columns[2].ogg;
  }

  if (!obj || obj.startsWith("**") || obj.length < 3) {
    return texts;
  }

  let t: string = obj.substring(0, 2);
  let p: string = obj.substring(2);

  let smeupObjects: SmeupObject[] = [];

  for (let j = 0; j < texts.length; j++) {
    let text: string = texts[j];
    if (obj.indexOf("[") >= 0) {
      for (let i = 0; i < table.rows.length; i++) {
        const row: Row = table.rows[i];
        const cell: Cell = row.fields[column];
        if (text.toLowerCase() == cell.smeupObject.codice.toLowerCase()) {
          const cellsNames = Object.keys(row.fields);
          for (let l = 0; l < cellsNames.length; l++) {
            let k: string = cellsNames[l];
            let v: SmeupObject = row.fields[k].smeupObject;
            obj = obj.replace(
              getRegExpFromString("[" + k + "]", "g"),
              v.codice,
            );
          }
          t = obj.substring(0, 2);
          p = obj.substring(2);
        }
      }
    }
    smeupObjects.push({ tipo: t, parametro: p, codice: text });
  }

  /** richiamare fun per decodifica oggetti multipla FunHelper.MULTIPLE_DEC, che completa contenuto smeupObjects */

  const list: string[] = [];
  for (let i = 0; i < smeupObjects.length; i++) {
    const smeupObj: SmeupObject = smeupObjects[i];
    list.push(!smeupObj.testo ? smeupObj.codice : smeupObj.testo);
  }
  return list;
};

const getIcons = (
  table: SmeupTable,
  options: DashListOptions,
): { icon: string; iconClass: string }[] => {
  const convert = (icons: string[]): { icon: string; iconClass: string }[] => {
    const ret: { icon: string; iconClass: string }[] = [];
    for (let i = 0; i < icons.length; i++) {
      ret.push({
        icon: icons[i],
        iconClass: getOneIconClass(icons[i]),
      });
    }
    return ret;
  };
  if (options.ForceIcon) {
    return convert(getValueByForcedValue(options.ForceIcon, table, options));
  }
  if (table && table.rows && table.rows.length > 0 && options.IconColName) {
    return convert(getValueByColumn(options.IconColName, table, options));
  }
  if (
    table &&
    table.columns &&
    table.rows &&
    table.columns.length > 3 &&
    table.rows.length > 0
  ) {
    return convert(getValueByIndex(3, table, options));
  }
  return [];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getIconClass = (icons: string[]): string[] => {
  const list: string[] = [];

  for (let i = 0; i < icons.length; i++) {
    list.push(getOneIconClass(icons[i]));
  }
  return list;
};

const getOneIconClass = (icon: string): string => {
  return icon ? getIconFromCode(icon) : "";
};

const getGroups = (table: SmeupTable, options: DashListOptions): string[] => {
  if (table && table.rows && table.rows.length > 0 && options.GroupColName) {
    return getValueByColumn(options.GroupColName, table, options);
  }
  if (
    table &&
    table.columns &&
    table.rows &&
    table.columns.length > 4 &&
    table.rows.length > 0
  ) {
    return getValueByIndex(4, table, options);
  }
  return [];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getRowIndex = (table: SmeupTable, options: DashListOptions): string[] => {
  const list: string[] = [];

  let group: string = null;
  const map: { [key: string]: string } = {};
  for (let i = 0; i < table.rows.length; i++) {
    const record: Row = table.rows[i];
    if (options.GroupColName) {
      if (record.fields[options.GroupColName] != null) {
        group = record.fields[options.GroupColName].smeupObject?.codice;
      }
    }

    if (group == null) {
      list.push("0");
      return list;
    } else {
      if (!map[group]) {
        map[group] = record.fields[ROW_KEY_NAME].smeupObject?.codice;
      }
    }
  }

  Object.keys(map).forEach(key => {
    const value: string = map[key];
    if (value) {
      list.push(value);
    }
  });

  return list;
};

const orderMat = (
  table: SmeupTable,
  options: DashListOptions,
  kupManager: KupManager,
) => {
  if (options.GroupColName) {
    const newRows = sortByRows(table, [options.GroupColName], kupManager);
    table.rows = newRows;
  }
};

const getTextColors = (
  valuesV: string[],
  options: DashListOptions,
  kupManager: KupManager,
): string[] => {
  return getThresholdColor(valuesV, options.TextColor, options, kupManager);
};

const getIconColors = (
  valuesV: string[],
  options: DashListOptions,
  kupManager: KupManager,
): string[] => {
  return getThresholdColor(valuesV, options.IconColor, options, kupManager);
};

const getValueColors = (
  valuesV: string[],
  options: DashListOptions,
  kupManager: KupManager,
): string[] => {
  return getThresholdColor(valuesV, options.ValueColor, options, kupManager);
};

const getThresholdColor = (
  valuesV: string[],
  setupColor: string,
  options: DashListOptions,
  kupManager: KupManager,
): string[] => {
  const list = [];
  let colorList: string[] = null;
  let workList: string[] = null;

  // TODO: setupColor dovrebbe essere passato nel metodo di espansione variabili ???
  if (setupColor) {
    colorList = [];
    colorList.push("");
    colorList.push("");
    colorList.push("");
    workList = setupColor.split(";");

    if (workList && workList.length == 1) {
      colorList[0] = workList[0];
      colorList[1] = workList[0];
      colorList[2] = workList[0];
    }
    if (workList && workList.length == 2) {
      colorList[0] = workList[0];
      colorList[1] = workList[1];
      colorList[2] = workList[1];
    }
    if (workList && workList.length == 3) {
      colorList = workList;
    }
  }
  const isInv = options.Inv && isYes(options.Inv);
  if (valuesV) {
    for (let i = 0; i < valuesV.length; i++) {
      const value = valuesV[i];

      const thresh1 = options.Thresh1;
      const thresh2 = options.Thresh2;

      const t1 = Number(thresh1);
      const t2 = Number(thresh2);
      const v = Number(
        kupManager.math.formattedStringToNumberString(value, "", options.dSep), // => formato US
      );
      if (!colorList) {
        if (thresh1 && thresh2) {
          if (
            t1 &&
            t2 &&
            v &&
            !Number.isNaN(t1) &&
            !Number.isNaN(t2) &&
            !Number.isNaN(v)
          ) {
            if (v < t1) {
              list.push(isInv ? Colors.RED : Colors.GREEN);
            } else if (v > t2) {
              list.push(isInv ? Colors.GREEN : Colors.RED);
            } else {
              list.push(Colors.YELLOW);
            }
          }
        }
      } else if (thresh1 && thresh2 && colorList.length > 0) {
        let color1;
        let color2;
        let color3;
        switch (colorList.length) {
          case 1:
            list.push(getRGB(colorList[0]));
            break;
          case 2:
            color1 = getRGB(colorList[0]);
            color2 = getRGB(colorList[1]);
            if (v < t1) {
              list.push(isInv ? color1 : color2);
            } else if (v > t2) {
              list.push(isInv ? color2 : color1);
            } else {
              list.push(color2);
            }
            break;
          case 3:
            color1 = getRGB(colorList[0]);
            color2 = getRGB(colorList[1]);
            color3 = getRGB(colorList[2]);
            if (v < t1) {
              list.push(isInv ? color1 : color3);
            } else if (v > t2) {
              list.push(isInv ? color3 : color1);
            } else {
              list.push(color2);
            }
            break;
          default:
            list.push(isInv ? Colors.RED : Colors.GREEN);
            list.push(Colors.YELLOW);
            break;
        }
      } else if (!thresh1 && !thresh2) {
        list.push(getRGB(colorList[0]));
      }
    }
  }

  return list;
};

const getFontSize = (
  options: DashListOptions,
  kupManager: KupManager,
): GenericObject => {
  if (options.FontSize) {
    let fontSize = options.FontSize;
    if (
      kupManager.math.isStringNumber(fontSize, "") &&
      fontSize.indexOf("%") < 0
    ) {
      return { "--kup-card-scalable-static-font-size": fontSize + "px" };
    } else {
      return { "--kup-card-scalable-static-font-size": fontSize };
    }
  }
  return {};
};

const getLayouts = (options: DashListOptions): string[] => {
  const list: string[] = [];
  if (options.SelectLayout) {
    list.push(options.SelectLayout);
  } else {
    list.push("1");
  }
  return list;
};

const getValueforDash = (
  isColumn: boolean,
  table: SmeupTable,
  options: DashListOptions,
  kupManager: KupManager,
): string[] => {
  if (!table || !table.rows || table.rows.length == 0) {
    return null;
  }
  if (!isColumn) {
    return getValueByIndex(0, table, options);
  }
  const nameColValue = options.ValueColName ?? "";
  if (nameColValue) {
    const totals: VariableAssignment[] =
      assignmentExecutorCompile(nameColValue);
    if (totals.length == 0) {
      return getValueByColumn(options.ValueColName, table, options);
    }
    const list: string[] = getTotal(table, totals, options, kupManager);
    if (list.length == 0) {
      list.push("");
    }
    return list;
  }
  return null;
};

const numberFormat = (
  value: string,
  options: DashListOptions,
  kupManager: KupManager,
): string => {
  if (!value) {
    return value;
  }
  value = value.trim();
  if (value.endsWith("-")) {
    value = "-" + value.replace(/-/g, "");
  }
  if (options.NumberFormat) {
    let str, str2, valueV1;
    let intIndex, floatIndex;
    if (options.NumberFormat.indexOf(";") > 0) {
      const splitIndex = options.NumberFormat.split(";");
      if (splitIndex.length == 2) {
        intIndex = splitIndex[0];
        floatIndex = splitIndex[1];
      }
    } else {
      return value;
    }
    let valueInt, valueDec;
    if (
      kupManager.math.isStringNumber(intIndex, "") &&
      kupManager.math.isStringNumber(floatIndex, "")
    ) {
      valueInt = Number(intIndex);
      valueDec = Number(floatIndex);
    } else {
      return value;
    }

    const numberString = kupManager.math.formattedStringToNumberString(
      value,
      "",
      options.dSep,
    ); // => formato US

    if (numberString.indexOf(".") > 0) {
      let newIntValue = numberString.substring(0, numberString.indexOf("."));
      let decValue = numberString.substring(numberString.indexOf(".") + 1);
      str = newIntValue;
      if (newIntValue.length > valueInt) {
        str = newIntValue.substring(0, valueInt);
      }
      str2 = decValue;
      if (decValue && decValue.length > valueDec) {
        str2 = decValue.substring(0, valueDec);
      }
      if (floatIndex == "0") {
        valueV1 = str;
      } else {
        valueV1 = str + "." + str2;
      }
      value = valueV1;
    } else {
      value = numberString;
      if (value.length > valueInt) {
        str = value.substring(0, valueInt);
        value = str;
      }
    }
    return kupManager.math.numberStringToFormattedString(
      value,
      valueDec,
      "",
      options.dSep,
    );
  }
  return value;
};

const getTotal = (
  table: SmeupTable,
  totals: VariableAssignment[],
  options: DashListOptions,
  kupManager: KupManager,
): string[] => {
  let list: string[] = [];

  const totVal: VariableAssignment = totals[0];
  const column: string = totVal.variableValue;
  const func: string = totVal.variableName.trim().toUpperCase();

  if (!getColumnByName(column, table.columns)) {
    return list;
  }

  let group: string = "";
  const map: { [key: string]: string[] } = {};
  let listG: string[];

  if (options.GroupColName) {
    for (let i = 0; i < table.rows.length; i++) {
      const record: Row = table.rows[i];

      const cell: Cell = record.fields[options.GroupColName];
      if (cell) {
        group = cell.smeupObject?.codice;
      }
      if (!group) {
        return getTotalNoGroup(table, column, func, kupManager, options.dSep);
      } else {
        if (!map[group]) {
          listG = [];
          listG.push(record.fields[column].smeupObject.codice);
          map[group] = listG;
        } else {
          map[group].push(record.fields[column].smeupObject.codice);
        }
      }
    }

    Object.keys(map).forEach(key => {
      const values: string[] = map[key];
      if (values.length > 0) {
        list.push(getTotalVal(values, func, kupManager, options.dSep));
      }
    });
  } else {
    list = getTotalNoGroup(table, column, func, kupManager, options.dSep);
  }
  return list;
};

const getTotalNoGroup = (
  table: SmeupTable,
  column: string,
  func: string,
  kupManager: KupManager,
  decSeparator: string,
): string[] => {
  const list: string[] = [];
  const values: string[] = [];

  for (let i = 0; i < table.rows.length; i++) {
    const record: Row = table.rows[i];
    values.push(record.fields[column].smeupObject.codice);
  }

  list.push(getTotalVal(values, func, kupManager, decSeparator));
  return list;
};

const getTotalVal = (
  values: string[],
  func: string,
  kupManager: KupManager,
  decSeparator: string,
): string => {
  if (values) {
    let totalized: number = 0;

    switch (func) {
      case SmeupDataComponentFunc.AVERAGE: {
        for (let i = 0; i < values.length; i++) {
          let value = values[i];
          if (value.endsWith("-")) {
            value = "-" + value.replace(/-/g, "");
          }
          const numberString = kupManager.math.formattedStringToNumberString(
            value,
            "",
            decSeparator,
          );
          values[i] = numberString;
          totalized += kupManager.math.numberifySafe(numberString, false);
        }
        totalized = totalized / values.length;
        break;
      }
      case SmeupDataComponentFunc.COUNT: {
        totalized = values.length;
        break;
      }
      case SmeupDataComponentFunc.MIN: {
        for (let i = 0; i < values.length; i++) {
          let value = values[i];
          if (value.endsWith("-")) {
            value = "-" + value.replace(/-/g, "");
          }
          const numberString = kupManager.math.formattedStringToNumberString(
            value,
            "",
            decSeparator,
          );
          values[i] = numberString;
          let current = kupManager.math.numberifySafe(numberString, false);
          if (i == 0) {
            totalized = current;
          } else {
            if (current < totalized) {
              totalized = current;
            }
          }
        }
        break;
      }
      case SmeupDataComponentFunc.MAX: {
        for (let i = 0; i < values.length; i++) {
          let value = values[i];
          if (value.endsWith("-")) {
            value = "-" + value.replace(/-/g, "");
          }
          const numberString = kupManager.math.formattedStringToNumberString(
            value,
            "",
            decSeparator,
          );
          values[i] = numberString;
          let current = kupManager.math.numberifySafe(numberString, false);
          if (i == 0) {
            totalized = current;
          } else {
            if (current > totalized) {
              totalized = current;
            }
          }
        }
        break;
      }
      default: {
        for (let i = 0; i < values.length; i++) {
          let value = values[i];
          if (value.endsWith("-")) {
            value = "-" + value.replace(/-/g, "");
          }
          const numberString = kupManager.math.formattedStringToNumberString(
            value,
            "",
            decSeparator,
          );
          values[i] = numberString;
          totalized += kupManager.math.numberifySafe(numberString, false);
        }
        break;
      }
    }
    return kupManager.math.format(totalized, null, false);
    // return kupManager.math.numberStringToFormattedString(
    //   kupManager.math.numberToFormattedString(totalized, -1, ""),
    //   -1,
    //   "",
    //   decSeparator
    // );
  }
  return "";
};

const getValueByForcedValue = (
  optionValue: string,
  table: SmeupTable,
  options: DashListOptions,
): string[] => {
  const list: string[] = [];
  let group = "";

  const map: { [key: string]: string[] } = {};
  let listG: string[];

  for (let i = 0; i < table.rows.length; i++) {
    const record: Row = table.rows[i];
    if (options.GroupColName) {
      const cell: Cell = record.fields[options.GroupColName];
      if (cell) {
        group = cell.smeupObject?.codice;
      }
    }
    if (!group) {
      list.push(optionValue);
    } else {
      if (!map[group]) {
        listG = [];
        listG.push(optionValue);
        map[group] = listG;
      } else {
        map[group].push(optionValue);
      }
    }
  }

  Object.keys(map).forEach(key => {
    const values: string[] = map[key];
    if (values.length > 0) {
      list.push(values[0]);
    }
  });

  if (list.length == 0) {
    list.push(optionValue);
  }
  return list;
};

const getValueByColumn = (
  columnName: string,
  table: SmeupTable,
  options: DashListOptions,
): string[] => {
  const list: string[] = [];
  let column = columnName;

  let group = "";
  const map: { [key: string]: string[] } = {};
  let listG: string[];

  for (let i = 0; i < table.rows.length; i++) {
    const record: Row = table.rows[i];
    if (options.GroupColName) {
      const cell: Cell = record.fields[options.GroupColName];
      if (cell) {
        group = cell.smeupObject?.codice;
      }
    }
    if (!group) {
      if (record.fields[column]) {
        const ogg = findColumn(column, table.columns).ogg;
        if (ogg && ogg.indexOf("|") >= 0) {
          list.push(record.fields[column].smeupObject.testo);
        } else {
          list.push(record.fields[column].smeupObject.codice);
        }
      } else {
        list.push("");
      }
      return list;
    } else {
      if (!map[group]) {
        listG = [];
        if (record.fields[column]) {
          const ogg = findColumn(column, table.columns).ogg;
          if (ogg && ogg.indexOf("|") >= 0) {
            listG.push(record.fields[column].smeupObject.testo);
          } else {
            listG.push(record.fields[column].smeupObject.codice);
          }
        } else {
          listG.push("");
        }
        map[group] = listG;
      } else {
        listG = map[group];
        if (record.fields[column]) {
          const ogg = findColumn(column, table.columns).ogg;
          if (ogg && ogg.indexOf("|") >= 0) {
            listG.push(record.fields[column].smeupObject.testo);
          } else {
            listG.push(record.fields[column].smeupObject.codice);
          }
        } else {
          listG.push("");
        }
      }
    }
  }

  Object.keys(map).forEach(key => {
    const values: string[] = map[key];
    if (values.length > 0) {
      list.push(values[0]);
    }
  });

  if (list.length == 0) {
    list.push("");
  }
  return list;
};

const getValueByIndex = (
  index: number,
  table: SmeupTable,
  options: DashListOptions,
): string[] => {
  const list: string[] = [];
  let l: Cell[];

  let group = "";

  const map: { [key: string]: string[] } = {};
  let listG: string[];

  for (let i = 0; i < table.rows.length; i++) {
    const record: Row = table.rows[i];
    if (options.GroupColName) {
      const cell: Cell = record.fields[options.GroupColName];
      if (cell) {
        group = cell.smeupObject?.codice;
      }
    }
    l = [];
    for (let i = 0; i < table.columns.length; i++) {
      const columnCode = table.columns[i].code;
      l.push(record.fields[columnCode]);
    }

    if (!group) {
      list.push(l[index].smeupObject.codice);
      return list;
    } else {
      if (!map[group]) {
        listG = [];
        listG.push(l[index].smeupObject.codice);
        map[group] = listG;
      } else {
        listG = map[group];
        listG.push(l[index].smeupObject.codice);
      }
    }
  }

  Object.keys(map).forEach(key => {
    const values: string[] = map[key];
    if (values.length > 0) {
      list.push(values[0]);
    }
  });

  if (list.length == 0) {
    list.push("");
  }
  return list;
};

export const styleForComponent = (
  options: DashListOptions,
  kupManager: KupManager,
): GenericObject => {
  return getFontSize(options, kupManager);
};
