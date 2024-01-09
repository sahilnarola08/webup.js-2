import type { NextApiRequest, NextApiResponse } from "next";
import { getConfig } from "../../managers/configManager";
import { AuthenticationException } from "../../exceptions/AuthenticationException";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  InitVariable,
  LoginResponseDTO,
} from "../../declarations/authDeclarations";
import { getGlobalRequestConfig } from "../../utils/axiosUtils";
import { logError } from "../../utils/logger";

/**
 * Login API (/api/authentication)
 * - call backend authentication service
 * - get JWT token from response
 * - split token: header + payload & signature
 * - return header + payload as http header
 * - return signature as http only cookie
 * @param req
 * @param res
 */
export default async function authentication(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // send post to backend
    const requestBody = new URLSearchParams(req.body);
    // create request config
    const requestConfig: AxiosRequestConfig = getGlobalRequestConfig();
    requestConfig.headers["content-type"] = "application/x-www-form-urlencoded";
    const response: AxiosResponse<{
      variables: InitVariable[];
    }> = await axios.post(
      (await getConfig()).backendUrl + "/authentication",
      requestBody,
      requestConfig,
    );
    // get access token
    //TODO: remove authorization
    const accessToken = response.headers["x-smeup-access-token"]
      ? response.headers["x-smeup-access-token"]
      : response.headers["authorization"];
    if (!accessToken) {
      throw new AuthenticationException(
        "JWT token is missed from x-smeup-access-token header",
      );
    }
    const tokenSplitted = accessToken.replace("Bearer ", "").split(".");
    if (tokenSplitted.length != 3) {
      throw new AuthenticationException("Access token isn't a valid JWT token");
    }
    // get expiration date (exp is located into JWT payload)
    const { exp, iat }: { exp: number; iat: number } = JSON.parse(
      Buffer.from(tokenSplitted[1], "base64").toString("binary"),
    );
    const expiresIn = new Date(exp * 1000).toUTCString();
    const issuedAt = new Date(iat * 1000).toUTCString();
    const jwtHeaderAndPayload = tokenSplitted[0] + "." + tokenSplitted[1];
    const jwtSignature = tokenSplitted[2];
    // return jwt header and payload as header
    res.setHeader("x-smeup-access-token", jwtHeaderAndPayload);
    // return jwt signature as Cookie HttpOnly
    res.setHeader(
      "Set-Cookie",
      `accessTokenSignature=${jwtSignature}; HttpOnly; Expires='${expiresIn}'`,
    );
    // return response
    const loginResponse: LoginResponseDTO = {
      variables: response.data.variables,
      accessToken: {
        headerAndPayload: jwtHeaderAndPayload,
        expiresIn,
        issuedAt,
      },
    };
    res.status(200).json(loginResponse);
  } catch (error) {
    logError("authentication() ERROR", "authentication.ts", [error]);
    res.status(401).send("Unauthorized: " + error?.message);
  }
}
