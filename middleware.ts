import { stackMiddlewares } from "./middlewares/factory";
import { sessionMiddleware } from "./middlewares/session";

// Declared middlewares
const middlewares = [sessionMiddleware];
// Export middleware stack
export default stackMiddlewares(middlewares);

export const config = {
  runtime: "experimental-edge",
  unstable_allowDynamic: [
    "/node_modules/@reduxjs/**",
    "/node_modules/immer/dist/immer.esm.mjs",
  ],
};
