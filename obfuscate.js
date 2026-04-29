const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

// Vite output klasörün (senin config'e göre www olabilir)
const dir = path.join(__dirname, 'www/js');

function walk(folder) {
    fs.readdirSync(folder).forEach(file => {
        const fullPath = path.join(folder, file);

        if (fs.lstatSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.js')) {
            const code = fs.readFileSync(fullPath, 'utf8');

            const obfuscated = JavaScriptObfuscator.obfuscate(code, {
                compact: true,
                identifierNamesGenerator: 'hexadecimal',
                stringArray: true,
                stringArrayEncoding: ['base64'],
                stringArrayThreshold: 0.75
            });

            fs.writeFileSync(fullPath, obfuscated.getObfuscatedCode());

            console.log('OBFUSCATED:', fullPath);
        }
    });
}

walk(dir);

console.log('DONE');