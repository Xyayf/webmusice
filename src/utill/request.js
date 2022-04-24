import axios from 'axios'
import store from '../store'
import { Loading } from 'element-ui'
import { confirmInstance } from '@/components/confirm.vue'

const BASE_URL = '/netease-api'

// 创建没有loading和confrim效果的请求实例
export const service = createBaseInstance()

// 创建有loading和confirm效果的请求实例
export const request = createBaseInstance()
mixin(request)

// 创建请求基本实例函数
function createBaseInstance () {
  const service = axios.create({
    baseURL: BASE_URL
  })
  service.interceptors.response.use(handleResponse, handleError)
  service.interceptors.request.use((config) => {
    // if (store.state.user.token) {
    //   config.headers.Authorization = `Bearer${store.state.user.token}`
    // }
    if (store.getters.token) {
      config.headers.Authorization = `Bearer${store.getters.user}`
    }
    return config
  })
  return service
}
// response拦截器响应成功处理函数
function handleResponse (res) {
  return res.data
}
// response拦截器响应失败处理函数
function handleError (err) {
  //   处理服务器返回的401错误
  if (err.response && err.response.data && err.response.data.code === 401) {
    store.dispatch('user/loginOut')
  }
  return Promise.reject(err)
}

let loading
let loadingCount = 0 // 用于控制多发请求时
// const confirmInstance = creatConfirm()
function mixin (baseInstance) {
  const interceptors = baseInstance.interceptors
  interceptors.request.use(handleLoading)
  interceptors.response.use(handleLoadingResponse, handleLoadingError)
}

function handleLoading (config) {
  if (!loading) {
    loading = Loading.service({
      text: '加载中...',
      target: '.context',
      background: 'transparent'
    })
  }
  loadingCount++
  return config
}
function closeLoading () {
  loadingCount--
  if (loadingCount === 0) {
    if (loading) {
      loading.close()
      loading = null
    }
  }
}
function handleLoadingError (err) {
  closeLoading()
  return Promise.reject(err)
}

function handleLoadingResponse (res) {
  closeLoading()
  const { message, code } = res
  if (message) {
    confirmInstance(message, code)
    return Promise.reject(message)
  } else {
    return res
  }
}
