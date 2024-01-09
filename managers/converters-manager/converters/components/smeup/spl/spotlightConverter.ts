import { KupSpotlightComponent, SpotlightOptions } from "./spotlight";
import { Components } from "@sme.up/ketchup";
import { SmeupObjectArray } from "../../../../declarations/data-structures/smeupObjectArray";
import { Counter } from "../../../../utils/regexUtilities";
import { objectArrayToKupTreeNodeArray } from "../../../utilities/objectArrayToKupTreeNodeArray";

/**
 * SmeupObjects and Spotlight options to Spotlight data and config
 * @param options Spotlight options
 * @param backendData SmeupObject array
 * @returns Spotlight data and config
 */
export const spotlightConverter = (
  options: SpotlightOptions,
  backendData: SmeupObjectArray,
): Pick<KupSpotlightComponent, "data" | "config"> => {
  const counter: Counter = { nr: 0 };
  // convert SmeupObjectArray to TreeNode[]
  return {
    data: objectArrayToKupTreeNodeArray(backendData, options, counter),
    config: spotlightOptionsToTextFieldProps(options),
  };
};

/**
 * Create Kup Spotlight component
 * @param backendData
 * @param options
 * @returns Partial<Components.KupTextField>
 */
export const spotlightOptionsToTextFieldProps = (
  options: SpotlightOptions,
): Partial<Components.KupTextField> => {
  const kupTextField: Partial<Components.KupTextField> = {};

  /** traduzioni in lingua??? */
  kupTextField.label = "Esegui comando";
  if (options.Watermark) {
    kupTextField.label = options.Watermark;
  }
  kupTextField.icon = "magnify";
  // get other props
  return kupTextField;
};
