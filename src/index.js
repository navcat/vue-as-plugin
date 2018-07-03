// 路由列表
import modRoutes from './router'
// 接口配置
import {
  Apis
} from './config/apis'
// 事件、vuex
import {
  modState,
  ModMutations,
  ModActions,
  ModGetters,
  modActionType,
  ModModules
} from './store'

function assinObj (target, data) {
  if (target === undefined) {
    target = {}
  }
  Object.assign(target, data)
  return target
}

function assinArray (target, data) {
  if (target === undefined) {
    target = []
  }
  return target.concat(data)
}

function assinFuncObj (target, data, args) {
  if (target === undefined) {
    target = {}
  }
  for (let [k, v] of Object.entries(data)) {
    target[k] = v(args)
  }
  return target
}

export function install (Vue, appConfig) {
  // 合并routes
  appConfig.routes = assinArray(appConfig.routes, modRoutes)

  // 合并actionType
  appConfig.actionType = assinObj(appConfig.actionType, modActionType)

  // 合并apis
  appConfig.apis = assinObj(appConfig.apis, new Apis(appConfig.ipConfig))

  // 合并state
  appConfig.state = assinObj(appConfig.state, modState)

  // 合并mutations
  appConfig.mutations = assinObj(appConfig.mutations, ModMutations(appConfig.actionType))

  // 合并actions
  appConfig.actions = assinObj(appConfig.actions, ModActions(appConfig.actionType))

  // 合并getters
  appConfig.getters = assinObj(appConfig.getters, ModGetters(appConfig.actionType))

  // 合并modules
  appConfig.modules = assinFuncObj(appConfig.modules, ModModules, appConfig.actionType)
}

export default class CalcAdminMod {

}
CalcAdminMod.install = install
