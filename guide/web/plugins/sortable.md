# sortablejs

## 1. 拖拽库
`sortablejs`:一个js拖拽库,支持移动端
1. [sortablejs官网](https://sortablejs.github.io/Sortable/#simple-list)
2. [sortablejs中文网](http://www.sortablejs.com/index.html)
3. [原生js拖拽](/web/javaScript/event/拖拽事件)
## 2. 安装
:::code-group
```bash [js环境]
pnpm add sortablejs
```
```bash [ts环境]
pnpm add sortablejs
#  类型定义文件
pnpm add @types/sortablejs -D
```
:::

## 3.vue中使用

```ts
import type { SortableOptions } from 'sortablejs'
import Sortable from 'sortablejs'
// sortablejs配置项
const options = reactive<SortableOptions>({
  animation: 300, // 拖拽时的动画延时
})
onMounted(() => {
  /**
   * 1. 获取容器
   * 2. 调用create方法传入容器和配置项
   */
  const container = document.querySelector('#dragbleContainer') as HTMLElement
  Sortable.create(container, options)
})
```

### 1.基本示例
<!-- <SortableBasicDemo /> -->
<DemoBlock><SortableBasicDemo /></DemoBlock>

## 4.配置
### 4.1 允许拖拽元素和指定拖拽手柄
:::tip
`draggable` : 指定哪些元素可被拖拽, 一般不设置

`handle` : 指定拖拽手柄

`filter` : 指定哪些元素不能被拖拽

::: details
```vue
<script setup lang="ts">
import type { SortableOptions } from 'sortablejs'
import Sortable from 'sortablejs'
import { onMounted, reactive, ref } from 'vue'

const options = reactive<SortableOptions>({
  animation: 300,
  /**
   *  指定拖拽手柄的css类名,只有拖拽带myHandle类名的元素才能开始拖动
   */
  handle: '.myHandle',
  /**
   * 指定容器内哪些项目可被拖拽 一般不设置
   */
  draggable: '.item',
  /**
   * 过滤器  指定不进行拖拽的元素
   */
  filter: '.filter'
})
onMounted(() => {
  const container = document.querySelector('#sortableHandle') as HTMLElement
  Sortable.create(container, options)
})
const items = ref(['item1', 'item2', 'item3', 'item4'])
</script>

<template>
  <ul id="sortableHandle" class="flex gap-10px">
    <li v-for="it in items" :key="it" class="item text-12px">
      拖拽 {{ it }}
      <span class="myHandle rounded-3px bg-red p3px">拖拽手柄</span>
    </li>
    <!-- 这个不能被拖拽 -->
    <li class="text-12px filter">
      <span>filter</span>
      <!-- 这是拖拽手柄 -->
      <span class="myHandle rounded-3px bg-red p3px">手柄</span>
    </li>
  </ul>
</template>
```

:::
<DemoBlock><SortableHandle /></DemoBlock>

### 4.2 拖拽时的几种样式
::: tip
> 通过配置class 添加拖拽过程中不同阶段的元素样式

:::code-group

```ts [options]
const options = reactive<SortableOptions>({
  animation: 300, // 动画效果时间
  handle: '.myHandle', // 拖拽手柄
  ghostClass: 'ghostClass', // 等待被拖拽元素的样式 只有开始拖拽才生效
  dragClass: 'dragClass', // 拖拽时影子的css 类名  只有开始拖拽才生效

  /**
   *  被选中项元素的css 类名 如果指定了此项 那么ghostClass将失效
   */
  chosenClass: 'chosenClass',
})
```
```css
// style
.ghostClass {
  background: #9499ff;
}
.chosenClass{
  background: #f00;
}
.dragClass{
  background: blue;
}
```
:::

<DemoBlock><SortableClasses /></DemoBlock>

## 封装自定义指令实现拖拽
> 利用`sortablejs`库的拖拽功能 封装[vue自定义指令](https://cn.vuejs.org/guide/reusability/custom-directives.html#introduction)来实现拖拽

::: code-group

```ts [main.ts]
import plugins from '@/src/plugins'
// ...
app.use(plugins)
```

```ts [src/directives/sortable.ts]
import type { SortableOptions } from 'sortablejs'
import type { App, Directive, DirectiveBinding } from 'vue'
import Sortable from 'sortablejs'

// 全局拖拽指令 v-sortable
export const setupSortableDirective = (app: App) => {
  const sortable: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding<SortableOptions>) {
      Sortable.create(el, {
        animation: 300,
        ...binding.value,
      })
    },
    unmounted() {
      console.log('99')
    }
  }
  app.directive('sortable', sortable)
}
```

```vue [directive demo]
<template>
  <!-- 使用全局自定义指令实现拖拽 -->
  <ul
    id="sortableHandle"
    v-sortable="{ handle: '.myHandle', filter: '.filter' }"
    class="flex gap-10px"
  >
    <li v-for="it in items" :key="it" class="item text-12px">
      <span>拖拽 {{ it }}</span>
      <!-- 这是拖拽手柄 -->
      <span class="myHandle rounded-3px bg-red p3px">手柄</span>
    </li>
    <li class="text-12px filter">
      <span>filter</span>
      <!-- 这是拖拽手柄 -->
      <span class="myHandle rounded-3px bg-red p3px">手柄</span>
    </li>
  </ul>
</template>
```
:::