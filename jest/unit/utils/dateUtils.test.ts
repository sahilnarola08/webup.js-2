import { toDate, toSmeup } from "../../../utils/dateUtils";
import { SmeupObject } from "../../../managers/converters-manager/declarations/data-structures/smeupObject";

describe("dateUtils", () => {
  describe("toDate", () => {
    it.each([
      [{ parametro: "*YYMD", codice: "2002/11/23", tipo: "D8" }, "2002-11-23"],
      [{ parametro: "*YYMD", codice: "2002-11-23", tipo: "D8" }, "2002-11-23"],
      [{ parametro: "*YYMD", codice: "20021123", tipo: "D8" }, "2002-11-23"],
      [{ parametro: "*DMYY", codice: "23/11/2002", tipo: "D8" }, "2002-11-23"],
      [{ parametro: "*MDYY", codice: "11/23/2002", tipo: "D8" }, "2002-11-23"],
      [{ parametro: "*YMD", codice: "02/11/23", tipo: "D8" }, "2002-11-23"],
      [{ parametro: "*DMY", codice: "23/11/02", tipo: "D8" }, "2002-11-23"],
      [{ parametro: "*MDY", codice: "11/23/02", tipo: "D8" }, "2002-11-23"],
      [{ parametro: "", codice: "23/11/02", tipo: "D8" }, "2002-11-23"],
      [
        { parametro: "WRONG_FORMAT", codice: "23/11/2002", tipo: "D8" },
        "2002-11-23",
      ],
    ])(`converts %p to %p`, (input: SmeupObject, expected: string) => {
      const result = toDate(input);

      expect(result).toEqual(expected);
    });

    it.each([
      [{ parametro: "*YYMD", codice: "2002/11/23", tipo: "WRONG_TYPE" }],
      [{ parametro: "*MDYY", codice: "99/33/2002", tipo: "D8" }],
    ])("returns current date on error (%p)", (input: SmeupObject) => {
      const mockNow = "1937-01-22";
      jest.useFakeTimers().setSystemTime(new Date(mockNow));
      const actual = toDate(input);

      expect(actual).toEqual(mockNow);
    });
  });

  describe("toSmeup", () => {
    it.each([
      ["2002-11-23", { parametro: "*YYMD", tipo: "D8" }, "20021123"],
      ["2002-11-23", { parametro: "*DMYY", tipo: "D8" }, "23112002"],
      ["2002-11-23", { parametro: "*MDYY", tipo: "D8" }, "11232002"],
      ["2002-11-23", { parametro: "*YMD", tipo: "D8" }, "021123"],
      ["2002-11-23", { parametro: "*DMY", tipo: "D8" }, "231102"],
      ["2002-11-23", { parametro: "*MDY", tipo: "D8" }, "112302"],
    ])(
      `converts %p to %p`,
      (input: string, format: SmeupObject, expected: string) => {
        const result = toSmeup(input, format);

        expect(result).toEqual(expected);
      },
    );

    it.each([
      ["1998-07-29", { parametro: "*YYMD", tipo: "WRONG_TYPE" }],
      ["1998-07-29", { parametro: "WRONG_PAR", tipo: "D8" }],
      ["WRONG_DATE", { parametro: "*MDY", tipo: "D8" }],
    ])(
      "returns input date (%p) on error (wrong date/parametro/tipo) - %p",
      (input: string, format: SmeupObject) => {
        const actual = toSmeup(input, format);

        expect(actual).toEqual(input);
      },
    );
  });
});
