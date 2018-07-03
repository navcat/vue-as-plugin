// import * as types from './mutation-types'

export default types => ({
  /**
   * 设置用户登录信息
   */
  [types.UPDATE_USER_INFO] (state, payload) {
    state.userInfo = { ...state.userInfo,
      ...payload
    }
  }
})
