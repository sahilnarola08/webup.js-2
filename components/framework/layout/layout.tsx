import { useEffect } from "react";
import { KupDom } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";
import { logInfo } from "../../../utils/logger";

const Layout = ({ children }) => {
  useEffect(() => {
    logInfo("INITIALIZE THEME AND LOCALE", "layout.tsx", null, true);
    const dom: KupDom = document.documentElement as KupDom;
    if (!dom.ketchup) {
      dom.ketchupInit = {
        autoSetLocalization: true,
        theme: {
          name: "sapphire",
        },
      };
    }
  }, []);
  return children;
};

export default Layout;
