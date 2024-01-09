import { Provider } from "react-redux";
import type { AppContext, AppProps } from "next/app";
import { store } from "../store/store";
import "../styles/globals.css";
import "@sme.up/gantt-component/dist/index.css";
import Layout from "../components/framework/layout/layout";
import { useEffect, useRef } from "react";
import CookieUtils from "../utils/cookieUtils";
import App from "next/app";
import { ApplicationConfigData } from "../declarations/configDeclarations";
import { getConfig } from "../managers/configManager";
import { setInitialValuesFromConfig } from "../store/reduces/fixedElements";
import { isDevelopmentEnv } from "../utils/local";
import Head from "next/head";
import { setResetDevice } from "../store/reduces/components";
import { logWarning } from "../utils/logger";

type WebupJsAppProps = Pick<AppProps, "Component" | "pageProps"> & {
  config: ApplicationConfigData;
};

const WebupJs = ({ Component, pageProps, config }: WebupJsAppProps) => {
  const firstCall = useRef(true);

  const customCssPath = config?.ui?.layout?.customCss
    ? "./assets/css/" + config.ui.layout.customCss
    : undefined;
  const customCss = customCssPath ? (
    <link type="text/css" rel="stylesheet" href={customCssPath} />
  ) : undefined;
  useEffect(() => {
    if (firstCall.current && isDevelopmentEnv()) {
      // work-around 2 useEffect in Development mode
      // see https://github.com/facebook/react/issues/24502
      logWarning(
        "firstCall && isDevelopmentEnv - work-around 2 useEffect()",
        "_app.tsx",
      );
      firstCall.current = false;
      return;
    }
    firstCall.current = false;

    store.dispatch(setResetDevice());
    store.dispatch(
      setInitialValuesFromConfig({
        config: config,
      }),
    );
    //TODO: remove when OpenProxy session is fixed
    window.onbeforeunload = function () {
      // remove authData cookie
      CookieUtils.deleteCookie("authData");
      // remove jwt header and signature from local storage
      localStorage.removeItem("accessTokenHeaderAndPayload");
    };
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"
        ></meta>
        <meta name="mobile-web-app-capable" content="yes"></meta>
        <link rel="icon" href="./assets/images/favicon.ico" />
        {customCss}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if (!window.globalThis) { console.log('_app.tsx manually set window.globalThis = window'); window.globalThis = window; }",
          }}
          type="text/javascript"
        />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
};

WebupJs.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context);
  return { ...ctx, config: await getConfig() };
};

export default WebupJs;
