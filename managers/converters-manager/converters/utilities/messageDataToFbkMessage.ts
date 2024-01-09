import { FbkMessage } from "../components/smeup/fbk/fbk";
import { Message } from "../../declarations/data-structures/smeupDataStructure";

/**
 * Convert smeup message to fbk message
 * @param smeupMessage
 * @returns
 */
export const messageDataToFbkMessage = (smeupMessage: Message): FbkMessage => {
  const fbkMessage: FbkMessage = {
    gravity: smeupMessage.gravity,
    text: smeupMessage.message,
    fullText: smeupMessage.fullMessage,
    level: smeupMessage.livello,
    type: smeupMessage.tipo,
    mode: smeupMessage.mode,
  };

  return fbkMessage;
};
