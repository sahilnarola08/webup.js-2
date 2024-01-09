import type { NextApiRequest, NextApiResponse } from "next";
import { ApplicationConfigData } from "../../../declarations/configDeclarations";
import { getConfig, storeConfig } from "../../../managers/configManager";
import { checkPassword, errorHandler, validateConfig } from "../config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method != "POST") {
    res.status(405).send("Accepted only method POST");
  } else {
    try {
      const configToStore = req.body as ApplicationConfigData;
      validateConfig(configToStore);
      const configStored = await getConfig();
      checkPassword(req, configStored);
      storeConfig(configToStore);
      res.status(200).json({ message: "Operation executed successfully" });
    } catch (e: any) {
      errorHandler(res, e);
    }
  }
}
