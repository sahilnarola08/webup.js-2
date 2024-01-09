import {
  createBoxListCustomLayoutDataAndConfig,
  createBoxListDataAndConfig,
  createBoxListDefaultLayoutDataAndConfig,
  createBoxListOptions,
  createCustomLayoutBoxListOptions,
  createSimpleBoxListDataAndConfig,
  createSimpleBoxListOptions,
} from "./boxListUtils";
import {
  createCustomLayoutSimpleTable,
  createSimpleLayout,
  createSimpleTable,
} from "../../../../assets/components/smeup/box/backend-data";
import { boxListConverter } from "../../../../../../managers/converters-manager/converters/components/smeup/box/boxListConverter";
import { getKupManager } from "../../utils";
import { YesNo } from "../../../../../../managers/converters-manager/declarations/data-structures/general";

/**
 * Box list converter test
 */
describe("Box list converter", () => {
  it("Simple Box list from SmeupTable", () => {
    const backendData = createSimpleTable();
    const options = createSimpleBoxListOptions();
    const expected = createSimpleBoxListDataAndConfig();
    const converted = boxListConverter(
      options,
      backendData,
      undefined,
      undefined,
      getKupManager(),
    );
    expect(expected).toEqual(converted);
  });

  it("Box list from SmeupTable, pagination, selectfirst and showselection", () => {
    const backendData = createSimpleTable();
    const options = createBoxListOptions(YesNo.Yes);
    const expected = createBoxListDataAndConfig(YesNo.Yes);
    const converted = boxListConverter(
      options,
      backendData,
      undefined,
      undefined,
      getKupManager(),
    );
    expect(expected).toEqual(converted);
  });

  it("Box list from SmeupTable, pagination, select item with index=2 and showselection", () => {
    const backendData = createSimpleTable();
    const options = createBoxListOptions(undefined, 2);
    const expected = createBoxListDataAndConfig(undefined, 2);
    const converted = boxListConverter(
      options,
      backendData,
      undefined,
      undefined,
      getKupManager(),
    );
    expect(expected).toEqual(converted);
  });

  it("Box list from SmeupTable, default layout with 1 column set (XXDESC)", () => {
    const backendData = createSimpleTable();
    const options = createBoxListOptions(undefined, undefined, "XXDESC");
    const expected = createBoxListDefaultLayoutDataAndConfig();
    const converted = boxListConverter(
      options,
      backendData,
      undefined,
      undefined,
      getKupManager(),
    );
    expect(expected).toEqual(converted);
  });
  /**
   * Simple Box list from SmeupTable, custom layout
   *  F(EXD;*SCO;) 1(;;) 2(MB;SCP_SCH;WETEST_BOX) 4(;;SEZ) 5(;;) 6(;;) P() INPUT()
   */
  it("Simple Box list from SmeupTable, custom layout", () => {
    const backendData = createCustomLayoutSimpleTable();
    const options = createCustomLayoutBoxListOptions();
    const layout = createSimpleLayout();
    const expected = createBoxListCustomLayoutDataAndConfig();
    const converted = boxListConverter(
      options,
      backendData,
      layout,
      undefined,
      getKupManager(),
    );
    expect(expected).toEqual(converted);
  });
});
