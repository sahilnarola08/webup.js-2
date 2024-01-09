import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import ClientConstants from "../constants/client";
import { MiddlewareFactory } from "./factory";

const PROTECTED_ROUTES = [ClientConstants.ROUTES.HOME.toString()];

/**
 * Check user session for secured pages
 * @param middleware
 * @param requireAuth
 * @returns
 */
export const sessionMiddleware: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next);
    // check if route is secured and if auth cookie is present
    if (
      PROTECTED_ROUTES.includes(request.nextUrl.pathname) &&
      !request.cookies.has("authData")
    ) {
      // redirect to login page
      return NextResponse.redirect(new URL("login", request.url));
    } else {
      return res;
    }
  };
};
