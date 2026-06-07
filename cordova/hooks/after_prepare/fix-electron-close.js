#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

module.exports = function (ctx) {

    const platformRoot = path.join(
        ctx.opts.projectRoot,
        'platforms',
        'electron'
    );

    const appPath = path.join(
        platformRoot,
        'platform_www',
        'cdv-electron-main.js'
    );

    console.log('PATCH TARGET:', appPath);

    if (!fs.existsSync(appPath)) {
        console.log('Electron main file bulunamadı');
        return;
    }

    let content = fs.readFileSync(appPath, 'utf8');

    if (content.includes('IPC_CLOSE_HANDLER')) {
        console.log('Close handler zaten ekli');
        return;
    }

    const injectCode = `

// IPC_CLOSE_HANDLER
const { ipcMain } = require('electron');

ipcMain.on('force-close-game', () => {

    console.log('FORCE CLOSE RECEIVED');

    if (mainWindow) {
        mainWindow.destroy();
    }

    app.exit(0);
});

`;

    content = content.replace(
        'function createWindow() {',
        injectCode + '\nfunction createWindow() {'
    );

    fs.writeFileSync(appPath, content);

    console.log('Electron close handler eklendi');
};