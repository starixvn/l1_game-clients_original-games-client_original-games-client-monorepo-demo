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
console.log(`  - Base Path: ${basePath || '(none)'}`);
console.log(`  - Dev Mode: ${dev}`);

// Create the Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        // Serve static files from .next/static
        server.use(
            "/_next/static",
            express.static(path.join(__dirname, ".next/static"), {
                maxAge: "1y",
                immutable: true,
            })
        );

        // Serve static files from public
        server.use(
            express.static(path.join(__dirname, "public"), {
                maxAge: "1y",
            })
        );

        // Add logging middleware to track all requests
        server.use((req, res, next) => {
            const timestamp = new Date().toISOString();
            console.log(`📨 [${timestamp}] ${req.method} ${req.url}`);
            next();
        });

        // Handle all other routes with Next.js
        server.all("*", (req, res) => {
            const originalUrl = req.url;
            console.log(`🔄 [Next.js Handler] Processing: ${originalUrl}`);

            // Handle basePath routing for production deployments
            // If reverse proxy strips basePath, we need to add it back
            // If reverse proxy keeps basePath, we need to handle it correctly
            if (basePath) {
                console.log(`📍 [BasePath Logic] basePath: "${basePath}", originalUrl: "${originalUrl}"`);

                if (req.url === basePath || req.url === basePath + "/") {
                    // Root page request - redirect to basePath root
                    req.url = "/";
                    console.log(`✅ [BasePath] Root request transformed: "${originalUrl}" → "/"`);
                } else if (req.url.startsWith(basePath + "/")) {
                    // Remove basePath prefix for Next.js internal routing
                    const newUrl = req.url.slice(basePath.length);
                    req.url = newUrl;
                    console.log(`✅ [BasePath] Prefixed request transformed: "${originalUrl}" → "${newUrl}"`);
                } else if (!req.url.startsWith("/")) {
                    // Handle edge cases
                    req.url = "/" + req.url;
                    console.log(`✅ [BasePath] Edge case transformed: "${originalUrl}" → "${req.url}"`);
                } else {
                    console.log(`⚠️  [BasePath] No transformation needed for: "${originalUrl}"`);
                }
            } else {
                console.log(`ℹ️  [BasePath] No basePath configured, passing through: "${originalUrl}"`);
            }

            console.log(`🎯 [Next.js Handler] Final URL for Next.js: "${req.url}"`);
            try {
                return handle(req, res);
            } catch (error) {
                console.error(`❌ [Next.js Handler] Error handling request: ${originalUrl} → ${req.url}`, error);
                res.status(500).send('Internal Server Error');
            }
        });

        server.listen(port, hostname, (err) => {
            if (err) throw err;
            console.log(`✅ Server ready on http://${hostname}:${port}`);
            if (basePath) {
                console.log(`📁 Base path configured: ${basePath}`);
                console.log(`🔍 Static files served from:`);
                console.log(`   - /_next/static → ${path.join(__dirname, '.next/static')}`);
                console.log(`   - /${basePath}/... → ${path.join(__dirname, 'public')}`);
            }
            console.log(`📊 Request logging enabled - watch for incoming requests`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
