import {
  createSimpleButton,
  createSimpleLayout,
  createSimpleTable,
} from "../../../../assets/components/smeup/inp/backend-data";
import {
  createCompleteInputPanel,
  createFirstInputPanelOptions,
} from "./inputPanelUtils";
import { inputPanelConverter } from "../../../../../../managers/converters-manager/converters/components/smeup/inp/inputPanelConverter";
import { getKupManager } from "../../utils";

/**
 * Input panel converter test
 */
describe("Input panel converter", () => {
  /**
   * Complete input panel from SmeupTable
   */
  it("Complete Input Panel from SmeupTable", () => {
    const backendData = createSimpleTable();
    const options = createFirstInputPanelOptions();
    const buttons = createSimpleButton();
    const layout = createSimpleLayout();
    const expected = createCompleteInputPanel();
    const converted = inputPanelConverter(
      options,
      backendData,
      buttons,
      layout,
      getKupManager(),
    );
    expect(expected).toEqual(converted);
  });
});
