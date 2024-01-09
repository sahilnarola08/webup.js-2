import { ApplicationException } from "./ApplicationException";

export class AuthenticationException extends ApplicationException {
  constructor(error) {
    super("Authentication exception", error);
  }
}
