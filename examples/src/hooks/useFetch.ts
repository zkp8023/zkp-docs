import type { UnwrapRef } from 'vue'
import { ref } from 'vue'

// 定义API函数的类型
interface APIFunction<M = any, N = any> {
  (params: M): Promise<N>
}
/**
 *
 * @param apiFunction 请求函数
 * @returns
 * data:请求函数返回结果(Ref),
 * loading:请求加载中状态,
 * error:请求错误对象,
 * excute(params:请求函数所需参数) -- 调用excute执行请求函数
 */
export function useFetch<P = any, R = any>(apiFunction: APIFunction<P, R>) {
  const data = ref<R | null>(null)
  const error = ref<any | null>(null)
  const loading = ref(false)

  // 执行器函数,调用请求函数,并返回成功结果
  const excute = async (params?: P) => {
    loading.value = true
    try {
      data.value = await apiFunction(params as NonNullable<P>) as UnwrapRef<R>
      return data.value
    }
    catch (err: any) {
      error.value = err
    }
    finally {
      loading.value = false
    }
  }

  return {
    data,
    error,
    loading,
    excute,
  }
}
