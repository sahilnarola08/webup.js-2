import { ApplicationExceptionForStore } from "../exceptions/ApplicationException";
import { Fun, Loading } from "./componentDeclarations";

/**
 * Authentication body
 */
export type AuthData = {
  user?: string;
  pwd?: string;
  server?: string;
  env?: string;
  system?: string;
  debugMode?: boolean;
  authorization?: string;
};

export type Token = {
  headerAndPayload: string;
  /** Expiration Time UTC */
  expiresIn: string;
  /** Issued at Time UTC */
  issuedAt: string;
};

/**
 * Backend response on /authentication
 */
export type LoginResponseDTO = {
  accessToken: Token;
  refreshToken?: Token;
  variables: InitVariable[];
};

/**
 * Init variable
 */
export type InitVariable = {
  /** Variable name */
  cod: string;
  /** Variable value */
  value: string;
};

export type LoginInfo = {
  activeModule?: LoginModuleData;
  authUser?: AuthData;
  state: Loading;
  sFunction?: Fun;
  loginError?: ApplicationExceptionForStore;
};

export type LoginModuleData = {
  id: string;
  title: string;
  status: string;
  hidden: boolean;
  active: boolean;
  logo?: string;
  backendUrl?: string;
  authData?: AuthData;
};
