import https from "https";
import { AxiosRequestConfig } from "axios";
import { logInfo } from "./logger";

/**
 * Global axios request configs
 * @returns
 */
export const getGlobalRequestConfig = (): AxiosRequestConfig => {
  const requestConfig: AxiosRequestConfig = {
    headers: {},
  };
  /** server side */
  if (process.env.WEBUPJS_HTTPS_REJECT_UNAUTHORIZED == "false") {
    logInfo("RejectUnauthorized is disabled.", "axiosUtils.ts");
    requestConfig.httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
  }
  return requestConfig;
};
