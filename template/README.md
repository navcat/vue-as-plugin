# 概述

> 将vue项目封装成插件，任何其他项目可以通过Vue.use()的形式安装该项目，安装时会自动合并VueRouter,Vuex，接口配置等信息

## 项目依赖

1. vue
2. vuex
3. axios
4. vue-router

## 包含功能
### 公共资源使用CDN
vue、vuex、axios、vue-router属于公共资源，直接使用了CDN资源，减少打包后的vendor.js

### 兼容IOS8
内置babel-polyfill，最低兼容IOS8

### 使用sass开发

### 插件安装
根据本模板开发的vue项目即为一个vue插件，可以通过Vue.use()直接在main.js安装使用

1. 引入该模块

假设开发的模块为 ** MyMod **

```
import MyMod from './index'
```
如果自己搭建了私服，则可以使用npm进行安装后再引入
```
npm install mymod

import MyMod from 'mymod'
```

2. 使用该模块
```
// 变量，用于合并模块信息， ipConfig 为接口的根路径配置信息
let appConfig = {ipConfig}
// 安装并使用
Vue.use(CalcAdminMod, appConfig)
```

3. 配置全局变量
```
let {state, mutations, actions, modules, getters, routes, apis, actionType} = appConfig

/// 全局配置接口地址和mutation-types
// 可以直接通过 this.apis.xxx 访问接口地址
// 通过 this.actionType 提交mutation或action
Vue.mixin({
  data () {
    return {
      apis,
      actionType
    }
  },
  created: function () {
    // 逻辑...
  }
})
```
4. 使用vuex
```
// 定义状态管理
let store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  getters
})

```
5. 使用vue-router
```
let router = new Router({
  mode: 'history',
  routes
})
```
6. 实例化vue
```
// 实例化vue对象
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
```


## 开发及构建步骤

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
