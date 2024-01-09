/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  sassOptions: {
    includePaths: ["/styles", "/styles/login"],
  },
  basePath: process.env.WEBUPJS_APP_CONTEXT,
  env: {
    isGnutti: process.env.WEBUPJS_IS_GNUTTI,
    isLocal: process.env.WEBUPJS_IS_LOCAL,
    pingSecondsInterval: process.env.WEBUPJS_PING_SECONDS_INTERVAL,
    timeoutSecondsInterval: process.env.WEBUPJS_AXIOS_REQUEST_TIMEOUT,
    isDevelopmentEnv:
      !process.env.NODE_ENV || process.env.NODE_ENV === "development",
    configUrl: process.env.WEBUPJS_CONFIG_URL,
  },
  redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
