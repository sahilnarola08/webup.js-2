import { createSimpleTreeNode } from "../../../../assets/components/smeup/btn/backend-data";
import {
  createButtonWithIconOptions,
  createButtonWithIcon,
  createSimpleButtonListOptions,
  createSimpleButtonListDataAndConfig,
} from "./buttonListUtils";
import { buttonListConverter } from "../../../../../../managers/converters-manager/converters/components/smeup/btn/buttonListConverter";
import { getKupManager } from "../../utils";

/**
 * Button List converter test
 */
describe("Button List converter", () => {
  it("Simple button list from SmeupTreeNode", () => {
    const backendData = createSimpleTreeNode();
    const options = createSimpleButtonListOptions();
    const expected = createSimpleButtonListDataAndConfig();
    const converted = buttonListConverter(
      options,
      backendData,
      getKupManager(),
    );
    expect(expected).toEqual(converted);
  });

  it("Button list without icons, horizontal, flat", () => {
    const backendData = createSimpleTreeNode();
    const options = createButtonWithIconOptions();
    const expected = createButtonWithIcon();
    const converted = buttonListConverter(
      options,
      backendData,
      getKupManager(),
    );
    expect(expected).toEqual(converted);
  });
});
