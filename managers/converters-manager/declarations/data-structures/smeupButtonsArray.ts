import {
  SmeupDataStructure,
  SmeupDataStructureType,
} from "./smeupDataStructure";

export interface SmeupButtonArray extends SmeupDataStructure {
  buttons: SmeupButton[];
  type: SmeupDataStructureType.SMEUP_BUTTONS;
}

export interface SmeupButton {
  event: string;
  id: string;
  title: string;
  position: "TL" | "TR" | "TL2" | "TR2" | "BL" | "BR" | "BL2" | "BR2";
  icon?: string;
}
