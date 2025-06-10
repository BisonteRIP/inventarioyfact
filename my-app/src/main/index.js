const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

const isDev = !app.isPackaged; // <-- Agrega esto

function createWindow () {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

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
  createWindow()

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