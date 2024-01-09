import { createSimpleTable } from "../../../../assets/components/smeup/exb-mat/backend-data";
import {
  createFirstDataTableDataAndConfig,
  createFirstDataTableOptions,
} from "./dataTableUtils";
import { dataTableConverter } from "../../../../../../managers/converters-manager/converters/components/smeup/exb-mat/dataTableConverter";
import { getKupManager } from "../../utils";

/**
 * Data table converter test
 */
describe("Data table converter", () => {
  /**
   * Simple data table from SmeupTable
   */
  it("Simple Data Table from SmeupTable", () => {
    const backendData = createSimpleTable();
    const options = createFirstDataTableOptions();
    const expected = createFirstDataTableDataAndConfig();
    const converted = dataTableConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });
});
