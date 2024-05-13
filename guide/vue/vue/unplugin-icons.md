<!--
 * @Author: zhangkaipeng
 * @LastEditTime: 2022-12-02 15:46:31
 * @LastEditors: 章凯鹏
 * @Description:
-->

# unplugin-icons 插件使用

> 一个简洁方便使用 icon 的插件,支持 vue2,vue3,react.... 官网地
> 址[unplugin-icons](https://github.com/antfu/unplugin-icons)

## 1.安装插件

```js
npm i unplugin-icons -D
```

## 2.vite 中使用 unplugin-icons

> 可以为所有图标设置默认样式。下面的配置显示了每个选项的默认值:

```ts
// vite.config.ts
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [
    Icons({
      /* options */
      scale: 1.8, // 缩放 单位em 配置了但是没变化  不知道为啥 项目中还是改为1比较好
      defaultStyle: '', // icon默认的样式  display:inline-block; margin:20px;
      defaultClass: '', // 给icon添加默认的类名
      compiler: 'vue3', // 'vue2', 'vue3', 'jsx'  解析图标模式
      jsx: 'react' // 'react' or 'preact'  jsx支持 可以不要 就用默认的
    })
  ]
})
```

## 3. iconify 图标库

> unplugin-icons 插件基于[iconify](https://icon-sets.iconify.design/) 图标库,支持按需访问上万种图标

- [镜像地址](https://icones.netlify.app/)

iconify 这个图标库能够作为 unplugin-icons 插件的数据源，是因为它真的很好用，此库内部有 100+ 个图标集，每个图标集中都有成
千上万种图标，所以，非常非常全。 iconify 库下的图标集可以理解为模块，每个模块（图标集）下才是对应的图标文件，每个图标集
中有各式图标。<br />

### 3.1 进入图表集

<a-image :preview="true" src="/docs/images/other/iconify图标集.png" />

### 3.2 点开图表集

<a-image :preview="true" src="/docs/images/other/iconify点开图表集.png" />

### 3.3 选择图标

<a-image :preview="true" src="/docs/images/other/iconify选择图标.png" />

### 3.3 安装图标库

#### 1. 手动安装图标库

> 第一种是手动安装图标库，如名，直接安装 iconify 整个库，这个库大约在 120MB 左右大小，当然你不需要担心，在生产环境只会打
> 包你所使用到的图标

```js
npm i -D @iconify/json
```

#### 2. 手动安装图标集

> 只安装使用到的图表集 跟安装全局图表库相比 在后面跟上图标集的名字

```js
npm i -D @iconify-json/xxx图标集
```

#### 3. unplugin-icons 自动安装

> 插件就会在检测到我们引入一个图标时自动去下载该图标集

```ts
// vite.config.ts
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [
    Icons({
      /* options */
      autoInstall: true
    })
  ]
})
```

## 4.使用 iconify 图标

### 1.直接使用

如果配置了自动安装，在写完代码保存时，插件会检测到并且通过包管理工具自动安装以下用到的 material-symbols 图标集

```vue
<template>
  <MaterialSymbols10k />
</template>

<script setup>
import MaterialSymbols10k from '~icons/material-symbols/10k'
</script>
```

### 2.配合组件库使用

```vue
<template>
  <el-icon :size="20">
    <MaterialSymbols10k />
  </el-icon>
</template>

<script setup>
import MaterialSymbols10k from '~icons/material-symbols/10k'
</script>
```

### 3.自定义 SVG 图标

> 自定义图标:使用 iconify 图标下载 svg 到本地,或 UI 设计师给的图表

```js
// 项目本地的svg图标文件如下
src / assets / svg / home / zkp.svg
src / assets / svg / about / yh.svg
```

unplugin-icons 插件中有一个 customCollections 属性，用来做自定义图标的加载，但是由于我们需要引入 SVG 文件，所以还需要一
个 SVG 文件解析的 loader ，这点插件也为我们考虑到了，unplugin-icons 插件包下就有这个 loader，我们直接引入使用即可，如下
：

```ts
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
export default defineConfig({
  plugins: [
    Icons({
      /* options */
      autoInstall: true
      compiler: 'vue3', // 'vue2', 'vue3', 'jsx'  解析图标模式
           // 自定义图标加载
      customCollections: {
          // home图标集
          // 给svg文件设置fill="currentColor"属性，使图标的颜色具有适应性
          home: FileSystemIconLoader('src/assets/svg/home', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
         // about图标集
          about: FileSystemIconLoader('src/assets/svg/about', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
    })
  ]
})
```

使用本地自定义 svg:

```vue
<template>
  <el-icon :size="20">
    <IconsHomeZkp />
    <IconsAboutYh />
  </el-icon>
</template>

<script setup>
import IconsHomeZkp from '~icons/icons/home/zkp'
import IconsAboutYh from '~icons/icons/about/yh'
</script>
```

### 4.自动导入 unplugin-vue-components

> unplugin-vue-components 插件可支持项目中的组件自动导入 [官网](https://github.com/antfu/unplugin-vue-components)

```js
npm i unplugin-vue-components -D
```

**配置**:

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
// 引入插件中的图标解析器
import IconsResolver from 'unplugin-icons/resolver'
export default defineConfig({
  plugins: [
    Icons({
      /* options */
      autoInstall: true
      compiler: 'vue3', // 'vue2', 'vue3', 'jsx'  解析图标模式
           // 自定义图标加载
      customCollections: {
          // home图标集
          // 给svg文件设置fill="currentColor"属性，使图标的颜色具有适应性
          home: FileSystemIconLoader('src/assets/svg/home', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
         // about图标集
          about: FileSystemIconLoader('src/assets/svg/about', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
    }),
      Components({
        resolvers: [
          IconsResolver({
            // 设置图标前缀 默认是i  可以设置为false 不需要前缀
            prefix: 'icons'
            // 标识自定义图标集
            customCollections: ['home','about']
          })
        ],
        dts: './types/components.d.ts'
      })
  ]
})
```

**格式说明:**

> 使用图标组件解析器时，必须遵循名称转换才能正确推断图标，也就是说想要自动引入 Icon 组件，我们必须按照下面格式书写组件名
> ：

```js
// prefix - 前缀，默认为 i，上面我们配置成了 icon，即组件名以 icon 开头
// collection - 图标集名
// icon - 图标名
prefix - collection - icon

//或使用大驼峰写法
```

**使用 :**

```vue
<template>
  <el-icon :size="20">
    <!-- 大驼峰写法 -->
    <IconsHomeZkp />
    <IconsAboutYh />
    <!-- 连接符写法 -->
    <icons-home-zkp />
    <icons-about-yh />
    <!-- 不需要前缀 prefix:false -->
    <home-zkp />
    <about-yh />
  </el-icon>
</template>

<script setup>
/**
 * 现在无需引入直接使用
 */
// import IconsHomeZkp from '~icons/icons/home/zkp'
// import IconsAboutYh from '~icons/icons/about/yh'
</script>
```

## 5.使用 iconify 镜像图标(完整配置)

> iconify[镜像图标库](https://icones.netlify.app/)

- vite 项目配置:

```ts
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineConfig({
  plugins: [
    Unocss({
      presets: [presetAttributify(), presetUno()]
    }),
    vue(),
    Icons({
      scale: 1, // 图标缩放
      defaultStyle: 'display:inline-block; margin:20px;', // 图标添加默认样式
      defaultClass: '', // 添加默认类名
      compiler: 'vue3', // 'vue2', 'vue3', 'jsx' 解析方式
      jsx: 'react', // 'react' or 'preact',  jsx支持
      autoInstall: true,  //是否自动下载图标集
      customCollections: {
        // 自动导入本地svg文件 前缀默认是i
        icons: FileSystemIconLoader('src/assets/icons', svg => svg.replace(/^<svg /, '<svg fill="currentColor" '))
      }
    }),
    Components({
      resolvers: [
        IconsResolver({
          // 设置图标前缀 默认是i  可以设置为false 不需要前缀
          prefix: false
          // 标识自定义图标集
          customCollections: ['icons']
        })
      ],
    })
  ]
})
```

### 1.镜像图标集

<DemoBlock><a-image :preview="true"  src="/docs/images/other/iconify镜像.png" /></DemoBlock>

### 2.查看图标集

<DemoBlock><a-image :preview="true"  src="/docs/images/other/iconify查看图标集.png" /></DemoBlock>

### 3.查看图标

<DemoBlock><a-image :preview="true"  src="/docs/images/other/iconify镜像图标集使用.png" /></DemoBlock>
