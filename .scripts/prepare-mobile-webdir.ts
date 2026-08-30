import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const webDir: string = resolve(".build/mobile/client");
const shellPath: string = resolve(webDir, "_shell.html");

if (!existsSync(shellPath)) {
    console.error("[mobile:prepare-webdir] SPA shell not found:", shellPath);
    process.exit(1);
}

cpSync(shellPath, resolve(webDir, "index.html"));

let html: string = readFileSync(resolve(webDir, "index.html"), "utf8");
html = html
    .replace(/(src|href)="\/assets\//g, '$1="./assets/')
    .replace(/(src|href)="\/(fonts|favicons|site\.webmanifest)/g, '$1="./$2');
writeFileSync(resolve(webDir, "index.html"), html);

for (const file of ["robots.txt", "sitemap.xml", "pages.json"]) {
    const target: string = resolve(webDir, file);
    if (existsSync(target)) {
        rmSync(target);
        console.log(`[mobile:prepare-webdir] removed web-only artifact: ${file}`);
    }
}

console.log("[mobile:prepare-webdir] Capacitor webDir ready:", webDir);
