## reactive,shallowReactive,readonly,shallowReadonly
::: code-group

```ts [utils.ts]
// 判断是否为对象
export const isObject = (val: any) => typeof val === 'object' && val !== null

export function warn(msg: string, ...args: any[]) {
  console.warn(`[Vue warn] ${msg}`, ...args)
}

export const assign = Object.assign
```

```ts [reactive.ts]
import { isObject, warn } from './utils'
import { mutableHandlers, readonlyHandlers, shallowReactiveHandlers, shallowReadonlyHandlers } from './handlers'

// 缓存代理对象 防止重复代理
const reactiveMap = new WeakMap()
const shallowReactiveMap = new WeakMap()
const readonlyMap = new WeakMap()
const shallowReadonlyMap = new WeakMap()

// reactive实现
export function reactive(target: object) {
  return CreateReactive(target, false, mutableHandlers, reactiveMap)
}
// shallowReactive实现
export function shallowReactive(target: object) {
  return CreateReactive(target, false, shallowReactiveHandlers, shallowReactiveMap)
}
// readonly实现
export function readonly(target: object) {
  return CreateReactive(target, true, readonlyHandlers, readonlyMap)
}
// shallowReadonly实现
export function shallowReadonly(target: object) {
  return CreateReactive(target, false, shallowReadonlyHandlers, shallowReadonlyMap)
}

/**
 * 创建响应式对象公共方法
 * @param  target 目标对象
 * @param  isReadonly 是否创建只读代理对象
 * @param  baseHandler ProxyHandler
 * @returns  Proxy代理对象
 */
function CreateReactive(
  target: object,
  isReadonly: boolean,
  baseHandler: ProxyHandler<object>,
  proxyMap: WeakMap<WeakKey, any>,
) {
  // 如果目标对象不是对象类型, 则直接返回目标对象,reactive不能处理简单数据类型响应式
  if (!isObject(target)) {
    warn(`value cannot be made reactive: ${String(target)}`)
    return target
  }
  // 在缓存中查找当前目标对象是否已经经过代理,有代理就直接返回原代理对象
  const existingProxy = proxyMap.get(target)
  if (existingProxy)
    return existingProxy

  // target是对象,并且之前并未被代理过  创建新的代理对象并缓存起来
  const proxy = new Proxy(target, baseHandler)
  proxyMap.set(target, proxy)
  console.log('proxy', proxy)
  return proxy
}
```

```ts [handlers.ts]
import { assign, isObject, warn } from './utils'
import { reactive, readonly } from './reactive'

/**
 * @description:  创建 new Proxy(target,handler)中的handler对象
 */
type Key = string | symbol
// 创建handler对象中的getter函数
function CreateGetters(isReadonly: boolean = false, isShallow: boolean = false) {
  return function get(target: object, key: Key, receiver: object) {
    // 当前访问的代理对象属性值
    const result = Reflect.get(target, key, receiver)
    console.log('result', result)
    // 当前访问的属性不是只读的,说明这个值可能被更改,会在这里收集依赖
    if (!isReadonly) {
      // TODO依赖搜集
      console.log('收集依赖', key, result)
    }
    // 浅层代理,取值后直接返回
    if (isShallow)
      return result

    /**
     * 当前取到的值是一个对象,继续对这个值作代理,相较于vue2的响应式,vue3的深层代理是懒执行的,
     * 只有个访问到这个深层属性的时候才会对其做出代理,vue2是一上来就使用Object.defineProperty()循环递归做代理
     */
    if (isObject(result)) {
      // 递归
      return isReadonly ? readonly(result) : reactive(result)
    }
    // 其他情况直接返回
    return result
  }
}

function CreateSetters() {
  return function set() {
    // TODO
  }
}
const readonlySetter = {
  set() {
    warn('不能修改只读属性')
    return true
  },
}
// reactive handler
const mutableHandlers: ProxyHandler<object> = {
  get: CreateGetters(),
}
// shadowReactive handler
const shallowReactiveHandlers: ProxyHandler<object> = {
  get: CreateGetters(false, true),
}
// readonly handler
const readonlyHandlers: ProxyHandler<object> = assign({
  get: CreateGetters(true),
}, readonlySetter)

// shallowReadonly handler
const shallowReadonlyHandlers: ProxyHandler<object> = assign({
  get: CreateGetters(true, true),
}, readonlySetter)

export {
  mutableHandlers,
  shallowReactiveHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
}
```
:::