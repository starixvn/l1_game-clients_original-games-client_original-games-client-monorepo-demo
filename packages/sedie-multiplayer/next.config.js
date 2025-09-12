const path = require("path");
const gameSettings = require("./game-settings.json");
const configs = require("./configs.json");
const { v4: uuidv4 } = require("uuid");
const { withSentryConfig } = require("@sentry/nextjs");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

// Dynamic basePath will be set at runtime based on the request
const getBasePath = (gameId = '148') => `/game-${gameId}`;
const basePath = getBasePath(process.env.NEXT_PUBLIC_GAME_ID || '148');
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
            "@sedie-multiplayer": path.resolve(__dirname, "src"),
        };
        return config;
    },
    basePath,
    assetPrefix: basePath || undefined,
    async rewrites() {
        // Build remote origin for proxying API requests in dev/standalone
        const serverDomain = baseAppSettings?.serverDomainMapper?.["localhost"] || "lumigame.com";
        const proxyConf = baseAppSettings?.proxy || { ssl: true, subDomain: "l2-proxy1", path: "" };
        const protocol = proxyConf.ssl ? "https" : "http";
        const remoteOrigin = `${protocol}://${proxyConf.subDomain}.${serverDomain}`;
        const proxyPath = proxyConf.path || "";

        const base = [
            {
                source: "/health",
                destination: "/api/health",
            },
            // Proxy user/lobby service calls to remote to avoid CORS in standalone dev
            {
                source: "/user/:path*",
                destination: `${remoteOrigin}${proxyPath}/user/:path*`,
            },
            {
                source: "/lobby/:path*",
                destination: `${remoteOrigin}${proxyPath}/lobby/:path*`,
            },
        ];

        // Support dynamic gameId routing for any game-XXX path
        const dynamicGameIdRewrites = [
            // Handle _next assets for any gameId
            {
                source: '/game-:gameId/_next/:path*',
                destination: '/_next/:path*',
            },
            // Handle static assets for any gameId
            {
                source: '/game-:gameId/static/:path*',
                destination: '/static/:path*',
            },
            // Handle other assets (favicons, c.js, etc.) for any gameId
            {
                source: '/game-:gameId/:path*',
                destination: '/:path*',
            },
            // Handle root game path
            {
                source: '/game-:gameId',
                destination: '/',
            },
        ];
        return [...base, ...dynamicGameIdRewrites];
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
});

module.exports = withBundleAnalyzer(nextConfig);
