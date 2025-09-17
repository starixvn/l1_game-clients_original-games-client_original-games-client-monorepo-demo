const path = require("path");
const gameSettings = require("./game-settings.json");
const configs = require("./configs.json");
const { v4: uuidv4 } = require("uuid");
const { withSentryConfig } = require("@sentry/nextjs");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

// Centralized basePath configuration
const { BASE_PATH } = require("../shared/src/constants/base-path");
const basePath = BASE_PATH;
const buildVersion = new Date().getTime();

const createAppSettings = (config) => ({
    ...config,
    gameSettings,
});

const baseAppSettings = createAppSettings(configs);

const nextConfig = {
    publicRuntimeConfig: baseAppSettings,
    productionBrowserSourceMaps: false,
    pageExtensions: ["tsx", "ts", "jsx", "js"],
    generateBuildId: async () => uuidv4(),
    async rewrites() {
        return basePath
            ? [
                  {
                      source: `${basePath}/api/health`,
                      destination: "/health",
                  },
              ]
            : [];
    },
    experimental: {
        externalDir: true,
        serverComponentsExternalPackages: [],
        esmExternals: "loose",
    },
    images: {
        // Ensure image optimization works with custom basePath handling
        unoptimized: false,
        domains: [],
        // Allow images from any domain for flexibility
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    transpilePackages: ["@shared/merged"],
    webpack: (config, { isServer }) => {
        config.devtool = false;
        config.resolve.alias = {
            ...config.resolve.alias,
            "@shared": path.resolve(__dirname, "../shared/src"),
            "@": path.resolve(__dirname, "src"),
            "@sedie-multiplayer": path.resolve(__dirname, "src"),
        };
        return config;
    },
    basePath: "", // Handled by custom server
    assetPrefix: basePath,
    env: {
        buildVersion: String(buildVersion),
        REACT_APP_TOLGEE_API_URL: "https://tolgee.sabagame.com/",
        REACT_APP_TOLGEE_API_KEY: "tgpak_gvpw45brha2xg3btoztxeytunvudc5dbn5twqodtonztc",
    },
    sassOptions: {
        prependData: `$version-image: '${buildVersion}';`,
        includePaths: [path.resolve(__dirname, "../shared/src/styles"), path.resolve(__dirname, "../shared/src/components")],
        importer: function (url) {
            // Resolve SCSS imports that use the @shared alias
            if (typeof url === "string" && url.startsWith("@shared/")) {
                const resolved = path.resolve(__dirname, "../shared/src", url.replace(/^@shared\//, ""));
                return { file: resolved };
            }
            return null;
        },
    },
    output: "standalone",
};

const sentryConfig = {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
    hideSourceMaps: true,
};

module.exports = withBundleAnalyzer(withSentryConfig(nextConfig, sentryConfig));
