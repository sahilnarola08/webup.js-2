import { ApplicationConfigData } from "../../declarations/configDeclarations";

export interface IConfigDAO {
  get(config: URL): Promise<ApplicationConfigData>;
  update(config: URL, configData: ApplicationConfigData): Promise<void>;
}
