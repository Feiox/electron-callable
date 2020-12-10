const { ipcRenderer } = require('electron')
const { randomString } = require('./utils')


exports.createRendererFunctionsBus = function createRendererFunctionsBus() {
  return new Proxy({}, {
    get(target, key, receiver) {
      return (msg) => {
        msg._$name = randomString()
        return new Promise((resolve, reject) => {
          ipcRenderer.send(`$rpc-${key}`, msg)
          ipcRenderer.once(msg._$name, (e, msg) => {
            resolve(msg)
          })
        })
      }
    },
    set(target, key, func) {
      target[key] = func
      // 每一个函数对应一个事件
      ipcRenderer.on(`$rpc-${key}`, (e, msg) => {
        const funcType = Object.prototype.toString.call(func)
        if (funcType === "[object AsyncFunction]") {
          // 异步函数
          func(msg).then(d => e.sender.send(msg._$name, d))
        } else {
          // 同步函数
          let d = func(msg)
          e.sender.send(msg._$name, d);
        }
      })
      return true
    }
  })
}
