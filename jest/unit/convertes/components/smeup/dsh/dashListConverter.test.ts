import { dashListConverter } from "../../../../../../managers/converters-manager/converters/components/smeup/dsh/dashListConverter";
import {
  createFirstDashListOptions,
  createFirstDashListDataAndConfig,
  createSecondDashListOptions,
  createSecondDashListDataAndConfig,
} from "./dashListUtils";
import {
  createOneColumnAndOneRowTable,
  createSimpleTable,
} from "../../../../assets/components/smeup/dsh/backend-data";
import { getKupManager } from "../../utils";

/**
 * Dash list converter test
 */
describe("Dash list converter", () => {
  /**
   * Simple Dash list from SmeupTable
   */
  it("Simple Dash list from SmeupTable", () => {
    const backendData = createSimpleTable();
    const options = createFirstDashListOptions();
    const expected = createFirstDashListDataAndConfig();
    const converted = dashListConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });

  /**
   * Simple Dash list from SmeupTable with 1 column and 1 row
   */
  it("Simple Dash list from SmeupTable with 1 column and 1 row", () => {
    const backendData = createOneColumnAndOneRowTable();
    const options = createSecondDashListOptions();
    const expected = createSecondDashListDataAndConfig();
    const converted = dashListConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });
});
