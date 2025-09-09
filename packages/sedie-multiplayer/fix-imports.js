const fs = require('fs');
const path = require('path');

function fixImportsInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Fix the broken import pattern: from '@shared/..."; -> from '@shared/...';
        content = content.replace(/from '@shared\/([^']*)"\s*;/g, "from '@shared/$1';");
        
        // Fix the pattern: from '@shared/..."; -> from '@shared/...';
        content = content.replace(/from '@shared\/([^"]*)"\s*;/g, "from '@shared/$1';");
        
        // Fix the pattern: from "./...'; -> from "./...";
        content = content.replace(/from "\.\/([^']*)'\s*;/g, 'from "./$1";');
        
        // Fix the pattern: from "../...'; -> from "../...";
        content = content.replace(/from "\.\.\/([^']*)'\s*;/g, 'from "../$1";');
        
        // Fix broken string literals: || "'; -> || "";
        content = content.replace(/\|\| "';/g, '|| "";');
        
        // Fix relative imports to use @shared
        content = content.replace(/from "\.\.\/\.\.\/\.\.\/components\/game-base\/type"/g, 'from "@shared/components/game-base/type"');
        content = content.replace(/from "\.\.\/\.\.\/\.\.\/components\/game-components\//g, 'from "@shared/components/game-components/');
        content = content.replace(/from "\.\.\/\.\.\/\.\.\/components\/game-base\//g, 'from "@shared/components/game-base/');
        
        // Fix dynamic imports
        content = content.replace(/import\("\.\.\/\.\.\/\.\.\/components\/game-components\//g, 'import("@shared/components/game-components/');
        content = content.replace(/import\("\.\.\/\.\.\/\.\.\/components\/game-base\//g, 'import("@shared/components/game-base/');
        
        // Fix more relative imports
        content = content.replace(/from "\.\.\/\.\.\/game-base\/type"/g, 'from "@shared/components/game-base/type"');
        content = content.replace(/from "\.\.\/\.\.\/game-base\//g, 'from "@shared/components/game-base/');
        content = content.replace(/from "\.\.\/\.\.\/game-components\//g, 'from "@shared/components/game-components/');
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed imports in: ${filePath}`);
    } catch (error) {
        console.error(`Error fixing ${filePath}:`, error.message);
    }
}

function walkDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            walkDirectory(filePath);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            fixImportsInFile(filePath);
        }
    }
}

// Start from the src directory
walkDirectory('./src');
console.log('Import fixing completed!');
