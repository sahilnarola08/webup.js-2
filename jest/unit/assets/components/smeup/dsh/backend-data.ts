import { SmeupDataStructureType } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupDataStructure";
import { SmeupTable } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupTable";

export const createSimpleTable = (): SmeupTable => {
  return {
    columns: [
      {
        code: "COL1",
        grp: "GLUN(08)",
        lun: "08",
        canonicalForm: "",
        IO: "O",
        tooltip: false,
        text: "Icon",
        sortMode: "A",
        ogg: "",
      },
      {
        code: "COL2",
        grp: "GLUN(08)",
        lun: "08",
        canonicalForm: "",
        IO: "O",
        tooltip: false,
        text: "Um",
        sortMode: "A",
        ogg: "",
      },
      {
        code: "COL3",
        grp: "GLUN(08)",
        lun: "08",
        canonicalForm: "",
        IO: "O",
        tooltip: false,
        text: "Text",
        sortMode: "A",
        ogg: "",
      },
      {
        code: "COL4",
        grp: "GLUN(08)",
        lun: "08",
        canonicalForm: "",
        IO: "O",
        tooltip: false,
        text: "Value",
        sortMode: "A",
        ogg: "",
      },
      {
        code: "COL5",
        grp: "GLUN(08)",
        lun: "08",
        canonicalForm: "",
        IO: "O",
        tooltip: false,
        text: "Designed value",
        sortMode: "A",
        ogg: "",
      },
    ],
    rows: [
      {
        fields: {
          COL1: {
            name: "COL1",
            tooltip: false,
            smeupObject: {
              tipo: "",
              parametro: "",
              codice: "",
            },
          },
          COL2: {
            name: "COL2",
            tooltip: false,
            smeupObject: {
              tipo: "",
              parametro: "",
              codice: "",
            },
          },
          COL3: {
            name: "COL3",
            tooltip: false,
            smeupObject: {
              tipo: "",
              parametro: "",
              codice: "Text",
            },
          },
          COL4: {
            name: "COL4",
            tooltip: false,
            smeupObject: {
              tipo: "",
              parametro: "",
              codice: "50",
            },
          },
          COL5: {
            name: "COL5",
            tooltip: false,
            smeupObject: {
              tipo: "",
              parametro: "",
              codice: "Designed value",
            },
          },
        },
      },
    ],
    type: SmeupDataStructureType.SMEUP_TABLE,
  };
};

/**
 * Create table with one column and one row
 * @returns
 */
export const createOneColumnAndOneRowTable = (): SmeupTable => {
  return {
    columns: [
      {
        code: "COL1",
        grp: "GLUN(03;0)",
        lun: "03;0",
        canonicalForm: "NR;",
        IO: "O",
        tooltip: false,
        text: "Text",
        sortMode: "A",
        ogg: "NR",
      },
    ],
    rows: [
      {
        fields: {
          RowId: {
            name: "RowId",
            tooltip: false,
            smeupObject: {
              tipo: "NR",
              parametro: "",
              codice: "0",
            },
          },
          COL1: {
            name: "COL1",
            tooltip: false,
            smeupObject: {
              tipo: "NR",
              parametro: "",
              codice: "50",
            },
          },
          ID: {
            name: "ID",
            tooltip: false,
            smeupObject: {
              tipo: "NR",
              parametro: "",
              codice: "1",
            },
          },
        },
      },
    ],
    type: SmeupDataStructureType.SMEUP_TABLE,
  };
};
