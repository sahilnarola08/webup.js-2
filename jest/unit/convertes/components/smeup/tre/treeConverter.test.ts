import {
  createSimpleTreeNode,
  createSimpleObjectArray,
  createNestedTreeNode,
} from "../../../../assets/components/smeup/tre/backend-data";
import {
  createFirstTreeDataAndConfig,
  createFirstTreeOptions,
} from "./treeUtils";
import { treeConverter } from "../../../../../../managers/converters-manager/converters/components/smeup/tre/treeConverter";
import { createNestedKupTreeNode } from "../../../../assets/components/smeup/tre/kup-data";
import { getKupManager } from "../../utils";

/**
 * Tree converter test
 */
describe("Tree converter", () => {
  /**
   * Simple tree from SmeupTreeNode
   */
  it("Simple tree from SmeupTreeNode", () => {
    const backendData = createSimpleTreeNode();
    const options = createFirstTreeOptions();
    const expected = createFirstTreeDataAndConfig();
    const converted = treeConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });

  /**
   * Simple tree from SmeupObjectArray
   */
  it("Simple tree from SmeupObjectArray", () => {
    const backendData = createSimpleObjectArray();
    const options = createFirstTreeOptions();
    const expected = createFirstTreeDataAndConfig();
    const converted = treeConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });

  /**
   * Nested tree from SmeupTreeNode
   */
  it("Nested tree from SmeupTreeNode", () => {
    const backendData = createNestedTreeNode();
    const options = createFirstTreeOptions();
    const expected = createNestedKupTreeNode();
    const converted = treeConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted.data);
  });
});
