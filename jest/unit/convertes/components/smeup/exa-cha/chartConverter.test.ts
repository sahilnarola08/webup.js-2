import { chartConverter } from "../../../../../../managers/converters-manager/converters/components/smeup/exa-cha/chartConverter";
import {
  createFirstChartOptions,
  createFirstChartDataAndConfig,
} from "./chartUtils";
import { createSimpleTable } from "../../../../assets/components/smeup/exa-cha/backend-data";
import { getKupManager } from "../../utils";

/**
 * Chart converter test
 */
describe("Chart converter", () => {
  /**
   * Simple Chart from SmeupTable
   */
  it("Simple Chart from SmeupTable", () => {
    const backendData = createSimpleTable();
    const options = createFirstChartOptions();
    const expected = createFirstChartDataAndConfig();
    const converted = chartConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });
});
