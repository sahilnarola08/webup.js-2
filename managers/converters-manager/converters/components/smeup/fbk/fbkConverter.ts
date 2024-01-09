import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";
import { FbkComponent, FbkData, FbkMessage, FbkOptions } from "./fbk";
import { SmeupFBKData } from "../../../../declarations/data-structures/smeupFBKData";
import { messageDataToFbkMessage } from "../../../utilities/messageDataToFbkMessage";
import { Message } from "../../../../declarations/data-structures/smeupDataStructure";

/**
 * Smeup fbk to FBK component data and config
 * @param _options Fbk options
 * @param backendData SmeupFbk
 * @param _kupManager KupManager
 * @returns Fbk data and config
 */
export const fbkConverter = (
  _options: FbkOptions,
  backendData: SmeupFBKData,
  _kupManager: KupManager,
): Pick<FbkComponent, "data" | "config"> => {
  const fbkData: FbkData = {
    messages: [],
  };
  backendData.messages.forEach((message: Message) => {
    const fbkMessage: FbkMessage = messageDataToFbkMessage(message);
    fbkData.messages.push(fbkMessage);
  });
  return {
    data: fbkData,
    config: {},
  };
};
