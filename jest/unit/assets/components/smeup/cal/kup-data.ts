import {
  KupCalendarData,
  KupCalendarOptions,
} from "@sme.up/ketchup/dist/types/components/kup-calendar/kup-calendar-declarations";

/**
 * SIMPLE KUP CALENDAR TABLE mock
 */
export const createKupCalendarData = (): KupCalendarData => {
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
        calendarOption: "date" as KupCalendarOptions,
      },
      {
        name: "XXDESC",
        title: "Descrizione",
        calendarOption: "descr" as KupCalendarOptions,
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
