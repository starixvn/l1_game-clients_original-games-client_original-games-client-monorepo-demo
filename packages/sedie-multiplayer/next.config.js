const path = require("path");
const gameSettings = require("./game-settings.json");
const configs = require("./configs.json");
const { v4: uuidv4 } = require("uuid");
const { withSentryConfig } = require("@sentry/nextjs");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

// Dynamic basePath will be handled by middleware
// We don't set basePath here to allow middleware to handle multiple sub-paths
const basePath = "";
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
    trailingSlash: true,
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
    assetPrefix: basePath || "/game-148",
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
    async rewrites() {
        return [
            // Handle desktop variant assets
            {
                source: "/game-148-d/_next/:path*",
                destination: "/_next/:path*",
            },
            // Handle mobile variant assets
            {
                source: "/game-148-m/_next/:path*",
                destination: "/_next/:path*",
            },
            // Handle tablet variant assets
            {
                source: "/game-148-t/_next/:path*",
                destination: "/_next/:path*",
            },
            // Handle default variant assets
            {
                source: "/game-148/_next/:path*",
                destination: "/_next/:path*",
            },
            // Handle other static assets for all variants
            {
                source: "/game-148-d/:path*",
                destination: "/:path*",
            },
            {
                source: "/game-148-m/:path*",
                destination: "/:path*",
            },
            {
                source: "/game-148-t/:path*",
                destination: "/:path*",
            },
            {
                source: "/game-148/:path*",
                destination: "/:path*",
            },
        ];
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
