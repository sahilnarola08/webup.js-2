import { ApplicationException } from "./ApplicationException";

export class FunException extends ApplicationException {
  constructor(error, fun?: string) {
    if (fun) {
      super(`Fun ${fun} exception`, error);
    } else {
      super("Fun exception", error);
    }
  }
}
