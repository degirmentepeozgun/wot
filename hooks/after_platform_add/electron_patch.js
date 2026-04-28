const fs = require('fs');
const path = require('path');
throw new Error("ELECTRON HOOT TEST");
module.exports = function () {

    const mainPath = path.join(
        __dirname,
        '../../platforms/electron/platform_www/main.js'
    );

    if (!fs.existsSync(mainPath)) {
        console.log('Electron main.js bulunamadı');
        return;
    }

    let data = fs.readFileSync(mainPath, 'utf8');

    // Zaten patchliyse tekrar ekleme
    if (data.includes('GPU_FORCE_PATCH')) return;

    const inject = `// ===== GPU_FORCE_PATCH =====

process.env.NV_OPTIMUS_ENABLEMENT = "1";
process.env.AMD_SWITCHABLE_GRAPHICS = "1";

app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('use-angle', 'd3d11');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('enable-native-gpu-memory-buffers');
app.commandLine.appendSwitch('enable-features', 'DirectComposition');

app.disableDomainBlockingFor3DAPIs();
app.enableHardwareAcceleration();

// MENU + DEVTOOLS FULL KILL
app.on('browser-window-created', (_, win) => {

    // Menü BAR komple yok
    win.setMenuBarVisibility(false);
    win.setMenu(null);
    win.removeMenu?.();

    // Devtools API disable
    win.webContents.setDevToolsWebContents(null);
    win.webContents.closeDevTools();

});

// ===== GPU_FORCE_PATCH END =====

`;

    data = data.replace(
        `const { app, BrowserWindow`,
        inject + `\n\nconst { app, BrowserWindow`
    );

    fs.writeFileSync(mainPath, data, 'utf8');

    console.log('Electron main.js patchlendi (GPU + DEVTOOLS)');
};
