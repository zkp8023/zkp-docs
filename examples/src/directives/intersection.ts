import type { App, Directive, DirectiveBinding } from 'vue'

// 目标元素可视性变化需要执行的回调函数
type ICallback = (...args: any[]) => any

/**
 * 由于全局就只创建一个 observer 实例对象
 * 创建WeapMap 结构 存储监听的各个对象 没有使用Map结构,
 * 这样在目标元素被回收的时候存储的对象也自动回收,不会内存泄漏
 */
const intersctionMap = new WeakMap<Element, ICallback>()

/**
 * 初始配置对象和触发的回调函数 传递给 IntersectionObserver构造函数
 */
const options: IntersectionObserverInit = {
  root: null, // 根元素初始默认为可视窗口
  threshold: 1, // 默认让目标元素完全进入根元素就触发回调
}
const intersectionCallback: IntersectionObserverCallback = (entries, observerObj) => {
  // console.log('observerObj--实例对象', observerObj)

  // target:监听的目标元素   ,  isIntersecting: 是否进入可视区
  entries.forEach(({ target, isIntersecting }) => {
    // 获取WeakMap中存储的对应回调,并执行
    const callback = intersctionMap.get(target)
    console.log('isIntersecting', isIntersecting)
    // WeakMap.get(key)方法可能获取不到,先做判断再执行
    if (callback && isIntersecting)
      callback()
  })
}
// 创建观察者实例对象 全局创建一个实例 提高性能
const observer = new IntersectionObserver(intersectionCallback, options)

export const setupIntersectionDirective = (app: App) => {
  const intersection: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding<ICallback>) {
      // 元素挂载之后存储进WeakMap中
      intersctionMap.set(el, binding.value)
      // 监听当前目标元素的可见性
      observer.observe(el)
    },
    unmounted(el: HTMLElement) {
      /**
       * 目标元素卸载之后停止监听, 如果上面用的Map结构而不是WeakMap
       * 那么在卸载时还需要将Map中的存储对象删除 方便垃圾回收
       */
      observer.unobserve(el)
    },
  }
  // 注册指令
  app.directive('intersection', intersection)
}
