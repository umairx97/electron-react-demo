const path = require('path')
const url = require('url')
const { app, BrowserWindow } = require('electron')
require('dotenv').config()

const isDev = process.env.NODE_ENV === 'development'
const ELECTRON_REACT_URL = process.env.ELECTRON_REACT_URL || 'http://localhost:3000'

function createMainProc () {
  const mainWindow = createBrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(getAppUrl())
}

function createBrowserWindow (params = {}) {
  const opts = Object.assign({}, {
    height: 800,
    width: 800
  }, params)
  return new BrowserWindow(opts)
}

function getAppUrl () {
  return isDev ? ELECTRON_REACT_URL : url.format({
    pathname: path.join(__dirname, '../build/index.html'),
    protocol: 'file'
  })
}

app.on('ready', createMainProc)

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!BrowserWindow.getAllWindows().length) {
    createMainProc()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
