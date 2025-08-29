const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'src');
const fromShared = path.join(srcDir, '_shared');
const toShared = path.join(root, 'packages', 'shared', 'src');
const fromSedie = path.join(srcDir, 'games', 'sedie-multiplayer');
const toSedie = path.join(root, 'packages', 'sedie', 'src');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
    ensureDir(dest);
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const s = path.join(src, entry.name);
        const d = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyRecursive(s, d);
        } else {
            fs.copyFileSync(s, d);
        }
    }
}

console.log('Migrating _shared → packages/shared/src ...');
copyRecursive(fromShared, toShared);
console.log('Migrating games/sedie-multiplayer → packages/sedie/src ...');
copyRecursive(fromSedie, toSedie);
console.log('Migration complete.');


