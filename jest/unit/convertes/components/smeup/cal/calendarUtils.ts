import { Components } from "@sme.up/ketchup";
import {
  KupCalendarComponent,
  CalendarOptions,
} from "../../../../../../managers/converters-manager/converters/components/smeup/cal/calendar";
import { createKupCalendarData } from "../../../../assets/components/smeup/cal/kup-data";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Create fisrt calendar options
 */
export const createFirstCalendarOptions = (): CalendarOptions => {
  return {
    shape: Shapes.CAL,
    DatCol: "XXDAT1",
    TitCol: "XXDESC",
    dSep: ",",
  };
};

/**
 * Create first kup calendar config
 */
export const createFirstCalendarConfig =
  (): Partial<Components.KupCalendar> => {
    return {
      hideNavigation: false,
      currentDate: "2022-01-20",
    };
  };

/**
 * Create first calendar convertion result
 */
export const createFirstCalendarDataAndConfig = (): Pick<
  KupCalendarComponent,
  "data" | "config"
> => {
  return {
    data: createKupCalendarData(),
    config: createFirstCalendarConfig(),
  };
};
