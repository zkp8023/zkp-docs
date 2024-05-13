import { message } from 'ant-design-vue'

export const handleStatus = () => {
  let errMessage = ''
  /**
   * 状态返回401 处理函数  清空用户信息和token 跳转到login
   */
  const handle401 = () => {
    /**
     * 1. 清空用户信息
     * 2. 清空token
     * 3. 跳转登录
     */

  }

  /**
   *
   * @param status http状态码
   */
  const checkStatus = (status: number, msg: string) => {
    switch (status) {
      case 400:
        errMessage = `${msg}`
        break
      case 401:
        handle401()
        break
      case 403:
        errMessage = '用户得到授权，但是访问是被禁止的。!'
        break
      case 404:
        errMessage = '网络请求错误,未找到该资源!'
        break
      case 405:
        errMessage = '网络请求错误,请求方法未允许!'
        break
      case 408:
        errMessage = '网络请求超时!'
        break
      case 500:
        errMessage = '服务器错误,请联系管理员!'
        break
      case 501:
        errMessage = '网络未实现!'
        break
      case 502:
        errMessage = '网络错误!'
        break
      case 503:
        errMessage = '服务不可用，服务器暂时过载或维护!'
        break
      case 504:
        errMessage = '网络超时!'
        break
      case 505:
        errMessage = 'http版本不支持该请求!'
        break

      default:
        break
    }
    if (errMessage)
      message.error(errMessage)
  }
  /**
   * http状态码为200但ajax状态不为200时的错误处理
   * @param code 跟后端约定的ajax状态码
   * @param message
   */
  const checkRes = (code: number, msg: string) => {
    if (code === 401) {
      handle401()
    }
    else {
      // 弹出提示信息
      message.error(msg || '请求失败')
    }
  }

  return { checkStatus, checkRes, handle401 }
}
