const AUTH_DEVICE: string = "P"; // Phone

enum ROUTES {
  HOME = "/home",
  LOGIN = "/login",
  ERROR = "/error",
}

enum APIS {
  LOGIN = "api/authentication",
  LOGOUT = "api/disconnection",
  FUN = "api/jfun",
}

const ClientConstants = {
  AUTH_DEVICE,
  ROUTES,
  APIS,
};

export default ClientConstants;
