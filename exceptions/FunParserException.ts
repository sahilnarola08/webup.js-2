import { ApplicationException } from "./ApplicationException";

export class FunParserException extends ApplicationException {
  constructor(cause: string, fun: string) {
    super(`Exception when parsing ${fun} fun`, cause);
  }
}
