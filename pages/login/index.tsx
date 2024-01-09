import { NextPage } from "next";
import LoginModule from "../../components/login/login-module";
import LoginModules from "../../components/login/login-modules";
import styles from "./index.module.scss";
import Ldng from "../../components/login/loading";
import Head from "next/head";
import LoginSnackbar from "../../components/login/login-snackbar";
import { getConfig } from "../../managers/configManager";
import { ApplicationConfigData } from "../../declarations/configDeclarations";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getLoginState } from "../../store/reduces/components";

interface LoginProps {
  config: ApplicationConfigData;
}

const Login: NextPage<LoginProps> = ({ config }) => {
  const { loading } = useSelector((state: RootState) => getLoginState(state));
  return (
    <>
      <Head>
        <title>Webup.js Sme.UP - Login</title>
      </Head>
      <>
        {loading ? (
          <Ldng />
        ) : (
          <div className={styles.wrapper}>
            <div className={styles.login}>
              <div className={styles.modules}>
                <div className={styles.modules__header}>
                  <LoginModules config={config} />
                  <LoginModule config={config} />
                </div>
              </div>
            </div>
          </div>
        )}
        <LoginSnackbar />
      </>
    </>
  );
};

/**
 * Server side props hook
 * Get config for render login fields
 * @returns
 */
export async function getServerSideProps() {
  const props: LoginProps = {
    config: await getConfig(),
  };
  return { props: props };
}

export default Login;
