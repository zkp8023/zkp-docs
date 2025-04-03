# [ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)
## 1. 盒模型
:::tip 盒模型
**1. 内容盒(IE盒模型,怪异盒模型)**:`content-box` <br />
是盒模型放置内容的部分，`css`设置的`width和height`属性只包含内容区域的宽高.

元素`padding`的变化会撑大或缩小元素整体区域的布局占位,元素内容区域保持不变

**2. 边框盒(标准盒模型)**:`border-box` <br />
`css`设置的`width和height`属性包含内容、内边距和边框。这意味着边框盒减去内边距和边框的宽度就是内容盒。

元素`padding`的变化不会改变元素整体布局占位的大小,但是内容区域大小会被改变
:::

>`ResizeObserver` 避免了通过回调函数调整大小时，通常创建的无限回调循环和循环依赖项。它只能通过在后续的帧中处理 `DOM` 中更深层次的元素来做到这一点。如果它的实现遵循规范，则应在绘制前和布局后调用 `resize` 事件。 ---- 跟`IntesectionObserver`一样,都相当于是异步的

## 2. ResizeObserver()构造函数
>`ResizeObserver` 构造函数创建一个新的 `ResizeObserver` 对象，它可以用于监听 `Element` 内容盒或边框盒或者 `SVGElement` 边界尺寸的大小

```ts
const observer = new ResizeObserver(callback)
```
### 2.1 ResizeObserver()构造函数参数

:::details 查看参数
- `callback` <br />
   每当观测的元素调整大小时，调用该函数。目标元素挂载之后会立即执行一次,之后每次尺寸变化执行,该函数接收两个参数：

   - `entries` <br />
    一个 `ResizeObserverEntry` **对象数组**，可以用于获取每个元素改变后的新尺寸。

   - `observer` <br />
     对 `ResizeObserver` 自身的引用(构造函数创建的实例)，因此需要它的时候，你要从回调函数的内部访问。例如，这可用于在达到特定的情况时，自动取消对观察者的监听，但如果你不需要它，可以省略它。

```ts
function callback(entries, observer) {
  for (const entry of entries) {
    // Do something to each entry
    // and possibly something to the observer itself
  }
}
```
:::

## 3. ResizeObserver实例

> 一个可以监听目标元素尺寸变化的新的ResizeObserver 实例。调用自身的observe() 方法开始监听指定目标。

实例对象上并无属性,有以下方法:
:::details observe(target[,options])
 `observe(target,options)` : 用于监听指定的`Element`目标元素,
   - `target` : 对要监听的 Element 或 SVGElement 的引用。
   - `options可选` : 配置对象
      - `box`
         设置 observer 将监听的盒模型。可能的值是：

         - content-box（默认）
             CSS 中定义的内容区域的大小。

         -  border-box
            CSS 中定义的边框区域的大小。
 ```ts
 const resizeObserver = new ResizeObserver(callback)
 resizeObserver.observe(divElem, { box: 'border-box' })
 ```
:::

:::details unobserve()
`unobserve(target)` : 结束对指定的 `Element` 或 `SVGElement` 的监听。
:::

:::details disconnect()
`disconnect()`: 取消所有的对 `Element` 或 `SVGElement` 目标的监听
:::

## 4. ResizeObserverEntry对象

:::tip
`ResizeObserverEntry` 对象是传递给 `ResizeObserver(callback)` 构造函数中的回调函数(callback)参数的对象，它允许你获取真正在观察的 `Element` 或 `SVGElement` 最新的大小。
:::
| 属性               | 说明                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **borderBoxSize**  | 边框盒宽高信息                                                                                         |
| **contentBoxSize** | 内容区域宽高信息                                                                                       |
| **contentRect**    | **内容区域**矩形信息(返回结果与[element.getBoundingClientRect()](../sizePosition/element元素视图)相同) |
| **target**         | 监听的目标元素                                                                                         |

## 5. 封装vue指令监听目标元素
<DemoBlock><ResizeObserver /></DemoBlock>

:::details 代码实现
:::code-group
```ts [src/directives/resize.ts]
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
```
```ts [src/ditectives/index.ts]
import { App } from 'vue'
import { setupResizeDirective } from './resize'

export const setupDirectives = (app: App) => {
  // 注册监听元素尺寸变化
  setupResizeDirective(app)
}
```
```ts [main.ts]
const app = createApp(App)

// 注册全局自定义指令
setupDirectives(app)
```
```vue [demo.vue]
<script setup lang='ts'>
const height = ref()
const width = ref()
// 接口声明回调函数调用签名
interface ICallback {
  (boxSize: readonly ResizeObserverSize[]): void
}
const callback: ICallback = (boxSize) => {
  const { blockSize, inlineSize } = boxSize[0]
  height.value = inlineSize
  width.value = blockSize
}
</script>

<template>
  <div
    v-resize="callback"
    class="target"
  >
    <h1>给我一个div</h1>
    <p>width:{{ width }}</p>
    <p>height:{{ height }}</p>
  </div>
</template>

<style scoped lang="scss">
.target{
  @apply size-200 m-auto text-(center 18) bg-red-300 border-(10px solid blue) p20 resize overflow-hidden
}
</style>
```
:::

:::tip VueUse
vue项目的hooks库[VueUse](https://vueuse.org/)对`ResizeObserver`进行了封装,可以直接使用[useResizeObserver](https://vueuse.org/core/useResizeObserver/)
:::