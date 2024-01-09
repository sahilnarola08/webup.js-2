import { Components } from "@sme.up/ketchup";
import {
  FieldOptions,
  FieldShapes,
  KupFieldProps,
} from "../../../../../../../managers/converters-manager/converters/components/smeup/fld/field";
import { Shapes } from "../../../../../../../declarations/componentDeclarations";

export const createFirstTextfieldOptions = (): FieldOptions => {
  return {
    shape: Shapes.FLD,
    Type: FieldShapes.ITX,
    dSep: ",",
  };
};

export const createFirstTextFieldDataAndConfig = (): {
  data: {};
  config: KupFieldProps & Partial<Components.KupTextField>;
} => {
  return {
    data: {},
    config: {
      initialValue: "BONMAI",
      fieldType: FieldShapes.ITX,
    },
  };
};
