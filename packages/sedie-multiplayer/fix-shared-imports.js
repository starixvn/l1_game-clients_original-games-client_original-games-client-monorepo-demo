const fs = require('fs');
const path = require('path');

// Function to recursively find all TypeScript/JavaScript files
function findFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
    let results = [];
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat && stat.isDirectory()) {
            // Skip node_modules and .next directories
            if (!file.startsWith('.') && file !== 'node_modules') {
                results = results.concat(findFiles(filePath, extensions));
            }
        } else if (extensions.some(ext => file.endsWith(ext))) {
            results.push(filePath);
        }
    });
    
    return results;
}

// Function to fix import statements
function fixImports(content) {
    // Fix malformed @shared imports with extra quotes
    content = content.replace(/from '@shared\/([^"]*)"\s*;/g, "from '@shared/$1';");
    
    // Fix any other malformed imports
    content = content.replace(/from "@([^"]*)"\s*;/g, 'from "@$1";');
    
    return content;
}

// Main function
function main() {
    const sharedDir = path.join(__dirname, '../shared/src');
    
    if (!fs.existsSync(sharedDir)) {
        console.log('Shared directory not found:', sharedDir);
        return;
    }
    
    const files = findFiles(sharedDir);
    let fixedCount = 0;
    
    files.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const fixedContent = fixImports(content);
            
            if (content !== fixedContent) {
                fs.writeFileSync(file, fixedContent, 'utf8');
                console.log('Fixed:', path.relative(process.cwd(), file));
                fixedCount++;
            }
        } catch (error) {
            console.error('Error processing file:', file, error.message);
        }
    });
    
    console.log(`\nFixed ${fixedCount} files`);
}

main();
