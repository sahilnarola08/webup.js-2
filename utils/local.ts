export const isLocal = () => {
  return process.env.isLocal == "true";
};

export const isDevelopmentEnv = () => {
  return process.env.isDevelopmentEnv;
};
