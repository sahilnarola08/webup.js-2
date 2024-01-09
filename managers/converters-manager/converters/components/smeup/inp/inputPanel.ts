import { KupDataDataset } from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import { YesNo } from "../../../../declarations/data-structures/general";
import { KupButtonListComponent } from "../btn/buttonList";
import {
  ComponentOptions,
  KupComponent,
} from "../../../../declarations/component";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Input Panel
 */
export interface KupInputPanelComponent extends KupComponent {
  options: InputPanelOptions;
  data: KupDataDataset;
  config: InputPanelConfig;
}

/**
 * Input Panel options
 */
export interface InputPanelOptions extends ComponentOptions {
  shape: Shapes.INP;
  toolbars?: Partial<KupButtonListComponent>;
  validations?: Map<string, string>;
  CharCounter?: YesNo;
  ConfirmLabel?: string;
  Layout?: string;
  Position?: string;
  SubmitButton?: YesNo;
  VKeyboardMode?: "user" | "auto";
}

/**
 * Input Panel config
 */
export interface InputPanelConfig {}
