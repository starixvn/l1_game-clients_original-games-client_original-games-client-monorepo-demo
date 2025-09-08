const fs = require("fs");
const path = require("path");

// Function to recursively find all TypeScript files
function findTsFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            files.push(...findTsFiles(fullPath));
        } else if (item.endsWith(".ts") || item.endsWith(".tsx")) {
            files.push(fullPath);
        }
    }

    return files;
}

// Function to fix import statements
function fixImportStatements(content) {
    let fixed = content;

    // Fix import statements with missing closing quotes
    // Pattern: import ... from '@shared/..."; (missing closing quote)
    fixed = fixed.replace(/from '@shared\/([^']*)\";/g, "from '@shared/$1';");

    // Pattern: import ... from "@shared/..."; (missing closing quote)
    fixed = fixed.replace(/from "@shared\/([^"]*)\";/g, 'from "@shared/$1";');

    return fixed;
}

// Main execution
const sharedPath = path.join(__dirname, "packages", "shared", "src");
const files = findTsFiles(sharedPath);

console.log(`Found ${files.length} TypeScript files to check...`);

let fixedCount = 0;

for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const fixed = fixImportStatements(content);

    if (content !== fixed) {
        fs.writeFileSync(file, fixed, "utf8");
        console.log(`Fixed import statements in: ${file}`);
        fixedCount++;
    }
}

console.log(`Import statement fixes completed! Fixed ${fixedCount} files.`);
