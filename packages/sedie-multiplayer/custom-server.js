const express = require("express");
const path = require("path");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT, 10) || 3000;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

console.log(`🚀 Starting server with config:`);
console.log(`  - Environment: ${process.env.NODE_ENV}`);
console.log(`  - Hostname: ${hostname}`);
console.log(`  - Port: ${port}`);
console.log(`  - Base Path: ${basePath || "(none)"}`);
console.log(`  - Dev Mode: ${dev}`);

// Create the Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        // Add comprehensive logging middleware FIRST to catch ALL requests
        server.use((req, res, next) => {
            const timestamp = new Date().toISOString();
            console.log(`📨 [${timestamp}] ${req.method} ${req.url} (User-Agent: ${req.get("User-Agent")?.substring(0, 50) || "unknown"})`);

            // Also log when response is finished
            res.on("finish", () => {
                console.log(`📨 [${timestamp}] ${req.method} ${req.url} → ${res.statusCode}`);
            });

            next();
        });

        // Serve static files from .next/static
        server.use("/_next/static", (req, res, next) => {
            console.log(`📁 [Static] Serving _next/static file: ${req.url}`);
            express.static(path.join(__dirname, ".next/static"), {
                maxAge: "1y",
                immutable: true,
            })(req, res, next);
        });

        // Serve static files from public with basePath support
        server.use((req, res, next) => {
            console.log(`📁 [Static] Processing: ${req.url}`);

            // For production with reverse proxy stripping basePath, serve files directly
            // The reverse proxy sends requests like /static/images/... and we serve them as-is
            express.static(path.join(__dirname, "public"), {
                maxAge: "1y",
            })(req, res, (err) => {
                if (err) {
                    console.log(`📁 [Static] File not found or error: ${req.url}`, err.message);
                }
                next(err);
            });
        });

        // Handle all other routes with Next.js
        server.all("*", (req, res) => {
            const originalUrl = req.url;
            console.log(`🔄 [Next.js Handler] Processing: ${originalUrl}`);

            // Handle basePath routing for production deployments
            // Since Next.js basePath is disabled, we handle it entirely in the custom server
            if (basePath) {
                console.log(`📍 [BasePath Logic] basePath: "${basePath}", originalUrl: "${originalUrl}"`);

                // Special handling for Next.js image optimization URLs
                if (req.url.startsWith("/_next/image")) {
                    console.log(`🖼️  [Image Optimization] Processing Next.js image URL: ${req.url}`);

                    // Handle basePath in image URLs
                    const urlParam = req.query.url;
                    if (urlParam && urlParam.startsWith(basePath)) {
                        const newUrl = urlParam.slice(basePath.length);
                        req.query.url = newUrl;
                        console.log(`🖼️  [Image Optimization] Updated image URL: ${urlParam} → ${newUrl}`);
                    }
                }

                if (req.url === basePath || req.url === basePath + "/") {
                    // Root page request with basePath - convert to internal root
                    req.url = "/";
                    console.log(`✅ [BasePath] Root request transformed: "${originalUrl}" → "/"`);
                } else if (req.url.startsWith(basePath + "/")) {
                    // Request has basePath prefix - remove it for Next.js (which has no basePath configured)
                    const newUrl = req.url.slice(basePath.length);
                    req.url = newUrl;
                    console.log(`✅ [BasePath] Prefixed request transformed: "${originalUrl}" → "${newUrl}"`);
                } else {
                    // Request does NOT have basePath prefix - this is normal for reverse proxy
                    console.log(`🔄 [BasePath] No prefix needed: "${originalUrl}" (reverse proxy scenario)`);
                }
            } else {
                console.log(`ℹ️  [BasePath] No basePath configured, passing through: "${originalUrl}"`);
            }

            console.log(`🎯 [Next.js Handler] Final URL for Next.js: "${req.url}"`);

            // Intercept redirects to add basePath back (for production reverse proxy)
            const originalRedirect = res.redirect;
            res.redirect = function (status, url) {
                if (basePath && url && typeof url === "string" && !url.startsWith("http") && !url.startsWith(basePath)) {
                    // In production with reverse proxy, add basePath back to redirects
                    url = basePath + url;
                    console.log(`🔀 [Redirect] BasePath added to redirect: "${url}"`);
                }
                return originalRedirect.call(this, status, url);
            };

            try {
                return handle(req, res);
            } catch (error) {
                console.error(`❌ [Next.js Handler] Error handling request: ${originalUrl} → ${req.url}`, error);
                res.status(500).send("Internal Server Error");
            }
        });

        server.listen(port, hostname, (err) => {
            if (err) throw err;
            console.log(`✅ Server ready on http://${hostname}:${port}`);
            if (basePath) {
                console.log(`📁 Base path configured: ${basePath}`);
                console.log(`🔍 Static files served from:`);
                console.log(`   - /_next/static → ${path.join(__dirname, ".next/static")}`);
                console.log(`   - /${basePath}/... → ${path.join(__dirname, "public")}`);
            }
            console.log(`📊 Request logging enabled - watch for incoming requests`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
