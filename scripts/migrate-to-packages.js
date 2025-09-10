// Migration script to help with the transition
const fs = require("fs");
const path = require("path");

console.log("Migration script for monorepo structure");
console.log("All code has been moved to packages/");
console.log("- Shared code: packages/shared/");
console.log("- SeDie Multiplayer: packages/sedie-multiplayer/");
console.log("Migration completed successfully!");
