const fs = require("fs");
const path = require("path");

function copyDir(src, dest) {
    if (!fs.existsSync(src)) return;
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
        const s = path.join(src, entry);
        const d = path.join(dest, entry);
        const stat = fs.statSync(s);
        if (stat.isDirectory()) copyDir(s, d);
        else fs.copyFileSync(s, d);
    }
}

const root = path.resolve(__dirname, "..");
copyDir(path.join(root, "packages/shared/assets/static"), path.join(root, "public/static"));
copyDir(path.join(root, "packages/sedie/assets/static"), path.join(root, "public/static"));
copyDir(path.join(root, "packages/baccarat/assets/static"), path.join(root, "public/static"));
