import type { NextPage } from "next";
import { ReactNode, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "../components/framework/drawer/drawer";
import NavBar from "../components/framework/navbar/navbar";
import Error from "../components/framework/error/error";
import { RootState, store } from "../store/store";
import styles from "./home.module.scss";
import {
  getError,
  getLastFunction,
  isBackAction,
  resetBackActionFlag,
} from "../store/reduces/components";
import { isDashboardMode } from "../store/reduces/fixedElements";
import { isNavBarEnabled } from "../store/reduces/fixedElements";
import { Fun } from "../declarations/componentDeclarations";
import Head from "next/head";
import Snackbar from "../components/framework/snackbar/snackbar";
import { createDynamism } from "../utils/dynamismUtils";
import executeDynamism from "../managers/dynamismManager";
import {
  DynamismEntity,
  DynamismEvents,
} from "../declarations/dynamismDeclarations";
import { ApplicationExceptionForStore } from "../exceptions/ApplicationException";
import View from "../components/framework/view/view";
import Dialog from "../components/framework/dialog/dialog";
import { getPingIntervalMs, ping } from "../managers/funManager";
import { isDevelopmentEnv } from "../utils/local";
import { getConfig } from "../managers/configManager";
import { ApplicationConfigData } from "../declarations/configDeclarations";
import { logWarning } from "../utils/logger";

interface HomeProps {
  config: ApplicationConfigData;
}

const Home: NextPage<HomeProps> = ({ config }) => {
  const lastFunction: Fun = useSelector((state: RootState) =>
    getLastFunction(state),
  );
  const dasboardUiMode: boolean = useSelector((state: RootState) =>
    isDashboardMode(state),
  );
  const dispatch = useDispatch();

  const errorFromState: ApplicationExceptionForStore = useSelector(
    (state: RootState) => getError(state),
  );

  const firstCall = useRef(true);

  useEffect(() => {
    const isBackActionFromStoreLocal = isBackAction(store.getState());

    // if (firstCall.current && config?.ui?.layout?.isDashboard) {
    //   dispatch(switchDashboardMode());
    // }

    if (firstCall.current && isDevelopmentEnv()) {
      // work-around 2 useEffect in Development mode
      // see https://github.com/facebook/react/issues/24502
      logWarning(
        "firstCall && isDevelopmentEnv - work-around 2 useEffect()",
        "home.tsx",
      );
    } else {
      dispatch(resetBackActionFlag());
      if (!errorFromState) {
        let funToExecute: Fun = null;
        if (lastFunction) {
          funToExecute = lastFunction;
        }
        if (funToExecute && !isBackActionFromStoreLocal) {
          const rawDynamism: DynamismEntity = {
            event: DynamismEvents.CLICK,
            exec: funToExecute.toString(),
          };
          const dynamism = createDynamism(rawDynamism);
          // execute
          executeDynamism(dynamism, dispatch);
        }
      }
      const timer = setInterval(ping, getPingIntervalMs());
      return () => clearInterval(timer);
    }
    firstCall.current = false;
    //TODO: remove ping service
    const timer = setInterval(ping, getPingIntervalMs());
    return () => clearInterval(timer);
  });

  let viewContent: ReactNode;
  if (errorFromState?.error) {
    viewContent = <Error />;
  } else {
    viewContent = <View></View>;
  }
  return (
    <>
      <Head>
        <title>Webup.js Sme.UP</title>
      </Head>
      <div
        className={`${styles.webup} ${
          isNavBarEnabled(store.getState()) ? styles.webup__has_navbar : ""
        } ${dasboardUiMode ? styles.webup__is_dashboard : ""}`}
      >
        {isNavBarEnabled(store.getState()) ? (
          <NavBar config={config.ui.header.navBar}></NavBar>
        ) : null}
        <div className={styles.content}>{viewContent}</div>
        <Drawer></Drawer>
        <Dialog></Dialog>
        <Snackbar></Snackbar>
      </div>
    </>
  );
};

/**
 * Server side props hook
 * Get config for render app bar components
 * @returns
 */
export async function getServerSideProps() {
  const props: HomeProps = {
    config: await getConfig(),
  };
  return { props: props };
}

export default Home;
