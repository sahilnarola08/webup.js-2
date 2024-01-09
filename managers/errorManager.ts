import {
  ApplicationException,
  ApplicationExceptionForStore,
} from "../exceptions/ApplicationException";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { setError, setLoginError } from "../store/reduces/components";
import { AxiosError } from "axios";

export default function handleError(
  exception: ApplicationException | Error,
  dispatch: Dispatch<AnyAction>,
) {
  let excForStore: ApplicationExceptionForStore =
    toApplicationExceptionForStore(exception);
  dispatch(setError({ error: excForStore }));
}

export function handleErrorDuringLogin(
  exception: ApplicationException | Error,
  dispatch: Dispatch<AnyAction>,
) {
  let excForStore: ApplicationExceptionForStore =
    toApplicationExceptionForStore(exception);
  dispatch(setLoginError({ loginError: excForStore }));
}

const toApplicationExceptionForStore = (
  exception: ApplicationException | Error,
): ApplicationExceptionForStore => {
  if (exception instanceof AxiosError) {
    const e: AxiosError = exception;
    let message = (e.response?.data as any)?.message;
    if (!message) {
      message = e.message;
    }
    return {
      message: message,
      error: e,
      stack: e.stack,
      cause: e.cause,
    };
  }
  if (exception instanceof ApplicationException) {
    const e: ApplicationException = exception;
    return {
      message: e.message,
      error: e.error,
      stack: e.stack,
      cause: e.cause,
      fun: e.fun,
    };
  }
  return {
    message: exception.message,
    error: exception,
    stack: exception.stack,
    cause: exception.cause,
  };
};
