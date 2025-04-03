# [unocss](https://unocss.dev/presets/uno)

## 1.原子化 css

> 原子化 CSS 是一种 CSS 的架构方式，它倾向于小巧且用途单一的 class，并且会以视觉效果进行命名。

```html
<div class="h-20 m-0"></div>
```

```css
/* 抽离单个的css效果类 */
.m-0 {
  margin: 0;
}
.h-20 {
  height: 20rem;
}
```

### 常见的 Css 框架 ：[tailwindcss](https://tailwindcss.com/), [windicss](https://cn.windicss.org/)

**详细介绍**：antfu 大佬的 [重新构想原子化 CSS](https://antfu.me/posts/reimagine-atomic-css-zh)

## 2. unocss

> unocss 一个原子化 css 引擎，并不是 css 框架,它没有像 TailwindCSS，WindI CSS 那样提供核心的应用程序，所有能力由预设提供
> ，并且只有你使用到的 css 类才会被引擎扫描并打包，突出核心：按需使用。

### unocss 目前没有官方的使用文档，因为本就预设了`tailwindcss` 和 `windicss`,可直接参照这两个的官网查看

> vscode 开发可下载 unocss 插件

### 2.1. 预设(presets)

**unoCSS 官方默认提供了三种预设 :**

- `@unoCSS/preset-uno` 工具类预设

> 这个预设提供了流行的实用程序优先框架的通用超集，包括 Tailwind CSS，Windi CSS，Bootstrap，Tachyons 等...
>
> ml-3（Tailwind），ms-2（Bootstrap），ma4（Tachyons），mt-10px（Windi CSS）
>
> 这些写法都会生效

```html
<!-- 以下写法都可给div设置宽度20px 不带单位时为rem -->
<div w-20 w20 w-20px w20px>给我一个div</div>
```

`@unoCSS/preset-attributify` 属性化预设

```html
<button bg="blue-400 dark:blue-500 hover:blue-500 dark:hover:blue-600" text="sm white">Click</button>
```

> 继承了 WindiCSS 的属性化模式，简化了书写 class，以属性的形式去写 class，但是在使用组件的时候，较大可能出现属性太多，容
> 易混淆的情况

`@unoCSS/preset-icons` 图标类 icon 支持

> UnoCSS 提供了图标的预设，它是纯 CSS 的图标，可以选择 Icones 或 Iconify 作为图标源使用，同样也支持自定义 icon，本身实现
> 按需加载

```html
<div class="i-icon-park-twotone-winking-face"></div>
```

**可配合 [unplugin-icons](./unplugin-icons.md) 插件使用**

## 3. vite 项目使用 unocss

### 安装并配置

```typescript
  pnpm add unocss -D
  // or
  yarn add unocss -D
```

```typescript
// vite.config.ts
...
import Unocss from 'unocss/vite'
export default defineConfig({
  plugins: [
    /**
     * 使用unocss({ 配置项 })，一般单独新建配置文件
     */
      Unocss()
    ]
})



/**
 * 根目录下新建uno.config.ts 或 unocss.config.ts配置文件
 */
import {  defineConfig,
          transformerDirectives,
          presetIcons,
          presetUno,
          presetAttributify
      } from 'unocss'
export default defineConfig({
  /**
   *   presetUno（）直接使用默认预设就够了
   *   presetIcons() 感觉我不会用到这个，应该会使用前一篇的unplugin-icons插件就行
   *   presetAttributify()  属性写法
   * */

  presets: [presetUno(), presetIcons(), presetAttributify()],
})
```
```typescript
//  main.ts中引入unocss的样式
import 'uno.css'
```
**注意点：**
> 在monorepo模式下  需设置unocss配置文件的路径指定

```bash
# .vscode/settings.json
{
  # 告诉unocss去这个目录下找配置文件    或者直接将配置文件放在项目根目录
  "unocss.root":"项目名称/packages/examples"
}
```
## 4. transformer-directives（指令式写法 @apply）

> 在 style 中使用 apply 指令写原子化 CSS,让 html 更加清晰

增加配置：

```typescript
import { defineConfig, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [......],
  /**
   * @unoCSS/transformer-directives 之前的版本以插件的形式使用，现在直接在unocss中导出就行
   * 不用额外安装
   */
  transformers: [transformerDirectives()]
})
```

使用：

```vue
<template>
  <div class="demo">给我一个div</div>
</template>

<style scoped lang="scss">
.demo {
  @apply cursor-pointer bg-red-200 mt-50 p-20px transition duration-500;
}
</style>
```

**注意点：** 在使用 `@apply`指令时可能会有 less 和 sass 的警告, `Unknown at rule @apply`

**解决方案：**

- 可以在根目录的 `.vscode`文件中的`settings.json`中配置如下:

```json
{
  ......
  // "scss.lint.unknownAtRules": "ignore",
  "less.lint.unknownAtRules": "ignore",
}
```

- 或在当前文件中改写 lang 模式

```vue
<template>
  <div class="demo">给我一个div</div>
</template>

<!-- lang = "postcss" -->
<style scoped lang="postcss">
.demo {
  @apply cursor-pointer bg-red-200 mt-50 p-20px transition duration-500;
}
</style>
```

## 5.可变修饰组（transformer-variant-group）

> 通过使用括号对相同的工具类进行编组，将其应用于同一可变修饰。作用有点类似属性写法，可以与属性写法结合使用

### 配置

```typescript
import { defineConfig, transformerVariantGroup  } from 'unocss'

export default defineConfig({
  presets: [......],
  /**
   * @unocss/transformer-variant-group 之前的版本以插件的形式使用，现在直接在unocss中导出就行
   * 不用额外安装
   */
  transformers: [transformerVariantGroup ()]
})
```

### 使用 
```vue
<!-- text和hover类各为一组 使用小括号合并 下面的效果被编译了 看着还是分开的写法-->
  <button w200px
   h50px text-(red-400 60px) 
   hover:(bg-red text-(50px white))
   >
    按钮
  </button>
```
上面的结果被编译了 下面这是实际写法:
<DemoBlock><a-image :preview="true" src="/docs/images/other/unocss-VariantGroup.png"/></DemoBlock>

## 6.unocss 使用动画

### 1.安装 unocss-preset-extra 该插件基于[animate.css](https://animate.style/)

```typescript
pnpm add unocss-preset-extra -D
// or
npm install unocss-preset-extra -D
```

### 2.配置

```typescript
// unocss.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss'
// unocss animate
import { presetExtra } from 'unocss-preset-extra'

export default defineConfig({
  /**
   * presetExtra() unocss动画插件
   */
  presets: [presetUno(), presetAttributify(), presetExtra()]
})
```

### 3.使用

```html
<!-- 动画名称 ( 动画名称可在 https://animate.style 查阅,
 使用时需转为 `kebabCase` 短横线隔开的格式 ) -->
<div class="animated animated-bounce" />
<div class="animated animated-fade-in" />
<div class="animated animated-fade-out" />

<!-- 动画运行次数 -->
<div class="animated animated-bounce animated-infinite" />
<!-- 无限循环 -->
<div class="animated animated-bounce animated-repeat-6" />
<!-- 循环 6 次 -->
<div class="animated animated-bounce animated-repeat-666" />
<!-- 循环 666 次 -->

<!-- 动画延迟 -->
<div class="animated animated-bounce animated-delay-6" />
<!-- 延迟 6 毫秒 -->
<div class="animated animated-bounce animated-delay-6s" />
<!-- 延迟 6 秒 -->
<div class="animated animated-bounce animated-delay-6ms" />
<!-- 延迟 6 毫秒 -->

<!-- 动画周期 -->
<div class="animated animated-bounce animated-fast" />
<!-- 慢 -->
<div class="animated animated-bounce animated-faster" />
<!-- 很慢 -->
<div class="animated animated-bounce animated-slow" />
<!-- 快 -->
<div class="animated animated-bounce animated-slower" />
<!-- 很快 -->
<div class="animated animated-bounce animated-duration-6" />
<!-- 时长为 6 毫秒 -->
<div class="animated animated-bounce animated-duration-6s" />
<!-- 时长为 6 秒 -->
<div class="animated animated-bounce animated-duration-6ms" />
<!-- 时长为 6 毫秒 -->
```

### 在 Attributify Mode 下使用

```html
<div animated="~ bounce infinite" />
<div animated="~ bounce faster delay-6s" />
```

### 在指令写法下和可变修饰组配合使用

```css
.demo {
  @apply delay-1s;
}
```

### 在 Vue 3 中使用

```vue
<Transition
  class="animated animated-faster"
  enter-active-class="animated-rotate-in"
  leave-active-class="animated-rotate-out"
  mode="out-in"
>
  ...
</Transition>
<!-- 使用ts 在Transition组件中使用class可能会警告 可使用如下方式 -->
<Transition
  enter-active-class="animated animated-faster animated-rotate-in"
  leave-active-class="animated animated-faster animated-rotate-out"
  mode="out-in"
>
  ...
</Transition>
```

## 7.自定义 rules

> unocss 支持自定义样式类

**配置带中划线的属性时，用引号包一下 ：** 'f-c-c' 'justify-content' 'align-items'

### 配置

```typescript
// unocss.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss'
// unocss animate
import { presetExtra } from 'unocss-preset-extra'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetExtra()],
  rules: [
    // 直接自定义
    ['f-c-c', { display: 'flex', 'justify-content': 'center', 'align-items': 'center' }],
    /**
     * 使用正则表达式： 以ell-开头 数字结尾  都会被匹配到 数字作为文本省略的参数传入回调
     * */
    [
      /^ell-(\d)$/,
      ([, ell]) => ({
        display: '-webkit-box',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        '-webkit-line-clamp': ell,
        '-webkit-box-orient': 'vertical'
      })
    ],
    // 为不同的动画设置不同的延时 a-d-200  a-d-300
    [
      /^a-d-(\d)$/,
      ([, delay]) => ({
       'animation-delay':delay + 'ms'
      })
    ]
  ]
})
```

### 使用

```vue
<template>
  <div class="outer">
    <div class="inner">给我一个div给我一个div给我一个div 给我一个div给我一个div给我一个div给我一个div</div>
  </div>
</template>

<style scoped lang="less">
.outer {
  /**
   f-c-c: { display: 'flex', 'justify-content': 'center', 'align-items': 'center' }
   */
  @apply bg-gray-400 w-300px f-c-c h300px;
  .inner {
    // ell-3 : 文本超出三行就省略
    @apply bg-red  text-white w200px ell-3;
  }
}
</style>
```

<DemoBlock><a-image :preview="true"  src="/docs/images/other/unocss-rules.png" /></DemoBlock>

## 8.shortcuts 快照

> 有时候同样的工具类组合使用次数很多，可以使用 shortcuts 配置将各个工具类组合

**配置带中划线的属性时，用引号包一下 ：** 'wh-full'

```typescript
import { defineConfig, presetAttributify, presetUno } from 'unocss'
// unocss animate
import { presetExtra } from 'unocss-preset-extra'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetExtra()],
  shortcuts: {
    /**
     * w-full h-full 在多个位置重复使用，将他们合并到一个类中
     */
    'wh-full': 'w-full h-full',
    fcc: 'flex justify-center items-center'
  }
})
```

## 9.theme 自定义

> 自定义主题相关 也可以配置其他 不过其他工具类可以自定义在快照和 rule 规则中

### 全局 css 变量定义

```css
/*
styles/index.css
定义全局的css变量
*/
:root {
  --success-color: green;
  --error-color: #f00;
}
```

### 配置 theme

```typescript
import { defineConfig, presetAttributify, presetUno } from 'unocss'
// unocss animate
import { presetExtra } from 'unocss-preset-extra'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetExtra()],
  // theme 配置全局颜色
  theme: {
    colors: {
      // 直接使用全局css变量
      success: 'var(--success-color)',
      error: 'var(--error-color)',
      // 使用组件库的css变量
      myPrimary: 'var(--el-color-primary)',
      // 也可以直接在这里定义  但是比较推荐定义全局的
      info: '#e6a23c'
    }
  }
})
```

### 使用

```vue
<template>
  <button bg-success>成功按钮</button>
  <button bg-error>警告按钮</button>
  <button bg-info>信息按钮</button>
  <button bg-primary>组件库变量按钮</button>
</template>

<style scoped lang="less">
button {
  @apply m20px;
}
</style>
```

<DemoBlock><a-image :preview="true"  src="/docs/images/other/unocss-theme.png" /></DemoBlock>

## 10.黑暗主题切换

> 通过对工具类 (utilities) 添加可变修饰前缀 dark:，这些工具类将仅会在暗色模式启用的时候生效

[windicss 暗色模式](https://cn.windicss.org/features/dark-mode.html)

- 配合 vueuse 可以很方便的切换暗黑主题

```css
/* 全局css文件 所有元素在暗黑模式下文字为白色*/
* {
  @apply dark:text-white;
}
body {
  @apply dark:bg-black;
}
```

```vue
<template>
  <h1>模式切换</h1>
  <button bg-success>成功按钮</button>
  <button bg-error>警告按钮</button>
  <button bg-info>信息按钮</button>
  <button bg-primary @click="() => toggle()">组件库变量按钮</button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
const dark = useDark()
const toggle = useToggle(dark)
</script>

<style scoped lang="less">
button {
  @apply m20px;
}
</style>
```

## 11.完整配置

```typescript
/**
 * uno.config.ts
 * unocss.config.ts
 */
import {
  defineConfig, //配置提示
  transformerDirectives, // @apply指令写法
  presetIcons, //icon预设
  presetUno, //默认预设
  presetAttributify, // 属性写法
  transformerVariantGroup //属性分组
} from 'unocss'
// 动画支持
import { presetExtra } from 'unocss-preset-extra'
export default defineConfig({
  presets: [presetUno(), presetIcons(), presetAttributify(), presetExtra()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [
    ['f-c-c', { display: 'flex', 'justify-content': 'center', 'align-items': 'center' }],
    [
      /^ell-(\d+)$/,
      ([, ell]) => ({
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': ell,
        '-webkit-box-orient': 'vertical'
      })
    ]
  ],

  shortcuts: {
    'wh-full': 'w-full h-full',
    fcc: 'flex justify-center items-center'
  },
  theme: {
    colors: {
      primary: 'var(--el-color-primary)',
      info: '#e6a23c',
      success: 'var(--success-color)',
      error: 'var(--error-color)',
      dark: '#18181c'
    },
    borderRadius: {
      '4xl': '20px'
    }
  }
})
```
