const { app, BrowserWindow } = require('electron/main');
const path = require('node:path');

const isDev = !app.isPackaged;

function createWindow () {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1400,
    minHeight: 900,
    maxWidth: 1400,
    maxHeight: 900,
    resizable: false,
    icon: path.join(__dirname, 'favicon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

    win.setMenu(null);

  const url = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../app/out/index.html')}`;

  if (isDev) {
    win.loadURL(url);
  } else {
    win.loadFile(path.join(__dirname, '../app/out/index.html'));
  }
}

app.whenReady().then(() => {
  // Esto hará que tu base de datos se cree en la carpeta de usuario de Electron
  process.env.ELECTRON_USER_DATA = app.getPath('userData');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})