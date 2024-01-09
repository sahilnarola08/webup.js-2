import { KupDom } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";

export default function useKupManager() {
  const dom: KupDom = document.documentElement as KupDom;
  return dom.ketchup;
}
