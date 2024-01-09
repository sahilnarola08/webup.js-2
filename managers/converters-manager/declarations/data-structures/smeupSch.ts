import {
  GenericMap,
  GenericObject,
} from "@sme.up/ketchup/dist/types/types/GenericTypes";
import { YesNo } from "./general";
import { SmeupDataStructure } from "./smeupDataStructure";

/**
 * Smeup SCH (EXD)
 */
export interface SmeupSch extends SmeupDataStructure {
  /** main title */
  title: string;
  /** main layout */
  layout: "column" | "row";
  /** is loaded ? */
  loaded: boolean;
  /** loading fun */
  fun: string;
  /** sections */
  sections?: Section[];
  /** variables */
  variables?: Variable[];
  /** styles */
  styles?: SmeupStyle[];
}

/** Section */
export interface Section {
  /** id (Sxxxx) */
  id: string;
  /** dimension (% or px) */
  dim?: string;
  /** sections children */
  sections: Section[];
  /** components */
  components: SectionComponent[];
}

/** Section component */
export interface SectionComponent {
  /** id */
  id: string;
  /** title */
  tit: string;
  /** is loaded */
  loaded: boolean;
  /** data */
  data?: GeneralComponentData;
  /** dynamisms */
  dynamisms?: Dynamism[];
  /** options */
  options?: GenericObject;
}

export interface SmeupStyle {
  name: string;
  value: SmeupStyleOptions;
  transcodedValue?: GenericMap;
}

export interface SmeupStyleOptions {
  Align?: string;
  FontBold?: YesNo;
  FontItalic?: YesNo;
  FontName?: string;
  FontSize?: string;
  FontULine?: YesNo;
  FontUnder?: YesNo;
  FontColor?: string;
  BackColor?: string;
  Padding?: string;
}

/** General component data */
export interface GeneralComponentData {
  rows: [
    {
      type: string;
      parameters: string;
      code: string;
      exec?: Fun;
    },
  ];
}

/** FUN */
export interface Fun {
  /** data type returned */
  component: string;
  /** service name */
  service: string;
  /** method/function of the service */
  function: string;

  /** objects */
  obj1: FunObject;
  obj2: FunObject;
  obj3: FunObject;
  obj4: FunObject;
  obj5: FunObject;
  obj6: FunObject;
  obj7: FunObject;

  /** other parameters */
  P: string;
  INPUT: string;
}

/** Fun object 1(;;) */
export interface FunObject {
  t: string;
  p: string;
  k: string;
}

/** Dynamism */
export interface Dynamism {
  event: string;
  targets?: string[];
  exec?: string;
  variables?: Variable[];
}

/** Variable */
export interface Variable {
  type?: VariableTypes;
  name: string;
  value: string;
}

/**
 * Variables types
 */
export enum VariableTypes {
  SEC = "sec",
  SCH = "sch",
  LOO = "loo",
  SSC = "ssc",
}

export interface VariablesFromService {
  comExpressions: string[];
  looExpressions: string[];
  schExpressions: string[];
  sscExpressions: string[];
}
