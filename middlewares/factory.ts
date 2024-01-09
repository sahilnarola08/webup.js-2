import { NextMiddleware, NextResponse } from "next/server";

/**
 * Middleware type.
 * const middleware: MiddlewareFactory = (next: NextMiddleware) => {}
 */
export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

/**
 * Utility function to stack middlewares
 * @param functions
 * @param index
 * @returns
 */
export function stackMiddlewares(
  functions: MiddlewareFactory[] = [],
  index = 0,
): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}
