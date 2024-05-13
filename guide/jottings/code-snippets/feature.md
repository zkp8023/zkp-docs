## 1. 鼠标点击元素拖拽

:::details 函数
```ts
/**
 *
 * @param el 需要拖拽的元素 设置绝对定位
 */
export const dragEl = (el: HTMLElement) => {
  if (!el)
    return

  let flag = false
  let x = 0
  let y = 0
  const parent = el.offsetParent as HTMLElement || document
  // 元素垂直水平方向的可活动范围
  const w = parent.offsetWidth - el.offsetWidth
  const h = parent.offsetHeight - el.offsetHeight

  const move = (e: MouseEvent) => {
    if (!flag)
      return
    const left = e.clientX - x
    const top = e.clientY - y
    /**
     * 限定当前元素活动在其父级元素内
     *  当前元素的第一个带定位祖先减去当前元素的宽高
     */

    // 限定范围核心代码
    const lf = Math.min(Math.max(0, left), w)
    const tp = Math.min(Math.max(0, top), h)
    el.style.left = `${lf}px`
    el.style.top = `${tp}px`
  }
  const down = (e: MouseEvent) => {
    flag = true
    x = e.offsetX
    y = e.offsetY
    // 清除上次的事件
    document.addEventListener('mousemove', move)
  }

  const up = () => {
    flag = false
    // el.removeEventListener('mousedown', down)
    document.removeEventListener('mousemove', move)
  }
  el.addEventListener('mousedown', down)
  // 鼠标弹起事件绑定在文档上,防止鼠标移出当前元素跟随
  document.addEventListener('mouseup', up)

  // 卸载清除事件
  onUnmounted(() => {
    el.removeEventListener('mousedown', down)
  })
}
```
:::
:::details 自定义指令
:::code-group
```ts [src/directives/dragElement.ts]
import type { App, Directive } from 'vue'

export const setupDragElement = (app: App) => {
  let flag = false
  let x = 0
  let y = 0
  const dragElement: Directive = {
    mounted(el: HTMLElement) {
      const parent = el.offsetParent as HTMLElement || document
      // 元素垂直水平方向的可活动范围
      const w = parent.offsetWidth - el.offsetWidth
      const h = parent.offsetHeight - el.offsetHeight
      const move = (e: MouseEvent) => {
        if (!flag)
          return
        const left = e.clientX - x
        const top = e.clientY - y

        // 限定范围核心代码
        const lf = Math.min(Math.max(0, left), w)
        const tp = Math.min(Math.max(0, top), h)
        el.style.left = `${lf}px`
        el.style.top = `${tp}px`
      }
      const down = (e: MouseEvent) => {
        flag = true
        x = e.offsetX
        y = e.offsetY
        // 清除上次的事件
        document.addEventListener('mousemove', move)
      }

      const up = () => {
        flag = false
        document.removeEventListener('mousemove', move)
      }
      el.addEventListener('mousedown', down)
      // 鼠标弹起事件绑定在文档上,防止鼠标移出当前元素跟随
      document.addEventListener('mouseup', up)
    },
  }
  app.directive('dragElement', dragElement)
}
```

```ts [src/ditectives/index.ts]
import { App } from 'vue'
import { setupDragElement } from './resize'

export const setupDirectives = (app: App) => {
  // 拖拽元素
  setupDragElement(app)
}
```
```ts [main.ts]
const app = createApp(App)

// 注册全局自定义指令
setupDirectives(app)
```
```vue [demo.vue]
<template>
  <div class="wraper relative bg-sky size-600px">
    <div ref="drag" v-dragElement class="drag absolute fcc cur-p select-none bg-red text-white size-80px">
      给我一个div
    </div>
  </div>
</template>
```
:::

## 2. Sku
<!-- 引用sku文件 -->
<!-- @include: ./feature-code/sku.md -->