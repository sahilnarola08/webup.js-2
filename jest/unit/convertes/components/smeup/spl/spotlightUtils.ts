import { Components } from "@sme.up/ketchup";
import { Shapes } from "../../../../../../declarations/componentDeclarations";
import {
  KupSpotlightComponent,
  SpotlightOptions,
} from "../../../../../../managers/converters-manager/converters/components/smeup/spl/spotlight";
import { createEmptyKupTreeNode } from "../../../../assets/components/smeup/spl/kup-data";

export const createSimpleSpotlightOptions = (): SpotlightOptions => {
  return {
    shape: Shapes.SPL,
    dSep: ",",
  };
};

export const createSpotlightOptions = (): SpotlightOptions => {
  return {
    shape: Shapes.SPL,
    dSep: ",",
    Watermark: "Ricerca contestuale",
  };
};

export const createSimpleSpotlightConfig =
  (): Partial<Components.KupTextField> => {
    return {
      label: "Esegui comando",
      icon: "magnify",
    };
  };

export const createSpotlightConfig = (): Partial<Components.KupTextField> => {
  return {
    label: "Ricerca contestuale",
    icon: "magnify",
  };
};

export const createSimpleSpotlightDataAndConfig = (): Pick<
  KupSpotlightComponent,
  "data" | "config"
> => {
  return {
    data: createEmptyKupTreeNode(),
    config: createSimpleSpotlightConfig(),
  };
};

export const createSpotlightDataAndConfig = (): Pick<
  KupSpotlightComponent,
  "data" | "config"
> => {
  return {
    data: createEmptyKupTreeNode(),
    config: createSpotlightConfig(),
  };
};
