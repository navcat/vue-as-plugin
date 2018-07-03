class Apis {
  constructor (ipConfig) {
    this.mShopApis = mShopApis(ipConfig)
  }
}

// 商城API地址
const mShopApis = (ipConfig) => {
  return {
    homeUrl: ipConfig.apiBseUrl + 'xxx' // 接口地址
  }
}

export {
  mShopApis,
  Apis
}
