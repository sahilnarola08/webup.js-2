import { ComponentEntity } from "../declarations/componentDeclarations";
import { ComponentOptions } from "../managers/converters-manager/declarations/component";
import {
  isButtonListOptions,
  isYes,
} from "../managers/converters-manager/utils/smeupDataStructuresUtilities";
import { getTitle } from "../utils/componentUtils";

export const getTitleTag = (component: ComponentEntity) => {
  const title = getTitle(component);
  if (title) {
    return <h1 id={component.id + "_title"}>{title}</h1>;
  }
  return null;
};

export const getClassNames = (options: ComponentOptions): string => {
  if (isButtonListOptions(options)) {
    if (isYes(options.FillSpace)) {
      return "kup-full-width";
    }
  }
  return "";
};
