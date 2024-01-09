import { createFirstFbkDataAndConfig } from "./fbkUtils";
import { createSmeupFbkData } from "../../../../assets/components/smeup/fbk/backend-data";
import { fbkConverter } from "../../../../../../managers/converters-manager/converters/components/smeup/fbk/fbkConverter";
import { getKupManager } from "../../utils";

/**
 * Fbk converter test
 */
describe("Fbk converter", () => {
  /**
   * Basic fbk
   */
  it("Simple Fbk from SmeupFbkData", () => {
    const backendData = createSmeupFbkData();
    const expected = createFirstFbkDataAndConfig();
    const converted = fbkConverter({}, backendData, getKupManager());
    expect(expected).toEqual(converted);
  });
});
