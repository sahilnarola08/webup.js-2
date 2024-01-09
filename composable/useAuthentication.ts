import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import ClientConstants from "../constants/client";
import GeneralConstant from "../constants/client";
import { AuthData, LoginResponseDTO } from "../declarations/authDeclarations";
import { handleErrorDuringLogin } from "../managers/errorManager";
import {
  setGlobalVariablesToStore,
  setSFunction,
} from "../store/reduces/components";
import CookieUtils from "../utils/cookieUtils";

/**
 * Use authentication is a composable function which
 * encapsulates all client authentication logic
 * @returns
 */
export function useAuthentication() {
  const dispatch = useDispatch();
  const router = useRouter();

  /**
   * login
   * @param authData
   */
  const login = async (authData: AuthData) => {
    try {
      // send http post to server
      const requestBody = new URLSearchParams({
        user: authData.user,
        pwd: authData.pwd,
        env: authData.env,
      });
      const response: AxiosResponse<LoginResponseDTO> = await axios.post(
        ClientConstants.APIS.LOGIN,
        requestBody,
      );
      // save jwt header and payload into local storage
      localStorage.setItem(
        "accessTokenHeaderAndPayload",
        response.data.accessToken.headerAndPayload,
      );

      // save auth data to cookie with expiration
      delete authData["pwd"];
      CookieUtils.setCookie(
        "authData",
        JSON.stringify(authData),
        response.data.accessToken.expiresIn,
      );

      // save init variables into local storage
      localStorage.setItem(
        "variables",
        JSON.stringify(response.data.variables),
      );

      //TODO: remove this function because variables are already registered into local storage
      // save variables to store
      dispatch(
        setGlobalVariablesToStore({ variables: response.data.variables }),
      );
      // save sFunction into store
      //TODO: Sfunction in URL instead of store
      dispatch(setSFunction());

      // redirect to main page
      router.push(GeneralConstant.ROUTES.HOME);
    } catch (error) {
      //TODO: create useError instead of error manager
      handleErrorDuringLogin(error, dispatch);
    }
  };

  /**
   * logout
   */
  const logout = async () => {
    // get jwt header and signature from local storage
    const jwtHeaderAndPayload = localStorage.getItem(
      "accessTokenHeaderAndPayload",
    );
    await axios.post(
      ClientConstants.APIS.LOGOUT,
      {},
      {
        headers: {
          "x-smeup-access-token": jwtHeaderAndPayload,
        },
      },
    );
    // remove authData cookie
    CookieUtils.deleteCookie("authData");
    // remove jwt header and signature from local storage
    localStorage.removeItem("accessTokenHeaderAndPayload");
    // redirect to login page
    router.push(GeneralConstant.ROUTES.LOGIN);
  };

  return {
    login,
    logout,
  };
}
