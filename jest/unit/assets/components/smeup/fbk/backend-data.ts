import {
  MessageGravity,
  MessageMode,
  SmeupDataStructureType,
} from "../../../../../../managers/converters-manager/declarations/data-structures/smeupDataStructure";
import { SmeupFBKData } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupFBKData";

/**
 * Create Fbk data
 * @returns
 */
export const createSmeupFbkData = (): SmeupFBKData => {
  return {
    type: SmeupDataStructureType.SMEUP_FBK_DATA,
    messages: [
      {
        livello: 1,
        message: "message 1",
        tipo: "",
        fullMessage: "full message 1",
        gravity: MessageGravity.INFO,
        mode: MessageMode.PN,
      },
      {
        livello: 1,
        message: "message 2",
        tipo: "",
        fullMessage: "full message 2",
        gravity: MessageGravity.ERROR,
        mode: MessageMode.TN,
      },
    ],
  };
};
