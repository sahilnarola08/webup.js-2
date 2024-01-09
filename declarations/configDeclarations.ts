import { AppBarComponentKeys } from "../constants/generic";
import { LoginModuleData } from "./authDeclarations";

export type ApplicationConfigData = {
  backendUrl: string;
  loginModules: LoginModuleData[];
  password64: string;
  ui: UiConfiguration;
};

/**
 * UI Confguration
 * Contains all the configurations of the
 * graphics part divided by sections
 */
export interface UiConfiguration {
  debug: boolean;
  header: HeaderConfiguration;
  layout: LayoutConfiguration;
  login: LoginConfiguration;
}

/**
 * UI Header Configuration
 */
export interface HeaderConfiguration {
  navBar: NavBarConfiguration;
}
/**
 * UI Layout Configuration
 */
export interface LayoutConfiguration {
  isDashboard: boolean;
  customCss: string;
}
/**
 * UI Login Configuration
 */
export interface LoginConfiguration {
  hiddenFields: LoginFields;
  labels: LoginLabels;
  defaultLogo: string;
}

/**
 * Alternative login labels
 */
export interface LoginLabels {
  env?: string;
  password?: string;
  user?: string;
}

/**
 * NavBar Configuration
 */
export interface NavBarConfiguration {
  enabled: boolean;
  appBarComponents: AppBarComponentKeys[];
  logo: string;
}

/**
 * Login fields Configuration
 */
export interface LoginFields {
  env: boolean;
  password: boolean;
  user: boolean;
}
