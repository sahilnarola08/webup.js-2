import { Components, FRadioData } from "@sme.up/ketchup";
import {
  FieldOptions,
  FieldShapes,
  KupFieldProps,
} from "../../../../../../../managers/converters-manager/converters/components/smeup/fld/field";
import { Shapes } from "../../../../../../../declarations/componentDeclarations";

export const createSimpleRadioButtonOptions = (): FieldOptions => {
  return {
    shape: Shapes.FLD,
    Type: FieldShapes.RAD,
    dSep: ",",
  };
};

export const createFirstRadioButtonDataAndConfig = (): {
  data: FRadioData[];
  config: KupFieldProps & Partial<Components.KupRadio>;
} => {
  return {
    data: [
      {
        value: "BONMAI",
        label: "Bonardi Mattia",
        checked: false,
      },
      {
        value: "MACSTE",
        label: "Macconi Stefano",
        checked: false,
      },
    ],
    config: {
      fieldType: FieldShapes.RAD,
    },
  };
};
