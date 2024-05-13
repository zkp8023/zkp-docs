# IntersectionObserver
##  [1.IntersectionObserver介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)
> `Intersection Observer API`接口提供了一种<b style="color:#f00">异步</b>检测目标元素与祖先元素或视口(可统称为根元素)相交情况变化的方法

:::danger 注意点：
 因为该 API 是异步的，它不会随着目标元素的滚动同步触发，而IntersectionObserver API是通过[requestIdleCallback()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)实现，即只有浏览器空闲下来，才会执行观察器。这意味着这个观察器的优先级非常低。
:::

**应用场景:**
1. 图片懒加载
2. 数据懒加载
3. 无限滚动

## 2. IntersectionObserver概念
:::info
1. **目标(target)元素** --- 我们要监听的元素
2. **根(root)元素** --- 帮助我们判断目标元素是否符合条件的元素
以下两种情况根元素会默认为顶级文档的视口(一般为 html)。
- 目标元素不是可滚动元素的后代且不传值时
- 指定根元素为 null

3. **交叉比(intersection ratio)**---目标元素与根根的交集相对于目标元素百分比的表示(取值范围 0.0-1.0)。
4. **阈值(threshold)** --- 回调函数触发的条件。
5. **回调函数(callback)** --- 为该 API 配置的函数，会在设定的条件下触发。
:::

## 2. IntersectionObserver构造函数

> 创建一个新的 IntersectionObserver 对象，当其监听到目标元素的可见部分（的比例）超过了一个或多个阈值（threshold）时，会执行指定的回调函数。

<a-image :preview="true" src="/docs/images/javaScript/intersectionObserver.png"/>

```ts
/**
 * 返回一个可以使用规定阈值监听目标元素可见部分与root交叉状况的新的
 * IntersectionObserver 实例对象。
 * 调用自身的observe() 方法, 开始使用规定的阈值监听指定目标。
 */
const observer = new IntersectionObserver(callback[, options]);
```

### 2.1 IntersectionObserver参数
:::details 点击查看参数
1. `callback`(**必选参数**) --- 当交叉比超过指定阈值触发回调函数，此函数可接受两个参数：
   - `entries` --- 由`IntersectionObserverEntry`对象(下面介绍)组成的数组,但每个被触发的阈值，都或多或少与指定阈值有偏差。
   - `observer` --- 返回被调用的`IntersectionObserver`实例。

2. `options`(**可选参数**) --- 用于配置回调函数触发的条件：
   1. `root` --- 监听元素的祖先元素Element对象，其边界盒将被视作视口。目标在根的可见区域的的任何不可见部分都会被视为不可见,**默认为浏览器视口**。

     - 如果指定为 `null`，也为浏览器视口。
     - 必须是目标元素的`祖先元素`(<b style="color:#f00">目标元素在自己的亲父级元素中不可见,那么他也会被视作在祖先级元素中不可见,一般可以不用设置,或者设为`null`</b>)
   2. `rootMargin` ---根元素的扩缩边距。其传值形式与 CSS 中 margin 一样，用于控制根元素每一边的扩缩(单位为 px 或%)，从而控制计算根元素和目标元素的交集的区域范围，默认值为 0,一般不设置。
   3. `threshold` --- 阈值，回调函数触发的条件。规定了一个监听目标与边界盒交叉区域的比例值，可以是一个具体的数值或是一组 0.0 到 1.0 之间的数组。若指定值为 0.0，则意味着监听元素即使与根有 1 像素交叉，此元素也会被视为可见。若指定值为 1.0，则意味着整个元素都在可见范围内时才算可见
     - 当传入数值类型时，只会触发一次。
     - 当传入数组类型时，可触发多次。如：[0,0.25,0.5,0.75,1]表示目标元素在根元素的<b style="color:red">可见程度</b>每多 25%(自身高度) 就执行一次回调
:::
## 3 IntersectionObserver实例对象
>一个可以使用规定阈值监听目标元素可见部分与`root`交叉状况的新的`IntersectionObserver` 实例。调用自身的observe() 方法开始使用规定的阈值监听指定目标。

### 3.1 实例属性及方法
<a-image :preview="true" src="/docs/images/javaScript/intersectionObserver实例对象属性和方法.png"/>

:::details 实例对象参数及方法
**属性:(全部只读)**
<!-- ::: tip -->
实例对象的属性就是`IntersectionObserver构造函数`创建的时候传入的`options`对象的三个属性
<!-- ::: -->

1. `root`  :根元素,默认视图窗口
2. `rootMargin` : 根元素扩缩边距,默认为 0
3. `threshold` --- 阈值，回调函数触发的条件。

**方法 :**
1. `observe()` : 向 `IntersectionObserver` 对象监听的目标集合(也就是构造函数中`callback`的`entries`参数)添加一个元素。一个监听者有一组阈值和一个根，但是可以监视多个目标元素，以查看这些目标元素可见区域的变化。调用`IntersectionObserver.unobserve()`方法可以停止观察元素。
2. `unobserve(target)` : 命令实例对象停止对一个元素的观察。
   - `target` : 需要停止观察的目标元素
