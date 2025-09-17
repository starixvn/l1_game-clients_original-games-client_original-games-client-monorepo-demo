const express = require("express");
const path = require("path");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT, 10) || 3000;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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

        // Handle all other routes with Next.js
        server.all("*", (req, res) => {
            // Handle basePath routing for production deployments
            if (basePath && !req.url.startsWith(basePath)) {
                // Prepend basePath to the request URL for Next.js to handle correctly
                req.url = basePath + req.url;
            }

            return handle(req, res);
        });

        server.listen(port, hostname, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://${hostname}:${port}`);
            if (basePath) {
                console.log(`> Base path configured: ${basePath}`);
            }
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
