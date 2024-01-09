export class ApplicationException extends Error {
  public message: string;
  public error: any;
  public fun?: string;
  constructor(message: string, error?: any, fun?: string) {
    super(message);
    this.message = message;
    this.error = error;
    this.fun = fun;
  }
}

export interface ApplicationExceptionForStore {
  message: string;
  error: Error;
  stack?: string;
  cause?: unknown;
  fun?: string;
}
