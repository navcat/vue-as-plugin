// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入Vue框架及各模块
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import axios from 'axios'
import Router from 'vue-router'
import ipConfig from './config/ipConfig'
import AxiosConfig from './config/axios-config'

import MyMod from './index'
import filters from './filters'

Vue.use(Vuex)
Vue.use(Router)
// axios 配置
Vue.use(AxiosConfig, axios)

let appConfig = {ipConfig}
Vue.use(MyMod, appConfig)

Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) // 注册过滤器

let {state, mutations, actions, modules, getters, routes, apis, actionType} = appConfig

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

// 定义状态管理
let store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  getters
})

let router = new Router({
  mode: 'history',
  routes
})

// 实例化vue对象
let app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
console.log(app)
