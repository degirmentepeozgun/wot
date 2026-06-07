/*
    Apache License vs...
*/

const fs = require('fs');
const path = require('path');
const { cordova } = require('./package.json');

const {
    app,
    BrowserWindow,
    protocol,
    ipcMain,
    net,
    Menu
} = require('electron');

const cdvElectronSettings = require('./cdv-electron-settings.json');
const reservedScheme = require('./cdv-reserved-scheme.json');

const scheme = cdvElectronSettings.scheme;
const hostname = cdvElectronSettings.hostname;
const isFileProtocol = scheme === 'file';

const basePath = (() => isFileProtocol ? `file://${__dirname}` : `${scheme}://${hostname}`)();

if (reservedScheme.includes(scheme)) throw new Error(`The scheme "${scheme}" can not be registered.`);

if (!isFileProtocol) {
    protocol.registerSchemesAsPrivileged([
        { scheme, privileges: { standard: true, secure: true } }
    ]);
}

let mainWindow;

function createWindow () {

    let appIcon;
    if (fs.existsSync(path.join(__dirname, 'img/app.png'))) {
        appIcon = path.join(__dirname, 'img/app.png');
    } else if (fs.existsSync(path.join(__dirname, 'img/icon.png'))) {
        appIcon = path.join(__dirname, 'img/icon.png');
    } else {
        appIcon = path.join(__dirname, 'img/logo.png');
    }

    const browserWindowOpts = Object.assign({}, cdvElectronSettings.browserWindow, {
        icon: appIcon,

        // 🔥 HARD SETTINGS
        frame: false,
        resizable: false,
        fullscreen: true,
        autoHideMenuBar: true,
        movable: false,
        minimizable: false,
        maximizable: false,
        closable: true,
        alwaysOnTop: true,

        webPreferences: {
            ...cdvElectronSettings.browserWindow.webPreferences,
            devTools: false,
            preload: path.join(app.getAppPath(), 'cdv-electron-preload.js'),
            contextIsolation: true,
            sandbox: false
        }
    });

    mainWindow = new BrowserWindow(browserWindowOpts);
    mainWindow.setMenuBarVisibility(false);
    mainWindow.setAutoHideMenuBar(true);
    mainWindow.removeMenu();
    // ❌ Menü tamamen kaldır
    Menu.setApplicationMenu(null);
    mainWindow.setMenu(null);

    // ❌ DevTools açılmasını engelle
    mainWindow.webContents.on('devtools-opened', () => {
        mainWindow.webContents.closeDevTools();
    });

    // ❌ Kısayolları blokla
    mainWindow.webContents.on('before-input-event', (event, input) => {
        if (
            input.key === 'F12' ||
            (input.control && input.shift && input.key.toLowerCase() === 'i') ||
            (input.alt && input.key.toLowerCase() === '') // ALT menü trigger
        ) {
            event.preventDefault();
        }
    });

    // URL load
    const cdvUrl = cdvElectronSettings.browserWindowInstance.loadURL.url;
    const loadUrl = cdvUrl.includes('://') ? cdvUrl : `${basePath}/${cdvUrl}`;
    const loadUrlOpts = Object.assign({}, cdvElectronSettings.browserWindowInstance.loadURL.options);

    mainWindow.loadURL(loadUrl, loadUrlOpts);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function configureProtocol () {
    if (protocol.handle) {
        protocol.handle(scheme, request => {
            const url = request.url.substr(basePath.length + 1);
            const fileUrl = `file://${path.normalize(path.join(__dirname, url))}`;
            return net.fetch(fileUrl);
        });
    } else if (protocol.registerFileProtocol) {
        protocol.registerFileProtocol(scheme, (request, cb) => {
            const url = request.url.substr(basePath.length + 1);
            cb({ path: path.normalize(path.join(__dirname, url)) });
        });
        protocol.interceptFileProtocol('file', (_, cb) => { cb(null); });
    }
}

app.on('ready', () => {
    if (!isFileProtocol) configureProtocol();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) {
        if (!isFileProtocol) configureProtocol();
        createWindow();
    }
});

ipcMain.handle('cdv-plugin-exec', async (_, serviceName, action, ...args) => {
    if (cordova && cordova.services && cordova.services[serviceName]) {
        const plugin = require(cordova.services[serviceName]);

        return plugin[action]
            ? plugin[action](...args)
            : Promise.reject(new Error(`Action not found`));
    } else {
        return Promise.reject(new Error(`Service not found`));
    }
});

ipcMain.handle(
    'capture-page',
    async(event)=>{

        const win =
            BrowserWindow.fromWebContents(
                event.sender
            );

        const image =
            await win.webContents.capturePage();

        return image.toDataURL();
    }
);