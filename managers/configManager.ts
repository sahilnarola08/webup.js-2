import { ApplicationConfigData } from "../declarations/configDeclarations";
import { FileConfigDAO } from "./daos/fileConfigDAO";
import { IConfigDAO } from "./daos/configDAO";
import os from "os";
import { APP_BAR_COMPONENT } from "../constants/generic";

export const getConfig = async (): Promise<ApplicationConfigData> => {
  const url = getConfigURL();
  const configDAO = await getConfigDAO();
  const config = await configDAO.get(url);
  return config;
};

export const storeConfig = async (
  configToStore: ApplicationConfigData,
): Promise<void> => {
  const url = getConfigURL();
  const configDAO = await getConfigDAO();
  await configDAO.update(url, configToStore);
};

const getConfigDAO = async (): Promise<IConfigDAO> => {
  const url = getConfigURL();
  switch (url.protocol) {
    case "file:":
      var configDAO = new FileConfigDAO();
      await configDAO.createDefault(url);
      return configDAO;
    default:
      throw new Error(
        "Protocol " +
          url.protocol +
          " unsupported, please check configuration file",
      );
  }
};

const getConfigURL = (): URL => {
  var url = process.env.WEBUPJS_CONFIG_URL.trim();
  if (url === "") {
    return new URL(
      "",
      "file://" +
        os.homedir +
        "/etc" +
        process.env.WEBUPJS_APP_CONTEXT +
        "/config.json",
    );
  } else {
    return new URL("", url);
  }
};

export const getDefaultConfig = (): ApplicationConfigData => {
  return {
    backendUrl: "https://webuptest.smeup.com/openproxy",
    password64: Buffer.from("Passw0rd").toString("base64"),
    ui: {
      debug: false,
      header: {
        navBar: {
          enabled: true,
          appBarComponents: [
            APP_BAR_COMPONENT.DRAWER_BUTTON,
            APP_BAR_COMPONENT.BACK_BUTTON,
            APP_BAR_COMPONENT.RELOAD_BUTTON,
            APP_BAR_COMPONENT.SEARCH_BAR,
            APP_BAR_COMPONENT.DASHBOARD_MODE_BUTTON,
            APP_BAR_COMPONENT.DEBUG_BUTTON,
          ],
        },
      },
      layout: { isDashboard: false },
      login: {
        hiddenFields: { env: false, password: false, user: false },
      },
    },
  } as ApplicationConfigData;
};