3. `takeRecords()` : 返回一个 `IntersectionObserverEntry` 对象数组(`callback`中的`entries`数组)，每个对象的目标元素都包含每次相交的信息，可以显式通过调用此方法或隐式地通过观察者的回调自动调用。
4. `disconnect()`  : 终止对所有目标元素可见性变化的观察。
:::

## 4. IntersectionObserverEntry对象

:::tip
`IntersectionObserverEntry`对象所组成的集合作为 `entries` 参数被传递到一个 IntersectionObserver 的回调函数中(构造函数中的`callback`的参数entries); 此外，这些对象在外部只能通过调用`IntersectionObserver实例.takeRecords()` 来获取。
:::

### 4.1 IntersectionObserverEntry对象属性
 **几个可能会用到的属性 :**
| 属性                   | 说明                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **target**             | 被监听的目标元素                                                                                                         |
| **isIntersecting**     | 当前目标元素是否在`root`可视区内  type:`boolean`                                                                         |
| **boundingClientRect** | 回目标元素的矩形区域的信息，返回结果与[element.getBoundingClientRect()](../sizePosition/element元素视图)相同             |
| **rootBounds**         | 返回根元素的矩形区域的信息，`getBoundingClientRect()`方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回 `null` |
| **intersectionRect**   | 返回目标元素与视口（或根元素）的交叉区域的信息                                                                           |
| **time**               | 返回一个记录从`IntersectionObserver`的时间原点到交叉被触发的时间的时间戳                                                 |

## 5. 示例 无限滚动

<DemoBlock><IntersectionObserver /></DemoBlock>

:::details 查看代码
```ts
<script setup lang="ts">
import { onMounted, ref } from "vue";
import LoadingCom from "../common/mouseLoading.vue";
import { message } from "ant-design-vue";
const values = ref(5);
const flag = ref(false)
const observe = ref<IntersectionObserver>()
const target = ref<HTMLDivElement>()
const root = ref()
// 停止.开启监听
const stopHandle = () => {
  flag.value = !flag.value
  const status = flag.value ? '已停止监听' : '已开启监听'
  message.warn(status)
  flag.value ? observe.value?.unobserve(target.value!) : observe.value?.observe(target.value!)
}

onMounted(() => {
  // 创建observer实例配置对象 可以不传
  const options: IntersectionObserverInit = {
    root: root.value, //目标元素所在的根元素
    // threshold: 0.1, //阀值 目标元素出现在root中到达 10%时执行callback
  };
  const callback: IntersectionObserverCallback = (entries, observer) => {
    console.log("entries", entries); // 被监听的IntersectionObserverEntry对象数组
    console.log("observer", observer); //当前的监听实例对象
    entries.forEach((it) => {
      // 模拟延迟加载
      setTimeout(() => {
        if (it.isIntersecting) {
          values.value += 5;
          message.success("加载数据成功");
        }
      }, 500);
    });
  };
  // 创建IntersectionObserver实例对象
  observe.value = new IntersectionObserver(callback, options);
  // 监听目标元素 可监听多个
  observe.value.observe(target.value!);
});
</script>

<template>
  <div>
    <a-button @click="stopHandle">{{ flag ? '开启监听' : '停止监听' }}</a-button>
    <ul ref="root">
      <li v-for="it in values" :key="it">
        给我一个div {{ it }}
      </li>
      <!--  -->
      <div class="wfull fcc target" ref="target">
        <!-- 加载动画 -->
        <LoadingCom />
      </div>
    </ul>
  </div>
</template>
```
:::

## 6. 封装自定义指令实现无限滚动
**效果相同:**
<DemoBlock><IntersectionObserver /></DemoBlock>
:::danger 注意:
由于全局值创建了一个`intersection`实例,并且是在目标元素挂载之前已经创建了,所以不支持自定义传入`options`配置项,如果需要自定义配置项,需要在自定义指令里的钩子函数中去创建实例,但这样会创建多个,还需要在卸载钩子中手动质空实例对象比较好
:::

:::details 代码实现
:::code-group
```ts [src/directives/intersection.ts]
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
    /**
     * 执行回调时还可以传入IntersectionObserverEntr对象的属性回去,
     * vueUse中封装的useIntersectionObserver就是这么做的
     */
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
```
```ts [src/ditectives/index.ts]
import { App } from 'vue'
import { setupIntersectionDirective } from './intersection'

export const setupDirectives = (app: App) => {
  // 监听
  setupIntersectionDirective(app)
}
```
```ts [main.ts]
const app = createApp(App)

// 注册全局自定义指令
setupDirectives(app)
```
```vue [demo.vue]
<script setup lang="ts">
import LoadingCom from './components/common/mouseLoading.vue'

const values = ref(5)
const callback = () => {
  values.value += 5
}
</script>

<template>
  <div>
    <ul>
      <li v-for="it in values" :key="it">
        给我一个div {{ it }}
      </li>
      <!-- 使用自定义指令,传入回调 -->
      <div v-intersection="callback" class="target h60px wfull fcc bg-[#ccc]">
        <LoadingCom />
      </div>
    </ul>
  </div>
</template>
```
:::
:::tip VueUse
如果是vue项目,VueUse已经对原生intersectionObserver进行了封装,包括函数用法以及指令用法:[useIntersectionObserver](https://vueuse.org/core/useIntersectionObserver/#useintersectionobserver)
:::
