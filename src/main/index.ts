import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { Seed } from './sequelize/seed/seed'
import ClientDAO from './sequelize/dao/ClientDAO'
import ServiceDAO from './sequelize/dao/ServiceDAO'
import OrderDAO from './sequelize/dao/OrderDAO'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  if (process.env.NODE_ENV === 'production') {
    console.log('production mode')
    //createTable(false)
  } else if (process.env.NODE_ENV === 'development') {
    // Sem o seed a tabela não é criada nem os modelos sincronizados
    Seed()
  }

  /* clients */
  ipcMain.handle('client:findAll', async (_, searchText, page) => {
    return ClientDAO.findAll(searchText, page)
  })

  ipcMain.handle('client:findById', async (_, id) => {
    return ClientDAO.findById(id)
  })

  ipcMain.handle('client:save', async (_, data) => {
    return ClientDAO.save(data)
  })

  ipcMain.handle('client:delete', async (_, id) => {
    return ClientDAO.delete(id)
  })

  /* Services */
  ipcMain.handle('service:findAll', async (_, searchText, page) => {
    return ServiceDAO.findAll(searchText, page)
  })

  ipcMain.handle('service:findById', async (_, id) => {
    return ServiceDAO.findById(id)
  })

  ipcMain.handle('service:save', async (_, data) => {
    return ServiceDAO.save(data)
  })

  ipcMain.handle('service:delete', async (_, id) => {
    return ServiceDAO.delete(id)
  })

  /* Orders */
  ipcMain.handle('order:findAll', async (_, searchText, page, filterStatus) => {
    return OrderDAO.findAll(searchText, page, filterStatus)
  })

  ipcMain.handle('order:findById', async (_, id) => {
    return OrderDAO.findById(id)
  })

  ipcMain.handle('order:save', async (_, data) => {
    return OrderDAO.save(data)
  })

  ipcMain.handle('order:delete', async (_, id) => {
    return OrderDAO.delete(id)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
