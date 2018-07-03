
import ModMutations from './mutations'
import ModActions from './actions'
import ModGetters from './getters'
import * as modActionType from './mutation-types'

const ModModules = {
}

const modState = {
  // 用户信息
  userInfo: {
    username: '' // 用户名
  }
}

export {modState, ModMutations, ModActions, ModGetters, modActionType, ModModules}
