import { app, protocol, Tray, BrowserWindow, ipcMain, shell } from 'electron'
import path from 'path'
import pkg from './../../package.json'
import initIpcEvent from './modules/ipcEvent'
import createTray from './modules/tray'
import createTrayWindow from './windows/trayWindow'
import createLyricWindow from './windows/desktopLyricWindow'
import createMiniWindow from './windows/miniWindow'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { ACHEME, LOAD_URL } from './config'
import { autoUpdater } from 'electron-updater'
const isDevelopment = process.env.NODE_ENV !== 'production'
if (process.env.NODE_ENV === 'production') {
  global.__img = path.join(__dirname, './img')
  global.__images = path.join(__dirname, './images')
}
let mainWindow = null

protocol.registerSchemesAsPrivileged([{ scheme: ACHEME, privileges: { secure: true, standard: true } }])
const previewIcon = process.env.NODE_ENV === 'development' ? 'public/images/tray.ico' : `${global.__images}/tray.ico`

// 应用更新
/* eslint-disable */
!(function updateHandle() {
  let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新'
  }
  const uploadUrl = 'http://192.168.2.247:10031/download/' // 下载地址，不加后面的**.exe
  autoUpdater.setFeedURL(uploadUrl)
  autoUpdater.on('error', function(error) {
    sendUpdateMessage(message.error)
  })
  autoUpdater.on('checking-for-update', function() {
    sendUpdateMessage(message.checking)
  })
  autoUpdater.on('update-available', function(info) {
    sendUpdateMessage(message.updateAva)
  })
  autoUpdater.on('update-not-available', function(info) {
    sendUpdateMessage(message.updateNotAva)
  })

  // 更新下载进度事件
  autoUpdater.on('download-progress', function(progressObj) {
    mainWindow.webContents.send('downloadProgress', progressObj)
  })
  autoUpdater.on('update-downloaded', function(
    event,
    releaseNotes,
    releaseName,
    releaseDate,
    updateUrl,
    quitAndUpdate
  ) {
    ipcMain.on('isUpdateNow', (e, arg) => {
      autoUpdater.quitAndInstall()
    })
    mainWindow.webContents.send('isUpdateNow')
  })

  ipcMain.on('checkForUpdate', () => {
    //执行自动更新检查
    autoUpdater.checkForUpdates()
  })
})()
// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage(text) {
  mainWindow.webContents.send('message', text)
}
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 690,
    minWidth: 1000,
    minHeight: 690,
    title: pkg.description,
    icon: previewIcon,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false,
      navigateOnDragDrop: true,
      devTools: false
    }
  })
  // 设置appId才能使用Notification
  if (process.platform === 'win32') {
    app.setAppUserModelId(pkg.appId)
  }
  // 去除原生顶部菜单栏
  mainWindow.setMenu(null)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  } else {
    createProtocol(ACHEME)
    mainWindow.loadURL(LOAD_URL)
  }

  mainWindow.on('close', event => {
    event.preventDefault()
    mainWindow.webContents.send('will-close')
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    // 设置任务栏操作和缩略图
    if (process.platform === 'win32') {
      mainWindow.setThumbnailClip({ x: 0, y: 0, width: 180, height: 50 })
    }
    global.lyricWindow = createLyricWindow(BrowserWindow)
    global.miniWindow = createMiniWindow(BrowserWindow)
  })

  if (isDevelopment) {
    // 安装vue-devtools
    const extensions = BrowserWindow.getDevToolsExtensions()
    if (!extensions['Vue.js devtools']) {
      BrowserWindow.addDevToolsExtension(path.resolve(__dirname, './../../src/main/vue-devtools'))
    }
    // 打开调试窗口
    // mainWindow.webContents.openDevTools()
  }
  mainWindow.webContents.openDevTools()

  global.mainWindow = mainWindow
  // 初始化进程之间事件监听
  initIpcEvent()
  // 如果是windows系统模拟托盘菜单
  if (process.platform === 'win32') {
    global.tray = createTray(Tray)
    const trayBounds = global.tray.getBounds()
    global.trayWindow = createTrayWindow(BrowserWindow, trayBounds)
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (global.mainWindow === null || mainWindow === null) {
    createWindow()
  }
})

app.on('ready', () => {
  global.execPath = process.execPath
  global.argv = process.argv
  createWindow()
})
app.on('quit', () => {
  if (global.downloadFile) {
    shell.openItem(global.downloadFile)
  }
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
