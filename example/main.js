const { app, BrowserWindow, ipcMain } = require('electron')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const { createMainFunctionsBus } = require('../src/index')


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()

  const Fun = createMainFunctionsBus(win)

  // 定义在 main 执行的同步函数
  Fun.demoSync = function (msg) {
    return { resp: 'ok' }
  }

  // 定义在 main 执行的异步函数
  Fun.demoAsync = async function (msg) {
    await sleep(2000)
    return { resp: 'ok' }
  }

  async function demo() {
    // 调用 renderer 中的同步函数
    Fun.webSync({ k: 'sync' }).then(d => {
      console.log('recv from renderer', d)
    })

    // 调用 renderer 中的异步函数
    Fun.webAsync({ k: 'async' }).then(d => {
      console.log('recv from renderer', d)
    })

  }

  // 等待 renderer 准备完毕
  setTimeout(async () => await demo(), 2 * 1000)


}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})