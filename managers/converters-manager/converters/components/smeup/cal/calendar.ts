import { Components } from "@sme.up/ketchup";
import { KupCalendarData } from "@sme.up/ketchup/dist/types/components/kup-calendar/kup-calendar-declarations";
import {
  KupComponent,
  ComponentOptions,
} from "../../../../declarations/component";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Calendar
 */
export interface KupCalendarComponent extends KupComponent {
  /** data */
  data: KupCalendarData;
  /** props */
  config: Partial<Components.KupCalendar>;
}

/**
 * Calendar options
 */
export interface CalendarOptions extends ComponentOptions {
  shape: Shapes.CAL;
  DatCol?: string;
  TitCol?: string;
}
