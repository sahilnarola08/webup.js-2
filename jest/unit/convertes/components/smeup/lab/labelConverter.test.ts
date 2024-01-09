import { createSimpleTreeNode } from "../../../../assets/components/smeup/lab/backend-data";
import {
  createFirstLabelDataAndConfig,
  createFirstLabelOptions,
} from "./labelUtils";
import { labelConverter } from "../../../../../../managers/converters-manager/converters/components/smeup/lab/labelConverter";
import { getKupManager } from "../../utils";

/**
 * Label converter test
 */
describe("Label converter", () => {
  /**
   * Simple label from SmeupTreeNode
   */
  it("Simple label from SmeupTreeNode", () => {
    const backendData = createSimpleTreeNode();
    const options = createFirstLabelOptions();
    const expected = createFirstLabelDataAndConfig();
    const converted = labelConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });
});
