import type { App, Directive, DirectiveBinding } from 'vue'

// 定义传入的回调函数
type ICallback = (borderBoxSize: readonly ResizeObserverSize[], ...args: any[]) => any
/**
 * 使用weakMap存储当前目标对象的执行回调 当前的目标对象作为key
 * 弱引用方便垃圾回收
 */
const resizeMap = new WeakMap<Element, ICallback>()
const resizeCallback: ResizeObserverCallback = (entries) => {
  entries.forEach((it) => {
    // console.log('it', it)
    // 获取当前存储的对象回调 并判断执行 如果需要  可以传入当前目标元素的最新尺寸信息
    const callback = resizeMap.get(it.target)
    callback && callback(it.borderBoxSize) // 交出最新的边框盒尺寸信息
  })
}
// 创建ResizeObserver实例
const resizeObserver = new ResizeObserver(resizeCallback)

export const setupResizeDirective = (app: App) => {
  const resize: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      // 将目标元素作为key存储进weakMap 值为传入的回调
      resizeMap.set(el, binding.value)
      // 监听当前元素
      resizeObserver.observe(el)
    },
    unmounted() {

    },
  }
  // 注册指令
  app.directive('resize', resize)
}
