// ================= GPU FORCE =================

process.env.NV_OPTIMUS_ENABLEMENT = "1";
process.env.AMD_SWITCHABLE_GRAPHICS = "1";

const { app, Menu } = require('electron');

// ================= GPU PERFORMANCE FLAGS =================

app.commandLine.appendSwitch('ignore-gpu-blacklist');            // kara listeyi bypass
app.commandLine.appendSwitch('use-angle', 'd3d11');              // windows için en stabil
app.commandLine.appendSwitch('enable-zero-copy');                // texture upload hızlanır
app.commandLine.appendSwitch('enable-native-gpu-memory-buffers');// canvas/video buffer hızlanır
app.commandLine.appendSwitch('enable-features', 'DirectComposition'); // compositor hız

// ================= DEVTOOLS HARD KILL =================

app.commandLine.appendSwitch('disable-devtools');

// ================= 3D API UNLOCK =================

app.disableDomainBlockingFor3DAPIs();

// ================= HW ACCEL =================

app.enableHardwareAcceleration();

// ================= MENU KILL =================

Menu.setApplicationMenu(null);

// ================= DEVTOOLS AUTO CLOSE =================

app.on('browser-window-created', (_, window) => {

  // sağ tık inspect kill
  window.webContents.on('context-menu', e => {
    e.preventDefault();
  });

  // F12 + CTRL+SHIFT+I kill
  window.webContents.on('before-input-event', (e, input) => {
    if (
      input.key === 'F12' ||
      (input.control && input.shift && input.key.toLowerCase() === 'i')
    ) {
      e.preventDefault();
    }
  });

  // zorla açılırsa kapat
  window.webContents.on('devtools-opened', () => {
    window.webContents.closeDevTools();
  });

});
