import { calendarConverter } from "../../../../../../managers/converters-manager/converters/components/smeup/cal/calendarConverter";
import {
  createFirstCalendarOptions,
  createFirstCalendarDataAndConfig,
} from "./calendarUtils";
import { createCalendarSmeupTable } from "../../../../assets/components/smeup/cal/backend-data";
import { getKupManager } from "../../utils";

/**
 * Calendar converter test
 */
describe("Calendar converter", () => {
  /**
   * Simple Calendar from SmeupTable
   */
  it("Simple Calendar from SmeupTable", () => {
    const backendData = createCalendarSmeupTable();
    const options = createFirstCalendarOptions();
    const expected = createFirstCalendarDataAndConfig();
    const converted = calendarConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });
});
