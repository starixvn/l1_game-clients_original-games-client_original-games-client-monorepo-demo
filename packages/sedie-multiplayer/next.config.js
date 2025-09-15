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
    webpack: (config, { isServer }) => {
        config.devtool = false;
        config.resolve.alias = {
            ...config.resolve.alias,
            "@shared": path.resolve(__dirname, "../shared/src"),
            "@": path.resolve(__dirname, "src"),
            "@sedie-multiplayer": path.resolve(__dirname, "src"),
        };

        // Add rules for static assets (fonts, images, etc.)
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
    assetPrefix: basePath,
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
    async headers() {
        return [
            {
                source: "/:all*(js|png|json|mp3|webp|svg|jpg|gif|ttf|woff|woff2|eot)",
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
