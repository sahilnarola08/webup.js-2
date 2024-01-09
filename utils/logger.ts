import { store } from "../store/store";
import { isDebug } from "../store/reduces/components";

type WebupLogType = "info" | "warning" | "error";

const INFO_LOG_STYLE =
  "background-color: black; color: white; border-radius: 4px; padding: 4px;";
const WARNING_LOG_STYLE =
  "background-color: black; color: #ffc15c; border-radius: 4px; padding: 4px;";
const ERROR_LOG_STYLE =
  "background-color: black; color: #ff5c5c; border-radius: 4px; padding: 4px;";

export function logFUN(
  message: string,
  member: string,
  args?: Array<unknown>,
  isError?: boolean,
  isDebugActive?: boolean,
) {
  logMessage(message, member, args, isError ? "error" : "info", isDebugActive);
}

export function logInfo(
  message: string,
  member: string,
  args?: Array<unknown>,
  isDebugActive?: boolean,
) {
  logMessage(message, member, args, "info", isDebugActive);
}

export function logWarning(
  message: string,
  member: string,
  args?: Array<unknown>,
  isDebugActive?: boolean,
) {
  logMessage(message, member, args, "warning", isDebugActive);
}

export function logError(
  message: string,
  member: string,
  args?: Array<unknown>,
  isDebugActive?: boolean,
) {
  logMessage(message, member, args, "error", isDebugActive);
}

export function logMessage(
  message: string,
  member: string,
  args?: Array<unknown>,
  type: WebupLogType = "info",
  isDebugActive?: boolean,
) {
  if (isDebugActive == null) {
    isDebugActive = isDebug(store.getState());
  }

  if (isDebugActive) {
    console.log(
      `${member ? member : ""} %c${message}`,
      type === "error"
        ? ERROR_LOG_STYLE
        : type === "warning"
        ? WARNING_LOG_STYLE
        : INFO_LOG_STYLE,
      args ? args : "",
    );
  }
}
