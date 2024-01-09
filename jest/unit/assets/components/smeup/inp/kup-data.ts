import { KupFormData } from "@sme.up/ketchup/dist/types/components/kup-form/kup-form-declarations";
import { KupDataDataset } from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import { KupButtonListComponent } from "../../../../../../managers/converters-manager/converters/components/smeup/btn/buttonList";

export const createSimpleKupInputPanel = (): KupFormData => {
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
            data: {
              data: {
                "kup-text-field": {
                  disabled: true,
                  hiddenCounter: true,
                  maxLength: 8,
                  size: 8,
                },
              },
            },
            isEditable: true,
            obj: {
              k: "20220120",
              p: "*YYMD",
              t: "D8",
            },
            value: "2022-01-20",
          },
          XXDESC: {
            data: {
              maxLength: 15,
              size: 15,
            },
            isEditable: true,
            obj: {
              k: "44",
              p: "",
              t: "",
            },
            value: "44",
          },
        },
        id: "1",
        layout: {
          sections: [],
        },
      },
      {
        cells: {
          XXDAT1: {
            data: {
              data: {
                "kup-text-field": {
                  disabled: true,
                  hiddenCounter: true,
                  maxLength: 8,
                  size: 8,
                },
              },
            },
            isEditable: true,
            obj: {
              k: "20220121",
              p: "*YYMD",
              t: "D8",
            },
            value: "2022-01-21",
          },
          XXDESC: {
            data: {
              maxLength: 15,
              size: 15,
            },
            isEditable: true,
            obj: {
              k: "43",
              p: "",
              t: "",
            },
            value: "43",
          },
        },
        id: "2",
        layout: {
          sections: [],
        },
      },
      {
        cells: {
          XXDAT1: {
            data: {
              data: {
                "kup-text-field": {
                  disabled: true,
                  hiddenCounter: true,
                  maxLength: 8,
                  size: 8,
                },
              },
            },
            isEditable: true,
            obj: {
              k: "20220122",
              p: "*YYMD",
              t: "D8",
            },
            value: "2022-01-22",
          },
          XXDESC: {
            data: {
              maxLength: 15,
              size: 15,
            },
            isEditable: true,
            obj: {
              k: "55",
              p: "",
              t: "",
            },
            value: "55",
          },
        },
        id: "3",
        layout: {
          sections: [],
        },
      },
    ],
  };
};

export const createSimpleButton = (): Partial<KupButtonListComponent> => {
  return {
    config: {},
    data: [
      {
        cells: {},
        children: [],
        disabled: false,
        expandable: false,
        obj: { t: "", p: "", k: "*ENTER" },
        value: "Enter",
        path: [0],
      },
    ],
  };
};

/**
 * Data table with buttons
 * @returns
 */
export const createKupDataTableWithButton = (): KupDataDataset => {
  return {
    columns: [
      {
        name: "BTN",
        obj: {
          k: "",
          p: "BTN",
          t: "J4",
        },
        title: "-",
      },
    ],
    rows: [
      {
        cells: {
          BTN: {
            obj: {
              k: "I(VO;COD_VER;000032)",
              p: "BTN",
              t: "J4",
            },
            data: {
              icon: "magnify",
            },
            value: "",
          },
        },
        id: "1",
      },
    ],
  };
};
