# vue-tsx
## 1. vite项目使用tsx

:::code-group
```ts[安装tsx插件]
pnpm i @vitejs/plugin-vue-jsx
```
```ts[vite.config.ts]
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
    //...开启jsx支持
    plugins:[ vuejsx() ]
})
```
:::

## 2. setup函数中的jsx(.vue文件)
```vue
<!-- 脚本 lang=tsx -->
<script lang="tsx">
export default defineComponent({
  name: 'JsxDemo',
  props: ['message'],
  emits: ['custom'],
  setup(porps, ctx) {
    const count = ref(99)
    /**
     * setup函数中使用jsx 需要返回箭头函数,由箭头函数(相当于render函数)返回jsx内容
     */
    return () => (
      <>
      {/* 在jsx中使用vue响应式变量,不会自动解包,ref变量需要手动.value */}
        <div>这是jsx写的内容--{count.value}</div>
      </>
    )
  },
})
</script>

```

## 3. tsx文件中setup
```tsx
// demo.tsx
import { defineComponent ,ref } from 'vue'
export default defineComponent({
  name: 'JSX',
  // 需要声明props才能在setup参数中拿到
  props:['message']
  setup(props, ctx) {
    const { message } = props
    const count = ref(99)
    return () => (
      <>
        <div class='text-red'>这是tsx文件里写的tsx---{count.value}</div>
      </>
    )
  },
})
```
## 4. tsx文件中使用函数式组件
```tsx
import type { FunctionalComponent } from 'vue'

interface IProps {
  message: string
}
const FuncDemo: FunctionalComponent<IProps> = (props, { emit, slots, attrs }) => {
  console.log('emit', emit)
  console.log('slots', slots)
  console.log('attrs', attrs)
  const { message } = props // 解构仍是响应式
  // 直接返回jsx内容
  return (
    <>
    <div class='text-(30px red)'>{message}</div>
    </>
  )
}
export default FuncDemo

```

## 5. setup语法糖中使用函数式组件
```vue
<script setup lang='tsx'>
import type { FunctionalComponent } from 'vue'
interface IFuncProps {
  status: number
}
// 定义状态枚举 提到enums文件夹下
const statusEnum = [
  { value: 0, lable: '进行中', color: '#f00' },
  { value: 1, lable: '已完成', color: 'green' },
]

/**
 * 在setup语法糖中定义一个函数式组件 传入不同的状态显示不同颜色的lable
 * @param props 状态值
 */
const statusCom: FunctionalComponent<IFuncProps> = (props, { emit }) => {
  const { status } = props
  const res = statusEnum.find(it => it.value === status)
  return <span style={{ color: res?.color }}>{res?.lable}</span>
}
</script>

<template>
  <!-- 进行中 红色 -->
  <statusCom :status="0" />
</template>

```

## 6. vue2中选项写法

vue组件的本质是带有render函数的对象

```ts
const comObject = {
  // 未声明的prop会挂到this.$attrs上
  props: {
    options: {
      type: Object,
      required: true,
    },
  }, // 未声明的prop会挂到attrs上
  emits: ['dd'],
  data() { return { a: 1 } },
  render(props) {
    console.log('props', props)
    console.log('this', this)
    return (<>
         {props.options.title}
        </>)
  },
}

```
## 7. 封装命令式组件
::: code-group
```tsx [message.tsx]
import type { FunctionalComponent } from 'vue'
import { h, render } from 'vue'

const messageBox: FunctionalComponent<IProps> = (props, { emit }) => {
  console.log('props', props)
  const { title, onClose } = props
  return (
    // TODO 样式根据type来定 , 动态绑定样式类名即可
    <div class=" animated-(~ fade-in) fixed top-20 left-1/2 translate-x-(-1/2) bg-red border-(1 solid blue) px40 py20">
      <span>{title}</span>
      <p class="text-(center 20px #FFF)">
        <button onClick={() => onClose && onClose()}>点击关闭</button>
        </p>
    </div>
  )
}

function showMessage(options: IProps) {
  // 创建节点添加到body
  const dom = document.createElement('div')
  document.body.append(dom)
  const onClose = () => {
    const { onClose } = options
    console.log('关闭')
    dom.remove()
    onClose && onClose()
  }
  // 创建虚拟节点
  const vNode = h(messageBox, { ...options, onClose })
  // 渲染虚拟节点为真实dom到指定节点
  render(vNode, dom)
}

export default showMessage
```
```vue [demo.vue]
<script setup lang='ts'>
import showMessage from './message'

function handle() {
  showMessage({
    type: 'error',
    title: '一個消息',
    onClose() {
      console.log('关闭之后的回调')
    },
  })
}
</script>
```

:::