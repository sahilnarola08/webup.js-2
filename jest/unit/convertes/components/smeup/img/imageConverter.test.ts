import {
  createSingleNodeCNCOL,
  createSingleNodeJ1URL,
  createSingleNodeVOCOD_VER,
  createSigleObjectArrayCNCOL,
} from "../../../../assets/components/smeup/img/backend-data";
import {
  createFirstImageOptions,
  createImageCNCOL,
  createImageJ1URL,
  createImageVOCOD_VER,
} from "./imageUtils";
import { imageConverter } from "../../../../../../managers/converters-manager/converters/components/smeup/img/imageConverter";
import { getKupManager } from "../../utils";

/**
 * Image converter test
 */
describe("Image converter", () => {
  /**
   * Image from SmeupTreeNode
   */
  it("Image from SmeupTreeNode", () => {
    const backendData = createSingleNodeCNCOL();
    const options = createFirstImageOptions();
    const expected = createImageCNCOL();
    const converted = imageConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });

  /**
   * Image from SmeupObjectArray
   */
  it("Image from SmeupObjectArray", () => {
    const backendData = createSigleObjectArrayCNCOL();
    const options = createFirstImageOptions();
    const expected = createImageCNCOL();
    const converted = imageConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });

  /**
   * SmeupTreeNode and J1URL
   */
  it("SmeupTreeNode and J1URL", () => {
    const backendData = createSingleNodeJ1URL();
    const options = createFirstImageOptions();
    const expected = createImageJ1URL();
    const converted = imageConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });

  /**
   * SmeupTreeNode and VO;COD_VER
   */
  it("SmeupTreeNode and VO;COD_VER", () => {
    const backendData = createSingleNodeVOCOD_VER();
    const options = createFirstImageOptions();
    const expected = createImageVOCOD_VER();
    const converted = imageConverter(options, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });
});
