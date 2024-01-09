import { FbkMessage } from "../../../../../../managers/converters-manager/converters/components/smeup/fbk/fbk";
import {
  MessageGravity,
  MessageMode,
} from "../../../../../../managers/converters-manager/declarations/data-structures/smeupDataStructure";

/**
 * Create Fbk messages
 * @returns
 */
export const createFbkMessages = (): FbkMessage[] => {
  return [
    {
      level: 1,
      text: "message 1",
      type: "",
      fullText: "full message 1",
      gravity: MessageGravity.INFO,
      mode: MessageMode.PN,
    },
    {
      level: 1,
      text: "message 2",
      type: "",
      fullText: "full message 2",
      gravity: MessageGravity.ERROR,
      mode: MessageMode.TN,
    },
  ];
};
