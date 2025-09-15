const path = require("path");
const gameSettings = require("./game-settings.json");
const configs = require("./configs.json");
const { v4: uuidv4 } = require("uuid");
const { withSentryConfig } = require("@sentry/nextjs");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

// For standalone builds, we need to set basePath explicitly
// This ensures Next.js generates assets with the correct base path
const basePath = "/game-148";
const buildVersion = new Date().getTime();

const createAppSettings = (config) => ({
    ...config,
    gameSettings,
});

const baseAppSettings = createAppSettings(configs);

const nextConfig = {
    publicRuntimeConfig: baseAppSettings,
    productionBrowserSourceMaps: false,
    generateBuildId: async () => uuidv4(),
    experimental: { externalDir: true },
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
    basePath,
    assetPrefix: basePath || undefined,
    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
        const pathMap = {};
        const gamePath = basePath || "/";

        // Map the game route
        pathMap[gamePath] = { page: "/" };

        return pathMap;
    },
    env: {
        buildVersion: String(buildVersion),
        REACT_APP_TOLGEE_API_URL: "https://tolgee.sabagame.com/",
        REACT_APP_TOLGEE_API_KEY: "tgpak_gvpw45brha2xg3btoztxeytunvudc5dbn5twqodtonztc",
    },
    sassOptions: {
        prependData: `$version-image: '${buildVersion}'; $base-path: '${basePath}'; $asset-prefix: '${basePath}/';`,
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

module.exports = withSentryConfig(withBundleAnalyzer(nextConfig), sentryConfig);
