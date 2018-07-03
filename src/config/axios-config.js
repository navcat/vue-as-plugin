/**
 * 接口调用配置
 */

const getParameter = function (name) {
  let reg = new RegExp('(^|/?|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.href.match(reg)
  if (r !== null) return decodeURIComponent(r[2])
  return null
}

const getCookie = function (sName) {
  let aCookie = document.cookie.split('; ')
  for (let i = 0; i < aCookie.length; i++) {
    let aCrumb = aCookie[i].split('=')
    if (sName === aCrumb[0]) return decodeURIComponent(aCrumb[1])
  }
  return ''
}

const AxiosConfig = {
  /**
   * @param resultCode int http状态码
   */
  errResponse (resultCode) {
    switch (resultCode) {
      case 401:
        // 跳转到SSO
        break
      case 417:
        // 跳转到SSO
        break
      case 500:
        alert('网络繁忙')
        break
    }
  },
  ajaxFilters (axios) {
    // 缓存作用域
    axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
    // 携带上次的token
    axios.defaults.withCredentials = true

    // 请求拦截器
    axios.interceptors.request.use(config => {
      // Do something before request is sent
      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })

    // 响应拦截器
    axios.interceptors.response.use(response => {
      let resultCode = response.data.resultCode
      this.errResponse(resultCode) // 处理错误信息
      // Do something with response data
      return response
    }, error => {
      let resultCode = ''
      if (error.response) {
        resultCode = error.response.status
      }
      this.errResponse(resultCode) // 处理错误信息
      // Do something with response error
      return Promise.reject(error)
    })
  },
  install (Vue, axios) {
    // 配置默认的ajax
    let ajax = axios.create()

    // 配置form表单方式提交
    let ajaxForm = axios.create({
      transformRequest: [function (data) {
        let ret = ''
        if (typeof data === 'object') {
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
        } else {
          ret = data
        }
        return ret
      }],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })

    // 使用FormData的方式上传文件
    let ajaxFile = axios.create({
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    this.ajaxFilters(ajax)
    this.ajaxFilters(ajaxForm)
    this.ajaxFilters(ajaxFile)

    Vue.axios = axios

    Object.defineProperties(Vue.prototype, {

      axios: {
        get () {
          return axios
        }
      },

      $ajaxForm: {
        get () {
          return ajaxForm
        }
      },
      $ajaxFile: {

        get () {
          return ajaxFile
        }
      },

      $ajax: {
        get () {
          return ajax
        }
      },

      getParameter: {
        get () {
          return getParameter
        }
      },

      getCookie: {
        get () {
          return getCookie
        }
      }

    })
  }
}

export default AxiosConfig
