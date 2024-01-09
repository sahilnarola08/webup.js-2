import {
  createSingleNodeCNCOL,
  createSingleNodeJ1URL,
  createSigleObjectArrayCNCOL,
} from "../../../../assets/components/smeup/iml/backend-data";
import {
  createFirstImageListOptions,
  createImageListCNCOL,
  createImageListJ1URL,
} from "./imageListUtils";
import { imageListConverter } from "../../../../../../managers/converters-manager/converters/components/smeup/iml/imageListConverter";
import { getKupManager } from "../../utils";

/**
 * Image List converter test
 */
describe("Image List converter", () => {
  /**
   * Image list from SmeupTreeNode CNCOL
   */
  it("Image list from SmeupTreeNode CNCOL", () => {
    const backendData = createSingleNodeCNCOL();
    const options = createFirstImageListOptions();
    const expected = createImageListCNCOL();
    const converted = imageListConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });

  /**
   * Image list from smeup object array CNCOL
   */
  it("Image list from smeup object array CNCOL", () => {
    const backendData = createSigleObjectArrayCNCOL();
    const options = createFirstImageListOptions();
    const expected = createImageListCNCOL();
    const converted = imageListConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });

  /**
   * Complete image from SmeupTreeNode (J1;URL)
   */
  it("Complete image list from SmeupTreeNode J1URL", () => {
    const backendData = createSingleNodeJ1URL();
    const options = createFirstImageListOptions();
    const expected = createImageListJ1URL();
    const converted = imageListConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });
});
