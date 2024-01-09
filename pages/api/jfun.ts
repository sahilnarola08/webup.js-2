import axios, { AxiosRequestConfig } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getConfig } from "../../managers/configManager";
import { getGlobalRequestConfig } from "../../utils/axiosUtils";
import { logError } from "../../utils/logger";

/**
 * ExecuteFun API (/api/jfun)
 * - get JWT header and payload from x-smeup-access-token header
 * - get JWT signature from backend http cookie
 * - send http request
 * - return response
 * @param req
 * @param res
 */
export default async function jfun(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  // check accessTokenSignature http only cookie
  if (req.cookies.accessTokenSignature) {
    // get jwt header and signature
    const jwtHeaderAndPayload = req.headers["x-smeup-access-token"];
    // create backend request
    const requestBody = new URLSearchParams();
    requestBody.append("fun", req.body.fun);
    // create request config
    const requestConfig: AxiosRequestConfig = getGlobalRequestConfig();
    requestConfig.headers.authorization = `Bearer ${jwtHeaderAndPayload}.${req.cookies.accessTokenSignature}`;
    requestConfig.headers["content-type"] = "application/x-www-form-urlencoded";
    try {
      // sent request
      const response = await axios.post(
        (await getConfig()).backendUrl + "/jfun",
        requestBody,
        requestConfig,
      );
      // return data to client side
      res.send(response.data);
    } catch (error) {
      logError("jfun() error", "jfun.ts", [
        req.body.fun,
        error.response?.status ?? error,
        error.response?.data ?? null,
      ]);
      if (axios.isAxiosError(error) && error.response.status == 401) {
        //TODO: manage refresh token
        res.status(401).send("Unauthorized: " + error?.message);
      } else {
        res.status(500).send(error?.message);
      }
    }
  } else {
    //TODO: manage refresh token
    res.status(401).send("Session expired");
  }
}
