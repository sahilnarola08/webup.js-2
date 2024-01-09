import { KupListNode } from "@sme.up/ketchup";
import {
  AuthData,
  LoginModuleData,
} from "../../../declarations/authDeclarations";
import { isGNutti } from "../../../utils/gnutti";
import { isLocal } from "../../../utils/local";

export const getLoginModules = (defaultLogo: string): LoginModuleData[] => {
  const modules: LoginModuleData[] = [];
  const lsModules = localStorage?.getItem("modules")?.split(";") ?? [];
  const lsHiddenModules =
    localStorage?.getItem("hiddenModules")?.split(";") ?? [];

  modules.push({
    id: "mod1",
    title: "Free User Login",
    status: "success",
    hidden: lsHiddenModules.includes("mod1") ?? false,
    active: false,
    logo: defaultLogo,
    authData: getAuthData("mod1"),
  });
  if (!isGNutti()) {
    modules.push({
      id: "demo",
      title: "Showcase",
      status: "info",
      hidden: lsHiddenModules.includes("demo") ?? false,
      active: false,
      logo: defaultLogo,
      authData: getAuthData("demo"),
    });
    modules.push({
      id: "mod3",
      title: "Ambiente Gestionale Sme.UP S.p.A.",
      status: "warning",
      hidden: lsHiddenModules.includes("mod3") ?? false,
      active: false,
      logo: defaultLogo,
      authData: getAuthData("mod3"),
    });
  }
  const url = new URL(window.location.href);
  const mod = url.searchParams.get("mod");
  if (mod) {
    const modObject = modules.find(m => m.id == mod);
    const modArray = [];
    if (modObject) {
      modArray.push(modObject);
    }
    return modArray;
  }
  return lsModules && lsModules.length
    ? orderLoginModules(modules, lsModules)
    : modules;
};

export const orderLoginModules = (input: LoginModuleData[], sort: string[]) => {
  return input.sort((a, b) => sort.indexOf(a.id) - sort.indexOf(b.id));
};

export const getLoginModulesListData = (
  modules: LoginModuleData[],
): KupListNode[] => {
  const listData: KupListNode[] = [];

  for (let i = 0; i < modules.length; i++) {
    const _module: LoginModuleData = modules[i];
    if (_module.hidden) {
      continue;
    }
    listData.push({
      id: _module.id,
      value: _module.title,
      title: _module.title,
    });
  }
  return listData;
};

const getAuthData = (moduleName: string): AuthData => {
  switch (moduleName) {
    case "mod1": {
      if (isGNutti()) {
        return { user: "IN3DS", pwd: "SD3NI258", env: "TSTGT" };
      } else if (isLocal()) {
        return { user: "pascar", pwd: "carpas18", env: "GES_DEMO" };
      }
      return null;
    }
    case "demo": {
      return { user: "SMEUP_S02", pwd: "n96rnqyo57", env: "P_WU3" };
    }
    default: {
      return null;
    }
  }
};

export const getActiveModule = (
  activeModuleId: string,
  modules: LoginModuleData[],
): LoginModuleData => {
  if (!activeModuleId) {
    return null;
  }
  return modules && modules.length > 0
    ? modules.find(m => m.id == activeModuleId)
    : null;
};
