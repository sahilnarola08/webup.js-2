import type { NextApiRequest, NextApiResponse } from "next";
import { getConfig } from "../../../managers/configManager";
import { checkPassword, errorHandler } from "../config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method != "GET") {
    res.status(405).send("Accepted only method GET");
  } else {
    try {
      const config = await getConfig();
      checkPassword(req, config);
      res.status(200).json(config);
    } catch (e: any) {
      errorHandler(res, e);
    }
  }
}
