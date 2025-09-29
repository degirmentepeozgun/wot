#!/usr/bin/env node
console.log("[HOOK] Electron obfuscate hook çalıştı!");
const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../platforms/electron/www');  // Electron www dizini
const EXCLUDE = ['cordova.js']; // İstemediğin dosyaları buraya ekle

function obfuscateFile(srcPath) {
    const code = fs.readFileSync(srcPath, 'utf8');
    const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        stringArray: true,
        stringArrayEncoding: ['rc4'],
        stringArrayThreshold: 1,
    }).getObfuscatedCode();

    fs.writeFileSync(srcPath, obfuscatedCode, 'utf8');
    console.log('Obfuscated:', path.relative(SRC_DIR, srcPath));
}

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.js') && !EXCLUDE.includes(file)) {
            obfuscateFile(fullPath);
        }
    });
}

console.log('Electron build için JS dosyaları obfuscate ediliyor...');
walk(SRC_DIR);
console.log('Obfuscate tamamlandı.');
