# electron-callable [WIP]

简洁易用的 Electron IPC 帮手，让您像直接调用函数一样使用 IPC。
本项目还在开发中，请谨慎使用。当然，代码如此简单，改起来也很简单。

## How does this work?

其实只是利用了 ES6 的 Proxy 拦截了函数访问和定义，将其自动转为 `ipcMain.on` 或 `ipcRenderer.on`。

## Features

- [x] 支持 `Functions.funcName()` 形式调用
- [x] 提供了 `async/await` 异步函数的支持
- [ ] 全局共享变量，及对该变量对 `watch` 功能支持
- [ ] 更易用的发布订阅功能
- [ ] 支持不同窗口之间的调用

## How do I get this?

从 npm 中安装
```
npm install electron-callable
# or yarn add electron-callable
```

## How do I use this?

您可以在 `example` 中查看所有功能的用例示范。
```shell
git clone https://github.com/Feiox/electron-callable
cd electron-callable && npm i
npm run start
```

### 简单使用

在主进程中使用

```js
const { createMainFunctionsBus } = require('electron-callable')
// 初始化，需要主渲染窗口对象作为参数
const Fun = createMainFunctionsBus(win)

// 定义一个函数
Fun.demoSync = function (msg) {
  return { resp: 'ok' }
}
```

在渲染进程中使用

```js
const { createRandererFunctionsBus } = require('electron-callable')
// 初始化
const Fun = createRandererFunctionsBus()

// 函数接受一个对象作为参数，调用之后返回一个 Promise
Fun.demoSync({ k: '123' }).then(d => {
  console.log('recv from main', d)
})
```

同样，在渲染进程中定义的函数，在主进程中也可以直接调用。

⚠️注意：
- 启动之后，在渲染窗口未完成渲染时会出现无法调用的情况。

### 所有功能

todo

### API

todo
