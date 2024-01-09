import { Components, KupDataColumn } from "@sme.up/ketchup";
import {
  KupFormData,
  KupFormLabelPlacement,
  KupFormRow,
} from "@sme.up/ketchup/dist/types/components/kup-form/kup-form-declarations";
import { ButtonListOptions, KupButtonListComponent } from "../btn/buttonList";
import { KupInputPanelComponent, InputPanelOptions } from "./inputPanel";
import { YesNo } from "../../../../declarations/data-structures/general";
import { SmeupButtonArray } from "../../../../declarations/data-structures/smeupButtonsArray";
import {
  Column,
  Row,
} from "../../../../declarations/data-structures/smeupDataStructure";
import {
  SmeupInputPanel,
  SmeupInputPanelResponse,
} from "../../../../declarations/data-structures/smeupInputPanel";
import { SmeupLayout } from "../../../../declarations/data-structures/smeupLayout";
import { columnToKupColumn } from "../../../utilities/columnToKupColumn";
import { rowToKupFormRow } from "../../../utilities/rowToKupFormRow";
import { buttonListConverter } from "../btn/buttonListConverter";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";
import { isSmeupInputPanelResponse } from "../../../../utils/smeupDataStructuresUtilities";
import { SmeupTable } from "../../../../declarations/data-structures/smeupTable";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Smeup table and Input Panel options to Input Panel data and config
 * @param options Input Panel options
 * @param backendData SmeupTable
 * @param buttons Toolbar buttons
 * @param layout Layout
 * @param kupManager KupManager
 * @returns Input Panel data and config
 */
export const inputPanelConverter = (
  options: InputPanelOptions,
  backendData: SmeupInputPanel | SmeupInputPanelResponse,
  buttons: SmeupButtonArray,
  layout: SmeupLayout | undefined,
  kupManager: KupManager,
): Pick<KupInputPanelComponent, "data" | "config" | "options"> => {
  let backendData_local: SmeupInputPanel | SmeupTable =
    isSmeupInputPanelResponse(backendData)
      ? (backendData as SmeupInputPanelResponse).table
      : (backendData as SmeupInputPanel);
  const config = inputPanelOptionsToFormProps(options, backendData_local);
  options.toolbars = inputPanelToolbarsDataConverter(
    options,
    buttons,
    kupManager,
  );
  options.validations = inputPanelValidationsDataConverter(backendData_local);

  return {
    data: inputPanelDataConverter(
      backendData_local,
      layout,
      options,
      kupManager,
    ),
    config: config,
    options: options,
  };
};

/**
 * Convert smeup table to form data, for input panel
 * @param table
 * @returns
 */
export const inputPanelDataConverter = (
  table: SmeupInputPanel | SmeupTable,
  layout: SmeupLayout | undefined,
  options: InputPanelOptions,
  kupManager: KupManager,
) => {
  // create empty data
  const data: KupFormData = {
    columns: [],
    rows: [],
  };

  // set columns
  table.columns.forEach((column: Column) => {
    const kupColumn: KupDataColumn = columnToKupColumn(column);
    data.columns?.push(kupColumn);
  });

  //set rows
  table.rows.forEach((row: Row) => {
    const kupFormRow: KupFormRow = rowToKupFormRow(
      row,
      table.columns,
      layout,
      options,
      kupManager,
    );
    data.rows?.push(kupFormRow);
  });

  return data;
};

/**
 * Create Kup Form component, for input panel
 * @param options
 * @returns Partial<Components.KupBox>
 */
export const inputPanelOptionsToFormProps = (
  options: InputPanelOptions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _backendData: SmeupInputPanel | SmeupTable,
): Partial<Components.KupForm> => {
  const config: Partial<Components.KupForm> = {};

  let labelPosition = options.Position ? options.Position : undefined;
  if (labelPosition) {
    labelPosition = labelPosition.trim().toLowerCase();
    switch (labelPosition) {
      case "upinline":
      case "inline": {
        config.labelPlacement = "left" as KupFormLabelPlacement;
        break;
      }
      default: {
        config.labelPlacement = labelPosition as KupFormLabelPlacement;
        break;
      }
    }
  }

  // get other props
  return config;
};

export const inputPanelToolbarsDataConverter = (
  options: InputPanelOptions,
  buttons: SmeupButtonArray,
  kupManager: KupManager,
): Partial<KupButtonListComponent> => {
  const btnListOptions: ButtonListOptions = {
    shape: Shapes.BTN,
    Horiz: YesNo.Yes,
    ShowIcon: YesNo.Yes,
    ShowText: YesNo.Yes,
    dSep: options.dSep,
  };
  return buttonListConverter(btnListOptions, buttons, kupManager);
};

/**
 * Extract from smeup table client validation info, for input panel
 * @param table
 * @returns
 */
export const inputPanelValidationsDataConverter = (
  table: SmeupInputPanel | SmeupTable,
) => {
  const validations = new Map<string, string>();
  table.columns.forEach((column: Column) => {
    if (column.validation && column.validation.trim() != "") {
      validations.set(column.code, column.validation);
    }
  });
  return validations;
};
