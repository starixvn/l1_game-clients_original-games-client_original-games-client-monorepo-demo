const fs = require("fs");
const path = require("path");

// Copy shared assets to standalone build
const sourceDir = path.join(__dirname, "../packages/shared/public");
const targetDir = path.join(__dirname, "../.next/standalone/public");

if (fs.existsSync(sourceDir)) {
  fs.cpSync(sourceDir, targetDir, { recursive: true });
}
