import { ApplicationConfigData } from "../../declarations/configDeclarations";
import { IConfigDAO } from "./configDAO";
import { promises as fs } from "fs";
import fileUtils from "fs";
import urlUtils from "url";
import pathUtils from "path";
import { getDefaultConfig } from "../configManager";
import { validateConfig } from "../../pages/api/config";
import { logInfo } from "../../utils/logger";

export class FileConfigDAO implements IConfigDAO {
  async get(config: URL): Promise<ApplicationConfigData> {
    const path = urlUtils.fileURLToPath(config.toString());
    const json = await fs.readFile(path, "utf-8");
    return JSON.parse(json);
  }
  async update(config: URL, configData: ApplicationConfigData): Promise<void> {
    const pathFile = urlUtils.fileURLToPath(config.toString());
    await fs.writeFile(pathFile, JSON.stringify(configData), "utf-8");
  }

  async createDefault(url: URL) {
    let config = getDefaultConfig();

    if (!fileUtils.existsSync(url)) {
      logInfo("create new configuration", "fileConfigDAO.ts", null, true);
      const path = urlUtils.fileURLToPath(url);
      var pathDir = pathUtils.dirname(path);
      if (!fileUtils.existsSync(pathDir)) {
        fileUtils.mkdirSync(pathDir, { recursive: true });
      }
      await this.update(url, config);
    } else {
      config = await this.get(url);
      if (!validateConfig(config)) {
        logInfo(
          "update existing configuration",
          "fileConfigDAO.ts",
          null,
          true,
        );
        await this.update(url, config);
      }
    }
  }
}
