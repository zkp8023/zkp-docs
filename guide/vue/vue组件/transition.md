# [transition内置组件](https://cn.vuejs.org/guide/built-ins/transition.html)
1. **作用**: <mark>在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。</mark>
2. 在动画或过渡执行期间,vue 会给我们的元素添加 6 个类名:
- 元素进入的样式：
  1. `v-enter-from`：进入的起点
  2. `v-enter-active`：进入过程中
  3. `v-enter-to`：进入的终点
- 元素离开的样式：
  1. `v-leave-from`：离开的起点(**也就是进入的终点**)
  2. `v-leave-active`：离开过程中
  3. `v-leave-to`：离开的终点(**也就是进入的起点**)
3. transiton内置组件的`<transition>`标签不会渲染到DOM树中   
<a-image :preview="true" src="/docs/images/vue/vue-transition.png"></a-image>

## 1.transition过渡
**示例:**
```vue
<template>
  <div class="">
    <a-button mb20px mr20px @click="handleRight">
      点击右滑
    </a-button>
    <a-button @click="handleLeft">
      点击左滑
    </a-button>
    <transition>
      <h1 v-show="show" class="bg-sky text-[#f00]!">
        给我一个div
      </h1>
    </transition>
  </div>
</template>

<style scoped lang='scss'>
// 进入的起点  离开的终点
.v-enter-from,
.v-leave-to{
  opacity: 0;
  // 从右边滑走   需要改成左边需改成  -100%
  transform:translateX(v-bind(val));
}
.v-enter-active,
.v-leave-active{
  transition: all .5s;
}
</style>
```
<DemoBlock><VueTransition /></DemoBlock>

**注意点:**

上例中已经写了进入的起点和离开的终点的状态 此时就**不需要**再写  进入的终点和离开的起点的状态了 也就是`v-enter-to`和`v-leave-from` vue内部会自行解析


## 2.transition动画

使用动画同样可以实现上例中的效果,只借助transition提供的进入和离开的过程类名即可 `v-enter-active`和`v-leave-active`

```vue
<style scoped lang='scss'>
/* 定义动画 */
@keyframes move {
  from{
    // 开始状态
    opacity: 0;
    // -100% or 100%
    transform: translateX(v-bind(val));
  }to{
    // 结束状态
    opacity: 1;
    transform: translateX(0);
  }
}
/* 在过程类名中使用动画 */
.v-enter-active{
  animation: move .5s;
}
.v-leave-active{
  /* 离开时动画翻转 */
  animation: move .5s reverse;
}
</style>
```
<DemoBlock><TransitionAnimate /></DemoBlock>

## 3.为过渡效果命名
我们可以给 `<Transition>` 组件传一个 `name` prop 来声明一个过渡效果名：
```vue
<Transition name="fade">
  ...
</Transition>

```
对于一个有名字的过渡效果，对它起作用的过渡 class 会以其名字而不是 v 作为前缀。比如，上方例子中被应用的 class 将会是 <b style="color:red;">fade-enter-active</b> 而不是 `v-enter-active`。这个“fade”过渡的 class 应该是这样：

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

```

## 4.过渡集成第三方动画
`transition`支持使用第三方动画效果
以[animate.css](https://animate.style/)为例:
```typescript
pnpm add animate.css
```
```typescript
// main.ts
import 'animate.css'
```
```vue
<template>
  <div>
    <a-button mb20px mr20px @click="show = !show">
      点击过渡
    </a-button>
    <!-- 使用第三方动画 -->
    <transition
      enter-active-class="animate__animated animate__bounceInDown"
      leave-active-class="animate__animated animate__backOutUp"
    >
      <h1 v-show="show" class="bg-sky text-[#f00]!">
        给我一个div
      </h1>
    </transition>
  </div>
</template>
```

<DemoBlock><TransitionAnimateThird /></DemoBlock>

**说明:**
1. 其中`animate__animated`为[animate.css](https://animate.style/)的必要前缀

2. `enter-active-class="animate__animated animate__bounceInDown"` 相当于在样式中设置成 `v-enter-active="{animation:'animate__bounceInDown'}`"
需要使用动画库的哪个动画就使用哪个名字设置`enter-active-class`和`leave-active-class`

3. 所有可以传入`<transition>`组件的props如下:传入的这些 class 会覆盖相应阶段的默认 class 名
  - `enter-from-class`
  - `enter-active-class`
  - `enter-to-class`
  - `leave-from-class`
  - `leave-active-class`
  - `leave-to-class`
  
## 5.同时使用动画和过渡
> 当动画事件和过渡事件设置不一致的时候可能会产生意想不到的bug,这时候会强行执行完过渡和动画...  
> 
> 设置`type`属性为`animation`或者`transition` 代表以哪个的时间为准   
> 
> 
>  也可以设置`:duration='2000'`属性,表示不管是动画还是过渡都在**两秒**内执行完,    
> 
> 
> 还可以写成对象形式 : `:duration='{enter:2000,leave:1000}'`  进入的时候2秒 退出的时候1秒

```vue
<template>
  <div>
    <a-button @click="isShow = !isShow">
      切换动画
    </a-button>
    <!-- 当动画事件和过渡事件设置不一致的时候可能会产生意想不到的bug  会强行执行完过渡和动画
      设置type属性为animation或者transition 代表以哪个的时间为准
     也可以设置:duration='2000'属性,表示不管是动画还是过渡都在两秒内执行完,还可以写成对象形式 :
     :duration='{enter:2000,leave:1000}'  进入的时候2秒 退出的时候1秒
      -->
    <!-- type="animation" -->
    <transition appear type="animation">
      <h1 v-show="isShow" class="bg-sky text-[#f00]">
        给我一个div
      </h1>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
main {
  font-size: 30px;
  font-weight: 700;
}
@keyframes move {
  from {
      transform: translateX(-100%);
  }
  to {
      transform: translateX(0%);
  }
}
//动画时间和过渡时间设置不一致 , 会强行执行过渡和动画
.v-enter-active {
  animation: move 1s linear;
  transition: 3s linear;
}
.v-leave-active {
  animation: move 1s linear reverse;
  transition: 3s linear;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
```

<DemoBlock><BothTransAndAnimate /></DemoBlock>




