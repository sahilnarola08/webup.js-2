import { fieldConverter } from "../../../../../../managers/converters-manager/converters/components/smeup/fld/fieldConverter";
import { createSingleTreeNode } from "../../../../assets/components/smeup/fld/backend-data";
import { createFieldDataAndConfig, createFieldOptions } from "./fieldUtils";
import { getKupManager } from "../../utils";

/**
 * Field converter test
 */
describe("Field converter", () => {
  /**
   * Field from SmeupTreeNode
   */
  it("Single treenode with no options.type to Textfield", () => {
    const backendData = createSingleTreeNode();
    const options = createFieldOptions();
    const expected = createFieldDataAndConfig();
    const converted = fieldConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });
});
