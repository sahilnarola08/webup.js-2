import axios, { AxiosRequestConfig } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getConfig } from "../../managers/configManager";
import { getGlobalRequestConfig } from "../../utils/axiosUtils";

/**
 * Logout API (/api/disconnection)
 * - get JWT header and payload from x-smeup-access-token header
 * - get JWT signature from backend http cookie
 * - send http request
 * - return response
 * @param req
 * @param res
 */
export default async function disconnection(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  // check accessTokenSignature http only cookie
  if (req.cookies.accessTokenSignature) {
    // get jwt header and signature
    const jwtHeaderAndPayload = req.headers["x-smeup-access-token"];
    // create request config
    const requestConfig: AxiosRequestConfig = getGlobalRequestConfig();
    requestConfig.headers.authorization = `Bearer ${jwtHeaderAndPayload}.${req.cookies.accessTokenSignature}`;
    // send post to backend
    try {
      await axios.delete(
        (await getConfig()).backendUrl + "/disconnection",
        requestConfig,
      );
    } catch (error) {
      console.error("Error during disconnection", error.message);
    }
  }
  // delete http only cookie
  res.setHeader(
    "Set-Cookie",
    `accessTokenSignature=; HttpOnly; Expires='${new Date().toUTCString()}'`,
  );
  res.end();
}
