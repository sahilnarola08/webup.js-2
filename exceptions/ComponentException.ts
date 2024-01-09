import { Shapes } from "../declarations/componentDeclarations";
import { ApplicationException } from "./ApplicationException";

export class ComponentException extends ApplicationException {
  constructor(error, componentType: Shapes, fun?: string) {
    if (componentType) {
      super(`Component ${componentType} exception`, error, fun);
    } else {
      super("Component exception", error, fun);
    }
  }
}
