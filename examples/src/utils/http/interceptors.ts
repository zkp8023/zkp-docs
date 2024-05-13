import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { DefaultInterceptors } from './types'
import { handleStatus } from './handleStatus'

// 请求白名单 不需要携带token的接口请求
const whiteList = ['/login']
// 错误处理函数
const { checkRes, checkStatus } = handleStatus()

// 请求拦截器成功函数
function requestInterceptor(config: InternalAxiosRequestConfig) {
  console.log('请求拦截器', config)

  // 白名单直接通过
  if (whiteList.includes(config.url!))
    return config
  //   else
  //     // 其他接口添加token认证
  //     config.headers.Authorization = 'Berear 一个token'
  return config
}

// 请求拦截器失败函数
function requestInterceptorCatch(err: any) {
  console.log('配置请求拦截器失败函数')
  return Promise.reject(err)
}

// 响应成功函数
function responseInterceptor(reponse: AxiosResponse) {
  console.log('响应拦截器reponse', reponse)
  const { status, statusText } = reponse
  // http请求错误 状态码不为200
  if (reponse.status !== 200) {
    // 错误提示
    checkStatus(status, statusText)

    return reponse
    // 抛出错误
    // throw new Error(reponse.data)
  }
  else {
    // http状态码为200 判断约定ajax码
    const { code, message } = reponse.data
    // 这里的 200 可以声明枚举引入
    if (code === 200) {
      return reponse
    }
    else {
      // 约定ajax状态不为200
      checkRes(code, message)
      return Promise.reject(reponse)
    }
  }
}

// 响应失败函数
function reponseInterceptorCatch(err: any) {
  console.log('配置响应拦截器失败函数')
  return Promise.reject(err)
}

export const interceptors: DefaultInterceptors = {
  requestInterceptor,
  responseInterceptor,
  requestInterceptorCatch,
  reponseInterceptorCatch,
}
