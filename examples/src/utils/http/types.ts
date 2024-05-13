import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

// 自定义拦截器类型
export interface DefaultInterceptors {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (reponse: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
  reponseInterceptorCatch?: (err: any) => any
}
// 定义配置对象 扩展axios默认的 AxiosRequestConfig 类型
export interface IRequestConfig extends AxiosRequestConfig {
  interceptors?: DefaultInterceptors
}

// 全局的返回泛型接口 一般放在全局的类型文件中直接使用
export interface IGlobal_Res<T = any> {
  code: number
  data: T
  message: string
}
// get,post,delete等 单独封装的接口配置类型
export type HandleConfig = Omit<AxiosRequestConfig, 'method' | 'url'> & { loading?: boolean }
