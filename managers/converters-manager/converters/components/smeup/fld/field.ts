import { Shapes } from "../../../../../../declarations/componentDeclarations";
import {
  KupComponent,
  ComponentOptions,
} from "../../../../declarations/component";
import { Components, FRadioData } from "@sme.up/ketchup/";

/**
 * Field
 */
export interface KupFieldComponent extends KupComponent {
  /** data */
  data: any;
  /** props */
  config: any;
}

/**
 * Field options
 */
export interface FieldOptions extends ComponentOptions {
  shape: Shapes.FLD;
  Type?: string;
  DefaultValue?: string;
}

/**
 * Graphic shapes
 */
export enum FieldShapes {
  ITX = "itx",
  RAD = "rad",
  ACP = "acp",
  SRC = "src",
}

/**
 * KupFieldProps interface
 */
export interface KupFieldProps {
  fieldType: FieldShapes;
}

/**
 * ITX textfield
 */
export interface KupTextfieldComponent extends KupFieldComponent {
  config: Partial<Components.KupTextField>;
}

/**
 * RAD radio button
 */
export interface KupRadioComponent extends KupFieldComponent {
  data: FRadioData[];
  config: Partial<Components.KupRadio>;
}
