const { createServer } = require("http");
const { URL } = require("url");
const next = require("next");
const path = require("path");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = parseInt(process.env.PORT, 10) || 5000;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

console.log(`[SERVER] Starting with basePath: ${basePath}`);
console.log(`[SERVER] Environment: ${process.env.NODE_ENV}`);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const pathname = url.pathname;

            // Handle static assets - serve them from the public directory
            if (pathname.startsWith("/static/")) {
                const staticPath = pathname;
                const filePath = path.join(process.cwd(), "public", staticPath);

                // Check if file exists
                if (fs.existsSync(filePath)) {
                    const ext = path.extname(filePath);
                    const contentType = getContentType(ext);

                    res.setHeader("Content-Type", contentType);
                    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

                    const fileStream = fs.createReadStream(filePath);
                    fileStream.pipe(res);
                    return;
                }
            }

            // Redirect static assets without base path
            if (pathname.startsWith("/game-148/static/")) {
                const staticPath = pathname.replace("/game-148", "");
                const filePath = path.join(process.cwd(), "public", staticPath);

                // Check if file exists
                if (fs.existsSync(filePath)) {
                    const ext = path.extname(filePath);
                    const contentType = getContentType(ext);

                    res.setHeader("Content-Type", contentType);
                    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

                    const fileStream = fs.createReadStream(filePath);
                    fileStream.pipe(res);
                    return;
                }
            }

            // Handle Next.js chunks and assets
            if (pathname.startsWith("/_next/")) {
                const nextPath = pathname;
                let filePath;

                if (nextPath.startsWith("/_next/static/")) {
                    // Handle static chunks
                    const relativePath = nextPath.replace("/_next/static/", "");
                    filePath = path.join(process.cwd(), ".next", "static", relativePath);
                } else {
                    // Handle other _next paths
                    filePath = path.join(process.cwd(), ".next", nextPath.replace("/_next/", ""));
                }

                // Check if file exists
                if (fs.existsSync(filePath)) {
                    const ext = path.extname(filePath);
                    const contentType = getContentType(ext);

                    res.setHeader("Content-Type", contentType);
                    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

                    const fileStream = fs.createReadStream(filePath);
                    fileStream.pipe(res);
                    return;
                }
            }

            // Handle i18n translation files - redirect if missing base path
            if (pathname.startsWith("/i18n/")) {
                const redirectUrl = `/game-148${pathname}`;
                console.log(`[SERVER] Redirecting i18n request: ${pathname} -> ${redirectUrl}`);
                res.writeHead(302, { Location: redirectUrl });
                res.end();
                return;
            }

            // Handle i18n translation files with base path
            if (pathname.startsWith("/game-148/i18n/")) {
                const i18nPath = pathname.replace("/game-148/i18n/", "");
                const filePath = path.join(process.cwd(), "public", "i18n", i18nPath);

                console.log(`[SERVER] i18n request: ${pathname} -> ${filePath}`);

                // Check if file exists
                if (fs.existsSync(filePath)) {
                    console.log(`[SERVER] Serving i18n file: ${filePath}`);
                    const ext = path.extname(filePath);
                    const contentType = getContentType(ext);

                    res.setHeader("Content-Type", contentType);
                    res.setHeader("Cache-Control", "public, max-age=3600, immutable");

                    const fileStream = fs.createReadStream(filePath);
                    fileStream.pipe(res);
                    return;
                } else {
                    console.log(`[SERVER] i18n file not found: ${filePath}`);
                }
            }

            // Handle all other requests normally
            await handle(req, res, url.href);
        } catch (err) {
            console.error("Error occurred handling", req.url, err);
            res.statusCode = 500;
            res.end("internal server error");
        }
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});

function getContentType(ext) {
    const types = {
        ".js": "application/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".webp": "image/webp",
        ".ico": "image/x-icon",
        ".ttf": "font/ttf",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
        ".eot": "application/vnd.ms-fontobject",
    };
    return types[ext] || "application/octet-stream";
}
