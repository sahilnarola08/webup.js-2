import { SmeupDataStructureType } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupDataStructure";
import { SmeupTable } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupTable";

export const createSimpleTable = (): SmeupTable => {
  return {
    columns: [
      {
        code: "XXDAT1",
        grp: "GLUN(08)",
        lun: "08",
        canonicalForm: "D8;*YYMD",
        IO: "O",
        tooltip: false,
        text: "Data",
        sortMode: "A",
        fill: "ASSE",
        ogg: "D8*YYMD",
      },
      {
        code: "XXDESC",
        grp: "GLUN(15)",
        lun: "15",
        IO: "H",
        tooltip: false,
        text: "Descrizione",
        sortMode: "A",
        fill: "SERIE",
        ogg: "",
      },
    ],
    messages: [],
    type: SmeupDataStructureType.SMEUP_TABLE,
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
          XXDESC: {
            name: "XXDESC",
            tooltip: false,
            smeupObject: {
              tipo: "",
              parametro: "",
              codice: "44",
            },
          },
          XXDAT1: {
            name: "XXDAT1",
            tooltip: false,
            smeupObject: {
              tipo: "D8",
              parametro: "*YYMD",
              codice: "20220120",
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
      {
        fields: {
          RowId: {
            name: "RowId",
            tooltip: false,
            smeupObject: {
              tipo: "NR",
              parametro: "",
              codice: "1",
            },
          },
          XXDESC: {
            name: "XXDESC",
            tooltip: false,
            smeupObject: {
              tipo: "",
              parametro: "",
              codice: "43",
            },
          },
          XXDAT1: {
            name: "XXDAT1",
            tooltip: false,
            smeupObject: {
              tipo: "D8",
              parametro: "*YYMD",
              codice: "20220121",
            },
          },
          ID: {
            name: "ID",
            tooltip: false,
            smeupObject: {
              tipo: "NR",
              parametro: "",
              codice: "2",
            },
          },
        },
      },
      {
        fields: {
          RowId: {
            name: "RowId",
            tooltip: false,
            smeupObject: {
              tipo: "NR",
              parametro: "",
              codice: "2",
            },
          },
          XXDESC: {
            name: "XXDESC",
            tooltip: false,
            smeupObject: {
              tipo: "",
              parametro: "",
              codice: "55",
            },
          },
          XXDAT1: {
            name: "XXDAT1",
            tooltip: false,
            smeupObject: {
              tipo: "D8",
              parametro: "*YYMD",
              codice: "20220122",
            },
          },
          ID: {
            name: "ID",
            tooltip: false,
            smeupObject: {
              tipo: "NR",
              parametro: "",
              codice: "3",
            },
          },
        },
      },
    ],
  };
};
