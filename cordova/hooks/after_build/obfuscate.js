const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

module.exports = function (context) {

    const wwwJsPath = path.join(
        context.opts.projectRoot,
        'platforms',
        'electron',
        'www',
        'js'
    );

    if (!fs.existsSync(wwwJsPath)) {
        console.log('JS folder not found:', wwwJsPath);
        return;
    }

    function walk(dir) {
        fs.readdirSync(dir).forEach(file => {
            const full = path.join(dir, file);

            if (fs.lstatSync(full).isDirectory()) {
                walk(full);
            } else if (file.endsWith('.js')) {

                const code = fs.readFileSync(full, 'utf8');

                const obfuscated = JavaScriptObfuscator.obfuscate(code, {
                    compact: true,
                    identifierNamesGenerator: 'hexadecimal',
                    stringArray: true,
                    stringArrayEncoding: ['base64']
                });

                fs.writeFileSync(full, obfuscated.getObfuscatedCode());

                console.log('OBFUSCATED:', full);
            }
        });
    }

    walk(wwwJsPath);

    console.log('OBFUSCATION DONE ✔');
};