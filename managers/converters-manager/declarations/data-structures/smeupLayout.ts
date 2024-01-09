import {
  SmeupDataStructure,
  SmeupDataStructureType,
} from "./smeupDataStructure";

export interface SmeupLayout extends SmeupDataStructure {
  fmts: Array<SmeupFormat>;
  type: SmeupDataStructureType.SMEUP_LAYOUT;
}

export interface SmeupFormat {
  attributes: { Txt: string; Nam: string };
  sections: Array<SmeupSection>;
}

export interface SmeupSection {
  attributes: {
    Dim?: string;
    LabelAlign?: string;
    LabelPosition?: string;
    LabelWidth?: string;
    Pos: string;
    Nam: string;
    Sty?: string;
    Txt?: string;
  };
  fields: Array<SmeupField>;
  sections: Array<SmeupSection>;
}

export interface SmeupField {
  attributes: {
    Cmp?: string;
    Ext?: string;
    Nam: string;
    Ogg?: string;
    Pfk?: string;
    Txt?: string;
    /** boxObject */
    Ori?: string;
    Fun?: string;
    Par?: string;
    Focus?: string;
  };
}

export interface SmeupFields {
  [index: string]: SmeupField;
}
