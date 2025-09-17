// Function to load game-specific configurations
const loadGameConfigs = (gameId) => {
    // Load SeDie Multiplayer configurations (currently the only supported game)
    const configs = require("./packages/sedie-multiplayer/configs.json");
    const gameSettings = require("./packages/sedie-multiplayer/game-settings.json");

    return { configs, gameSettings };
};

const currentGameId = process.env.NEXT_PUBLIC_DEFAULT_GAME_ID || "148";
const { configs, gameSettings } = loadGameConfigs(currentGameId);
const { v4: uuidv4 } = require("uuid");
const { withSentryConfig } = require("@sentry/nextjs");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/game-148";

// Create a configuration that can be dynamically updated
const createAppSettings = (config, gameSettings) => ({
    ...config,
    gameSettings,
});

const baseAppSettings = createAppSettings(configs, gameSettings);
const buildVersion = process.env.BUILD_VERSION || "dev-build";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withSentryConfig({
    publicRuntimeConfig: baseAppSettings,
    productionBrowserSourceMaps: false,
    sentry: {
        disableServerWebpackPlugin: true,
        disableClientWebpackPlugin: true,
        hideSourceMaps: true,
    },
    generateBuildId: async () => uuidv4(),
    webpack: (config, options) => {
        // Disable source maps
        config.devtool = false;

        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            "@shared": require("path").resolve(__dirname, "packages/shared/src"),
            "@sedie-multiplayer": require("path").resolve(__dirname, "packages/sedie-multiplayer/src"),
        };

        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp3|webp)$/,
            use: {
                loader: "url-loader",
                options: {
                    limit: 100000,
                },
            },
        });

        return config;
    },
    basePath,
    assetPrefix: basePath || undefined,
    env: {
        buildVersion: String(buildVersion),
        REACT_APP_TOLGEE_API_URL: "https://tolgee.sabagame.com/",
        REACT_APP_TOLGEE_API_KEY: "tgpak_gvpw45brha2xg3btoztxeytunvudc5dbn5twqodtonztc",
    },
    sassOptions: {
        prependData: `$version-image: '${buildVersion}';`,
        includePaths: [require("path").resolve(__dirname, "packages/shared/src/styles")],
    },
    async headers() {
        return [
            {
                source: "/:all*(js|png|json|mp3|webp|svg|jpg|gif)",
                locale: false,
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, must-revalidate",
                    },
                ],
            },
        ];
    },
    output: "standalone",
});

module.exports = withBundleAnalyzer(nextConfig);
