import {
  createSimpleTreeNode,
  createSimpleObjectArray,
} from "../../../../../assets/components/smeup/graphic-forms/rad/backend-data";
import { fieldConverter } from "../../../../../../../managers/converters-manager/converters/components/smeup/fld/fieldConverter";
import {
  createFirstRadioButtonDataAndConfig,
  createSimpleRadioButtonOptions,
} from "./radioButtonUtils";
import { getKupManager } from "../../../utils";

/**
 * Radio button converter test
 */
describe("Radio button converter", () => {
  /**
   * Radio button from SmeupTreeNode
   */
  it("Radio button from SmeupTreeNode", () => {
    const backendData = createSimpleTreeNode();
    const options = createSimpleRadioButtonOptions();
    const expected = createFirstRadioButtonDataAndConfig();
    const converted = fieldConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });

  /**
   * Radio button from SmeupObjectArray
   */
  it("Radio button from smeup object array", () => {
    const backendData = createSimpleObjectArray();
    const options = createSimpleRadioButtonOptions();
    const expected = createFirstRadioButtonDataAndConfig();
    const converted = fieldConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });
});
