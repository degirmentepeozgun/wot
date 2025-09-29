#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const { readdirSync, statSync, readFileSync, writeFileSync } = fs;

console.log("[HOOK] after_prepare tetiklendi (electron)");

// simple platform detection (daha önceki check'lerden biriyle devam)
const platformsDir = path.resolve(__dirname, "../../platforms");
const electronPlatformDir = path.join(platformsDir, "electron");
const wwwPath = path.join(electronPlatformDir, "www");

if (!fs.existsSync(electronPlatformDir)) {
    console.log("[HOOK] Electron platformu bulunamadı. Çıkılıyor.");
    process.exit(0);
}
if (!fs.existsSync(wwwPath)) {
    console.log("[HOOK] www klasörü bulunamadı:", wwwPath);
    process.exit(0);
}

console.log("[HOOK] Obfuscate hedefi:", wwwPath);

// require the module (ensure it's installed as dev dep)
let JavaScriptObfuscator;
try {
    JavaScriptObfuscator = require("javascript-obfuscator");
} catch (e) {
    console.error("[HOOK] Lütfen 'javascript-obfuscator' paketini yükleyin: npm i -D javascript-obfuscator");
    process.exit(1);
}

// list of patterns to exclude (node_modules, vendor, libs, maps, already-obfuscated large bundles, etc.)
const defaultExcludes = [
    "node_modules",
    "vendor",
    "libs",
    ".map",
    ".min.js",          // isteğe bağlı: minified dosyaları atla
    "vendor.js",
    "thirdparty",
    "jquery",           // örnekler, projenize göre düzenleyin
];

// recursion to get all files
function walk(dir) {
    const files = [];
    for (const name of readdirSync(dir)) {
        const full = path.join(dir, name);
        const s = statSync(full);
        if (s.isDirectory()) {
            // skip excluded dirs
            if (defaultExcludes.some(ex => name.toLowerCase().includes(ex.toLowerCase()))) continue;
            files.push(...walk(full));
        } else {
            // only .js files
            if (!name.endsWith(".js")) continue;
            // skip maps
            if (defaultExcludes.some(ex => name.toLowerCase().includes(ex.toLowerCase()))) continue;
            files.push(full);
        }
    }
    return files;
}

const files = walk(wwwPath);
console.log(`[HOOK] Toplam .js dosyası bulundu: ${files.length}`);

const obfuscatorOptions = {
    compact: true,
    selfDefending: true,
    // diğer seçenekler: renameGlobals, rotateStringArray, etc. Projeye göre ayarla.
};

let processed = 0;
let skipped = [];

for (const f of files) {
    try {
        const code = readFileSync(f, "utf8");

        // küçük güvenlik: eğer dosya çok büyükse atla (örneğin vendor bundle)
        if (code.length > 5000000) { // 5MB eşiği, ihtiyaca göre ayarla
            console.log("[HOOK] Büyük dosya atlandı:", f);
            skipped.push({ file: f, reason: "too-large" });
            continue;
        }

        // attempt obfuscation
        let obfuscated;
        try {
            obfuscated = JavaScriptObfuscator.obfuscate(code, obfuscatorOptions).getObfuscatedCode();
        } catch (err) {
            console.error("[HOOK] Obfuscator parse hatası, dosya atlanıyor:", f);
            console.error("        Hata:", err && err.message ? err.message : err);
            skipped.push({ file: f, reason: "parse-error", error: err && err.message });
            continue;
        }

        // overwrite file (veya istersen ayrı bir dizine yaz)
        writeFileSync(f, obfuscated, "utf8");
        processed++;
        console.log(`[HOOK] Obfuscate tamam: ${f}`);
    } catch (err) {
        console.error("[HOOK] Dosya işlenirken hata:", f, err && err.message ? err.message : err);
        skipped.push({ file: f, reason: "io-error", error: err && err.message });
    }
}

console.log(`[HOOK] İşlem tamam. İşlenen: ${processed}, Atlanan: ${skipped.length}`);
if (skipped.length) {
    console.log("[HOOK] Atlanan dosyalar örnekleri:", skipped.slice(0,10));
}
