import { KupDataDataset } from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";

/**
 * SIMPLE KUP DATA TABLE mock
 */
export const createSimpleKupDataTable = (): KupDataDataset => {
  return {
    columns: [
      {
        name: "XXDAT1",
        obj: {
          k: "",
          p: "*YYMD",
          t: "D8",
        },
        title: "Data",
      },
      {
        name: "XXDESC",
        title: "Descrizione",
        visible: false,
      },
    ],
    rows: [
      {
        cells: {
          XXDAT1: {
            isEditable: false,
            obj: {
              k: "20220120",
              p: "*YYMD",
              t: "D8",
            },
            value: "2022-01-20",
          },
          XXDESC: {
            isEditable: false,
            obj: {
              k: "44",
              p: "",
              t: "",
            },
            value: "44",
          },
        },
        id: "1",
      },
      {
        cells: {
          XXDAT1: {
            isEditable: false,
            obj: {
              k: "20220121",
              p: "*YYMD",
              t: "D8",
            },
            value: "2022-01-21",
          },
          XXDESC: {
            isEditable: false,
            obj: {
              k: "43",
              p: "",
              t: "",
            },
            value: "43",
          },
        },
        id: "2",
      },
      {
        cells: {
          XXDAT1: {
            isEditable: false,
            obj: {
              k: "20220122",
              p: "*YYMD",
              t: "D8",
            },
            value: "2022-01-22",
          },
          XXDESC: {
            isEditable: false,
            obj: {
              k: "55",
              p: "",
              t: "",
            },
            value: "55",
          },
        },
        id: "3",
      },
    ],
  };
};
