import {
  MessageGravity,
  MessageMode,
} from "../../../../declarations/data-structures/smeupDataStructure";

/**
 * Fbk
 */
export interface FbkComponent {
  /** data */
  data: FbkData;
  /** config */
  config: FbkConfig;
}

/**
 * Fbk options
 */
export interface FbkOptions {}
/**
 * Fbk data
 */
export interface FbkData {
  messages: FbkMessage[];
}

/**
 * Fbk single message
 */
export interface FbkMessage {
  gravity: MessageGravity;
  text: string;
  fullText: string;
  level: number;
  type: string;
  mode: MessageMode;
}

/**
 * Fbk config
 */
export interface FbkConfig {}
