import { ComponentOptions } from "../declarations/component";
import { TreeOptions } from "../converters/components/smeup/tre/tree";
import { SmeupObject } from "../declarations/data-structures/smeupObject";
import { SmeupSchObject } from "../declarations/data-structures/smeupObjectArray";
import {
  isButtonListOptions,
  isNo,
  isTreeOptions,
} from "./smeupDataStructuresUtilities";
import { KupObj } from "./smeupObjectUtilities";

export const nodeValue = (
  obj: KupObj,
  options: ComponentOptions,
  value: string,
): string => {
  if (isTreeOptions(options)) {
    switch (options.NodeText) {
      case "Code": {
        return obj?.k ? obj?.k : "";
      }
      case "Text": {
        return obj?.d ? obj?.d : "";
      }
      case "Both":
      default: {
        return (obj?.k ? obj?.k : "") + ": " + (obj?.d ? obj?.d : "");
      }
    }
  }
  return value;
};

export const smeupNodeValue = (
  obj: SmeupObject,
  options: ComponentOptions,
  value: string,
): string => {
  if (isTreeOptions(options)) {
    switch (options.NodeText) {
      case "Code": {
        return obj?.codice ?? "";
      }
      case "Text": {
        return obj?.testo ?? "";
      }
      case "Both":
      default: {
        if (!obj?.codice && !obj?.testo) {
          return "";
        }
        return (obj?.codice ?? "") + ": " + (obj?.testo ?? "");
      }
    }
  }
  if (isButtonListOptions(options)) {
    if (options.ShowText && isNo(options.ShowText)) {
      return null;
    }
  }
  return value;
};

export const smeupSchNodeValue = (
  obj: SmeupSchObject,
  options: ComponentOptions,
  value: string,
): string => {
  if (isTreeOptions(options)) {
    switch ((options as TreeOptions).NodeText) {
      case "Code": {
        return obj?.code ? obj?.code : "";
      }
      case "Text": {
        return obj?.value ? obj?.value : "";
      }
      case "Both":
      default: {
        if (!obj?.code && !obj?.value) {
          return "";
        }
        return (
          (obj?.code ? obj?.code : "") + ": " + (obj?.value ? obj?.value : "")
        );
      }
    }
  }
  if (isButtonListOptions(options)) {
    if (options.ShowText && isNo(options.ShowText)) {
      return null;
    }
  }
  return value;
};
