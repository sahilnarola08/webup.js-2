import { spotlightConverter } from "../../../../../../managers/converters-manager/converters/components/smeup/spl/spotlightConverter";
import { createEmptyObjectArray } from "../../../../assets/components/smeup/spl/backend-data";
import {
  createSimpleSpotlightDataAndConfig,
  createSimpleSpotlightOptions,
  createSpotlightDataAndConfig,
  createSpotlightOptions,
} from "./spotlightUtils";

/**
 * Spotlight converter test
 */
describe("Spotlight converter", () => {
  it("Simple spotlight", () => {
    const backendData = createEmptyObjectArray();
    const options = createSimpleSpotlightOptions();
    const expected = createSimpleSpotlightDataAndConfig();
    const converted = spotlightConverter(options, backendData);
    expect(expected).toEqual(converted);
  });

  it("Simple spotlight with setup", () => {
    const backendData = createEmptyObjectArray();
    const options = createSpotlightOptions();
    const expected = createSpotlightDataAndConfig();
    const converted = spotlightConverter(options, backendData);
    expect(expected).toEqual(converted);
  });
});
