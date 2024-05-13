import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, Method } from 'axios'
import axios from 'axios'
import type { DefaultInterceptors, HandleConfig, IGlobal_Res, IRequestConfig } from './types'
import { interceptors } from './interceptors'
import { handleStatus } from './handleStatus'

// 定义初始化默认配置
const initConfig: AxiosRequestConfig = {
  baseURL: '',
  timeout: 15000,
}
const { checkRes } = handleStatus()
class Http {
  private instance: AxiosInstance
  private interceptors: DefaultInterceptors
  /**
 *
 * @param config IRequestConfig 自定义扩展的配置类型 加了interceptors拦截器字段配置对象
 */
  constructor(config: IRequestConfig) {
    this.instance = axios.create(config)
    //   给当前实例添加配置中传入的拦截
    this.interceptors = config.interceptors || {}

    const {
      requestInterceptor,
      requestInterceptorCatch,
      responseInterceptor,
      reponseInterceptorCatch,
    } = this.interceptors

    /**
       * 添加拦截器,分为实例传入的拦截器和所有的实例的默认拦截器 执行顺序已标出序号
       * 根据书写顺序不同会有不同的执行顺序(不是必须,页可以不用全局拦截器)
       */

    // 2.实例传入的请求拦截器
    this.instance.interceptors.request.use(requestInterceptor, requestInterceptorCatch)

    // 3. 实例传入的响应拦截器
    this.instance.interceptors.response.use(responseInterceptor, reponseInterceptorCatch)

    // 1. 所有实例的默认拦截器
    this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      console.log('全局请求的拦截器')
      return config
    }, (err) => {
      console.log('err', err)
    })

    // 4. 所有实例响应的拦截器
    this.instance.interceptors.response.use((reponse) => {
      console.log('全局响应的拦截器')
      return reponse
    }, (err) => {
      return Promise.reject(err)
    })
  }

  /**
   * 请求方法request 后续所有的请求都经过这个方法
   * @param config IRequestConfig 定义成自定义的config
   * @returns
   */
  async request<T>(config: IRequestConfig & { method: Method }) {
    try {
      const res = await this.instance.request<IGlobal_Res<T>>(config)
      const { code, message } = res.data
      return res.data
    }
    catch (error) {
      // todo 处理拦截器抛出的错误 或者将错误继续往后抛
      console.log('error', error)
      return Promise.reject(error)
    }
  }

  get<T>(url: string, params?: unknown, config?: HandleConfig) {
    return this.request<T>({ ...config, method: 'GET', url, params })
  }

  post<T>(url: string, data?: unknown, config?: HandleConfig) {
    return this.request<T>({ ...config, method: 'POST', url, data })
  }
}
/**
 * 传入初始化默认配置和拦截器配置,生成不同实例,可传入不同的拦截器和默认初始化配置
 */
export const http = new Http({ ...initConfig, interceptors })
