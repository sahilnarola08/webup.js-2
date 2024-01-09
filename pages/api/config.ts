import type { NextApiRequest, NextApiResponse } from "next";
import {
  AppBarComponentKeys,
  APP_BAR_COMPONENT,
} from "../../constants/generic";
import {
  ApplicationConfigData,
  UiConfiguration,
} from "../../declarations/configDeclarations";

export const checkPassword = (
  req: NextApiRequest,
  config: ApplicationConfigData,
) => {
  const password64 = req.headers["x-password-64"]
    ? req.headers["x-password-64"]
    : "";
  _checkPassword(config, password64 as string);
};

export class ConfigError extends Error {
  httpCode: number;

  constructor(m: string, httpCode: number) {
    super(m);
    this.httpCode = httpCode;
    Object.setPrototypeOf(this, ConfigError.prototype);
  }
}

export const validateConfig = (config: ApplicationConfigData): boolean => {
  let ret: boolean = true;
  if (config.backendUrl == null || config.backendUrl.trim() === "") {
    throw new ConfigError("Attribute backendUrl is missing or empty", 400);
  }
  if (config.password64 == null || config.password64.trim() === "") {
    throw new ConfigError("Attribute password64 is missing or empty", 400);
  }
  if (!config.ui) {
    config.ui = {
      debug: undefined,
      header: undefined,
      layout: undefined,
      login: undefined,
    };
    ret = false;
  }
  if (!createUpdateDefaultUiConfiguration(config.ui)) {
    ret = false;
  }
  return ret;
};

const createUpdateDefaultUiConfiguration = (ui: UiConfiguration): boolean => {
  let ret: boolean = true;
  if (!ui.header) {
    ui.header = { navBar: undefined };
    ret = false;
  }
  if (!ui.header.navBar) {
    ui.header.navBar = {
      enabled: undefined,
      appBarComponents: undefined,
      logo: undefined,
    };
    ret = false;
  }
  if (ui.header.navBar.enabled == undefined) {
    ui.header.navBar.enabled = true;
    ret = false;
  }
  if (!ui.header.navBar.appBarComponents) {
    ui.header.navBar.appBarComponents = [
      APP_BAR_COMPONENT.DRAWER_BUTTON as AppBarComponentKeys,
      APP_BAR_COMPONENT.BACK_BUTTON as AppBarComponentKeys,
      APP_BAR_COMPONENT.RELOAD_BUTTON as AppBarComponentKeys,
      APP_BAR_COMPONENT.SEARCH_BAR as AppBarComponentKeys,
      APP_BAR_COMPONENT.DASHBOARD_MODE_BUTTON as AppBarComponentKeys,
      APP_BAR_COMPONENT.DEBUG_BUTTON as AppBarComponentKeys,
    ];
    ret = false;
  }
  if (!ui.header.navBar.logo) {
    ui.header.navBar.logo = "NavBarLogo_white.png";
    ret = false;
  }
  if (!ui.layout) {
    ui.layout = { isDashboard: undefined, customCss: undefined };
    ret = false;
  }
  if (ui.layout.isDashboard == undefined) {
    ui.layout.isDashboard = false;
    ret = false;
  }
  if (ui.layout.customCss == null || ui.layout.customCss == undefined) {
    ui.layout.customCss = "";
    ret = false;
  }
  if (!ui.login) {
    ui.login = {
      hiddenFields: undefined,
      labels: undefined,
      defaultLogo: undefined,
    };
    ret = false;
  }
  if (!ui.login.hiddenFields) {
    ui.login.hiddenFields = { env: false, password: false, user: false };
    ret = false;
  }
  if (!ui.login.defaultLogo) {
    ui.login.defaultLogo = "DirectLogoFileName.png";
    ret = false;
  }
  if (!ui.login.labels) {
    ui.login.labels = {
      env: "Environment",
      password: "Password",
      user: "User",
    };
    ret = false;
  }
  return ret;
};

export const errorHandler = (res: NextApiResponse, e: Error) => {
  console.error(e);
  var httpCode = 500;
  if (e instanceof ConfigError) {
    httpCode = (e as ConfigError).httpCode;
  }
  res.status(httpCode).json({ message: e.message });
};

const _checkPassword = (config: ApplicationConfigData, password: string) => {
  if (password == null || password === "") {
    throw new ConfigError(
      "You must specify the password, encoding it in base64 in the x-password http header",
      400,
    );
  }
  if (config.password64 !== password) {
    throw new ConfigError("The password specified is not valid", 401);
  }
};
