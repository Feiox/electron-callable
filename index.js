const { ipcMain, BrowserWindow, Menu, app } = require('electron')
module.exports = {
  init() {
    // 注册通用事件
    ipcMain.on('rpc-common', (event, msg) => {

    })


  }
}