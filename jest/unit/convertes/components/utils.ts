import { newKupManager } from "@sme.up/ketchup/dist/index";
import { KupDatesLocales } from "@sme.up/ketchup/dist/types/managers/kup-dates/kup-dates-declarations";
import {
  KupDom,
  KupManager,
  KupManagerInitialization,
} from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";
import { KupMathLocales } from "@sme.up/ketchup/dist/types/managers/kup-math/kup-math-declarations";

export const getKupManager = (): KupManager => {
  const kmi: KupManagerInitialization = {
    autoSetLocalization: true,
    dates: { locale: "it" as KupDatesLocales },
    math: { locale: "it" as KupMathLocales },
    objects: {},
  };
  const km: KupManager = newKupManager(kmi);
  (document.documentElement as KupDom).ketchup = km;
  (document.documentElement as KupDom).ketchupInit = kmi;
  return km;
};
