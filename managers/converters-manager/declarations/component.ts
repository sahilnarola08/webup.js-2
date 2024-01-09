import { Shapes } from "../../../declarations/componentDeclarations";

export interface KupComponent {
  type: "kup";
  /** options */
  options: ComponentOptions;
}

/** General component options */
export interface ComponentOptions {
  shape: Shapes;
  Class?: string;
  HideObjFlt?: string;
  Refresh?: string;
  Load?: string;
  dSep: string;
}

/**
 * Is kup component function
 * @param kupComponent
 * @returns kup component is KupComponent
 */
export const isKupComponent = (
  kupComponent: any,
): kupComponent is KupComponent => {
  return "kup" in kupComponent.type;
};
