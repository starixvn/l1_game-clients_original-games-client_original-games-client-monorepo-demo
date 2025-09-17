const express = require("express");
const path = require("path");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT, 10) || 3000;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Helper functions for basePath handling
function ensureBasePath(url, basePath) {
    if (!basePath) return url;

    // If URL already starts with basePath, return as is
    if (url.startsWith(basePath)) return url;

    // If URL is just "/" or empty, return basePath
    if (url === "/" || url === "") return basePath;

    // If URL starts with "/", prepend basePath
    if (url.startsWith("/")) return basePath + url;

    // Otherwise, treat as relative path and prepend basePath + "/"
    return basePath + "/" + url;
}

function stripBasePath(url, basePath) {
    if (!basePath || !url.startsWith(basePath)) return url;

    const pathWithoutBase = url.slice(basePath.length);
    return pathWithoutBase || "/";
}

function isUnderBasePath(url, basePath) {
    return basePath ? url.startsWith(basePath) : true;
}

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

        // Helper function to process basePath routing logic
        function processBasePathRouting(req, originalUrl, basePath) {
            let shouldServeIndex = false;
            let transformedUrl = originalUrl;

            if (basePath) {
                console.log(`📍 [BasePath Logic] basePath: "${basePath}", originalUrl: "${originalUrl}"`);

                // Handle Next.js image optimization URLs
                handleImageOptimization(req, basePath);

                // Transform URL based on basePath
                const result = transformUrlForBasePath(req.url, basePath, originalUrl);
                transformedUrl = result.transformedUrl;
                shouldServeIndex = result.shouldServeIndex;
            } else {
                console.log(`ℹ️  [BasePath] No basePath configured, passing through: "${originalUrl}"`);
            }

            return { transformedUrl, shouldServeIndex };
        }

        // Helper function to handle Next.js image optimization URLs
        function handleImageOptimization(req, basePath) {
            if (req.url.startsWith("/_next/image")) {
                console.log(`🖼️  [Image Optimization] Processing Next.js image URL: ${req.url}`);

                const urlParam = req.query?.url;
                if (urlParam?.startsWith(basePath)) {
                    const newUrl = urlParam.slice(basePath.length);
                    req.query.url = newUrl;
                    console.log(`🖼️  [Image Optimization] Updated image URL: ${urlParam} → ${newUrl}`);
                }
            }
        }

        // Helper function to transform URLs for basePath handling
        function transformUrlForBasePath(url, basePath, originalUrl) {
            let transformedUrl = url;
            let shouldServeIndex = false;

            if (url === basePath || url === basePath + "/") {
                // Root page request with basePath - convert to internal root
                transformedUrl = "/";
                console.log(`✅ [BasePath] Root request transformed: "${originalUrl}" → "/"`);
            } else if (url.startsWith(basePath + "/")) {
                // Request has basePath prefix - remove it for Next.js (which has no basePath configured)
                const newUrl = url.slice(basePath.length);
                transformedUrl = newUrl;
                console.log(`✅ [BasePath] Prefixed request transformed: "${originalUrl}" → "${newUrl}"`);

                // Check if this is a potential SPA route that should fall back to index
                if (isSPARoute(newUrl)) {
                    shouldServeIndex = true;
                    console.log(`🏠 [SPA Fallback] Will serve index.html for potential SPA route: "${originalUrl}"`);
                }
            } else {
                // Request does NOT have basePath prefix - this is normal for reverse proxy
                console.log(`🔄 [BasePath] No prefix needed: "${originalUrl}" (reverse proxy scenario)`);
            }

            return { transformedUrl, shouldServeIndex };
        }

        // Helper function to determine if a URL should be treated as an SPA route
        function isSPARoute(url) {
            // Exclude API routes, static assets, and known file extensions
            return (
                !url.startsWith("/api/") &&
                !url.includes("/_next/") &&
                !url.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|xml|txt)$/i)
            );
        }

        // Helper function to setup redirect interception
        function setupRedirectInterception(res, basePath) {
            const originalRedirect = res.redirect;
            res.redirect = function (status, url) {
                if (basePath && url && typeof url === "string" && !url.startsWith("http") && !url.startsWith(basePath)) {
                    // In production with reverse proxy, add basePath back to redirects
                    url = basePath + url;
                    console.log(`🔀 [Redirect] BasePath added to redirect: "${url}"`);
                }
                return originalRedirect.call(this, status, url);
            };
        }

        // Helper function to setup SPA fallback for 404 responses
        function setupSPAFallback(req, res, originalUrl, handle) {
            const originalSend = res.send;
            const originalStatus = res.status;
            let is404 = false;

            // Override res.status to detect 404s
            res.status = function (code) {
                if (code === 404) {
                    is404 = true;
                }
                return originalStatus.call(this, code);
            };

            // Override res.send to intercept 404 responses
            res.send = function (body) {
                if (is404) {
                    console.log(`🔄 [SPA Fallback] Detected 404 for "${originalUrl}", redirecting to basePath URL`);

                    // Calculate the basePath URL
                    let redirectUrl = originalUrl;
                    if (basePath) {
                        if (originalUrl === "/" || originalUrl === "") {
                            // Root request - redirect to basePath root
                            redirectUrl = basePath;
                        } else if (!originalUrl.startsWith(basePath)) {
                            // Request without basePath - prepend basePath
                            redirectUrl = basePath + (originalUrl.startsWith("/") ? originalUrl : "/" + originalUrl);
                        }
                        // If already has basePath, redirectUrl stays the same
                    }

                    console.log(`🔀 [SPA Redirect] Redirecting "${originalUrl}" → "${redirectUrl}"`);
                    res.status(302); // Temporary redirect
                    res.setHeader("Location", redirectUrl);
                    res.end();
                    return;
                }
                return originalSend.call(this, body);
            };
        }

        // Handle all other routes with Next.js
        server.all("*", (req, res) => {
            const originalUrl = req.url;
            console.log(`🔄 [Next.js Handler] Processing: ${originalUrl}`);

            // If basePath is configured and URL doesn't start with basePath, redirect to basePath version
            if (basePath && !originalUrl.startsWith(basePath)) {
                let redirectUrl;
                if (originalUrl === "/" || originalUrl === "") {
                    // Root request - redirect to basePath root
                    redirectUrl = basePath;
                } else {
                    // Request without basePath - prepend basePath
                    redirectUrl = basePath + originalUrl;
                }

                console.log(`🔀 [BasePath Redirect] Redirecting "${originalUrl}" → "${redirectUrl}"`);
                res.status(302); // Temporary redirect
                res.setHeader("Location", redirectUrl);
                res.end();
                return;
            }

            // Process the URL for basePath handling
            const { transformedUrl, shouldServeIndex } = processBasePathRouting(req, originalUrl, basePath);

            req.url = transformedUrl;
            console.log(`🎯 [Next.js Handler] Final URL for Next.js: "${req.url}"`);

            // Setup redirect interception for basePath
            setupRedirectInterception(res, basePath);

            // Setup SPA fallback for 404s if needed
            if (shouldServeIndex) {
                setupSPAFallback(req, res, originalUrl, handle);
            }

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
