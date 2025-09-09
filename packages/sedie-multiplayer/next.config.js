const path = require("path");
const gameSettings = require("./game-settings.json");
const configs = require("./configs.json");
const { v4: uuidv4 } = require("uuid");
const { withSentryConfig } = require("@sentry/nextjs");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const buildVersion = new Date().getTime();

const createAppSettings = (config) => ({
  ...config,
  gameSettings,
});

const baseAppSettings = createAppSettings(configs);

const nextConfig = withSentryConfig({
  publicRuntimeConfig: baseAppSettings,
  productionBrowserSourceMaps: false,
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
    hideSourceMaps: true,
  },
  generateBuildId: async () => uuidv4(),
  experimental: { externalDir: true },
  transpilePackages: ["@shared/merged"],
  webpack: (config, options) => {
    config.devtool = false;
    config.resolve.alias = {
      ...config.resolve.alias,
      "@shared": path.resolve(__dirname, "../shared/src"),
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    buildVersion,
    REACT_APP_TOLGEE_API_URL: "https://tolgee.sabagame.com/",
    REACT_APP_TOLGEE_API_KEY:
      "tgpak_gvpw45brha2xg3btoztxeytunvudc5dbn5twqodtonztc",
  },
  output: "standalone",
});

module.exports = withBundleAnalyzer(nextConfig);
