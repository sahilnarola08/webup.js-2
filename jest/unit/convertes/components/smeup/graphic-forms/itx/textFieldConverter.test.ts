import {
  createSingleTreeNode,
  createSigleObjectArray,
} from "../../../../../assets/components/smeup/graphic-forms/itx/backend-data";
import { fieldConverter } from "../../../../../../../managers/converters-manager/converters/components/smeup/fld/fieldConverter";
import {
  createFirstTextFieldDataAndConfig,
  createFirstTextfieldOptions,
} from "./textfieldUtils";
import { getKupManager } from "../../../utils";

/**
 * Textfield converter test
 */
describe("Textfield converter", () => {
  /**
   * Textfield from SmeupTreeNode
   */
  it("Single treenode to textfield", () => {
    const backendData = createSingleTreeNode();
    const options = createFirstTextfieldOptions();
    const expected = createFirstTextFieldDataAndConfig();
    const converted = fieldConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });

  /**
   * Textfield from SmeupObjectArray
   */
  it("Textfield from smeup object array", () => {
    const backendData = createSigleObjectArray();
    const options = createFirstTextfieldOptions();
    const expected = createFirstTextFieldDataAndConfig();
    const converted = fieldConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });
});
