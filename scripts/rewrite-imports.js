const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'src');
const pkgSharedDir = path.join(root, 'packages', 'shared', 'src');
const pkgSedieDir = path.join(root, 'packages', 'sedie', 'src');

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(full);
        } else if (/(\.tsx?|\.js)$/.test(entry.name)) {
            let content = fs.readFileSync(full, 'utf8');
            const original = content;
            // _shared → @shared
            content = content
                .replace(/(["'])\.\.\/\.\.\/\.\.\/_shared\//g, '$1@shared/')
                .replace(/(["'])\.\.\/\.\.\/_shared\//g, '$1@shared/')
                .replace(/(["'])\.\.\/_shared\//g, '$1@shared/')
                .replace(/(["'])\.\/\.\/_shared\//g, '$1@shared/');

            // games/sedie-multiplayer → @sedie-multiplayer
            content = content
                .replace(/(["'])\.\.\/\.\.\/\.\.\/games\/sedie-multiplayer\//g, '$1@sedie-multiplayer/')
                .replace(/(["'])\.\.\/\.\.\/games\/sedie-multiplayer\//g, '$1@sedie-multiplayer/')
                .replace(/(["'])\.\.\/games\/sedie-multiplayer\//g, '$1@sedie-multiplayer/')
                .replace(/(["'])\.\/\.\/games\/sedie-multiplayer\//g, '$1@sedie-multiplayer/');

            // components and other app paths → @/
            content = content
                .replace(/(["'])\.\.\/\.\.\/\.\.\/components\//g, '$1@/components/')
                .replace(/(["'])\.\.\/\.\.\/components\//g, '$1@/components/')
                .replace(/(["'])\.\.\/components\//g, '$1@/components/')
                .replace(/(["'])\.\/components\//g, '$1@/components/')
                .replace(/(["'])\.\/(?:\.\.\/)+components\//g, '$1@/components/');

            // Generic depth replacements
            content = content
                .replace(/(["'])(?:\.\.\/)+components\//g, '$1@/components/')
                .replace(/(["'])(?:\.\.\/)+_shared\//g, '$1@shared/')
                .replace(/(["'])(?:\.\.\/)+games\/sedie-multiplayer\//g, '$1@sedie-multiplayer/')
                .replace(/(["'])\.\/(?:\.\.\/)+_shared\//g, '$1@shared/')
                .replace(/(["'])\.\/(?:\.\.\/)+games\/sedie-multiplayer\//g, '$1@sedie-multiplayer/');

            if (content !== original) {
                fs.writeFileSync(full, content, 'utf8');
                console.log('Rewrote imports in', path.relative(root, full));
            }
        }
    }
}

[srcDir, pkgSharedDir, pkgSedieDir].forEach((dir) => {
    if (fs.existsSync(dir)) walk(dir);
});


