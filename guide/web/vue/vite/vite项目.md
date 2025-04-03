# vue3+vite+ts项目创建

## 1.命令行创建模板:

```typescript
yarn create vite
// or
npm create vite
//or
pnpm create vite
//输入项目名称 =>  xxx
choose:
1.vue
2.vue-ts
```

## 2.安装依赖:

```typescript
yarn 
//or
npm i
//or
pnpm i
```

## 3.启动项目:

```typescript
yarn dev
//or
npm(pnpm) run dev
```

## 4.安装项目必要依赖:

 1.vue-router      2.pinia      3.axios      4.sass(less)    5.element plus (antd design vue或者naive ui......你选择的组件库)


```typescript
yarn add vue-router pinia sass naive-ui
```

## 5.项目集成eslint代码风格校验,配合 prettier 

#### 5.1.安装eslint及相关vite插件: (开发依赖 加-D)

```typescript
yarn add eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
//说明:
1. eslint // ESLint的核心代码
2. @typescript-eslint/parser // ESLint的解析器，用于解析typescript，从而检查和规范Typescript代码
3. @typescript-eslint/eslint-plugin // ESLint插件，包含了各类定义好的检测Typescript代码的规范
4. eslint-plugin-vue // 支持对vue文件检验

5. vite-plugin-eslint // 错误将在浏览器中报告，而不止在终端，按需使用

```



#### 5.2.安装prettier及相关插件:(开发依赖  加-D)

```typescript
yarn add prettier eslint-config-prettier  eslint-plugin-prettier -D
//说明:
1. prettier  //prettier的核心代码
2. eslint-config-prettier //这将禁用 ESLint 中的格式化规则，而 Prettier 将负责处理这些规则
3. eslint-plugin-prettier // 把 Prettier 推荐的格式问题的配置以 ESLint rules 的方式写入，统一代码问题的来源。
```



#### 5.3.创建    ".eslintrc.js"   文件(src)同级

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module', //Allowsfortheuseofimports
    ecmaFeatures: {
      jsx: true       //jsx支持
    }
  },
    //extends选项下有顺序,后面的规则会覆盖前面的规则 所以要使用prettier 配合的话需要放在最后
  extends: [
    'plugin:vue/vue3-recommended', // vue3推荐的代码风格
    'eslint:recommended',          //eslint推荐的代码风格 
    'plugin:@typescript-eslint/recommended', //typescript-eslint推荐的风格
    'plugin:prettier/recommended'            //prettier的风格
  ],
  rules: {}
}

```



#### 5.4.创建  ".prettierrc.js" 文件(src)同级

```typescript
module.exports = {
  printWidth: 160, // 单行输出（不折行）的（最大）长度  
  tabWidth: 2, // 每个缩进级别的空格数  
  tabs: false, // 使用制表符 (tab) 缩进行而不是空格 (space)  
  semi: false, // 是否在语句末尾打印分号  
  singleQuote: true, // 是否使用单引号
  quoteProps: 'as-needed', // 仅在需要时在对象属性周围添加引号  
  bracketSpacing: true, // 是否在对象属性添加空格  
  htmlWhitespaceSensitivity: 'ignore', // 指定 HTML 文件的全局空白区域敏感度, "ignore" - 空格被认为是不敏感的  
  trailingComma: 'none', // 去除对象最末尾元素跟随的逗号  
  useTabs: false, // 不使用缩进符，而使用空格  
  jsxSingleQuote: false, // jsx 不使用单引号，而使用双引号  
  // arrowParens: 'always', // 箭头函数，只有一个参数的时候，也需要括号  
  rangeStart: 0, // 每个文件格式化的范围是文件的全部内容  
  proseWrap: 'always', // 当超出print width（上面有这个参数）时就折行  
  endOfLine: 'lf', // 换行符使用 lf
  "max-lines-per-function": [ 2, { max: 320, skipComments: true, skipBlankLines: true }, ] // 每个函数最大行数
}

```

#### 5.5.创建 .prettierignore 和 .eslintignore两个忽略文件

```typescript
.vscode
dist
index.html
node_modules
//... 另外根据需要自己添加
```

## 6.vite相关插件安装

说明:

​	vite相关插件较多,可以在创建项目的时候在根目录创建config文件夹,将插件相关配置以函数的形式存储,配置完成后导入到vite.config.ts文件中使用

#### 6.1   [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)自动导入api

```typescript
1.安装 : 
yarn add -D unplugin-auto-import
// config/vite/plugins/autoImport.ts 创建对应文件
import AutoImport from 'unplugin-auto-import/vite'
//导入相关组件库的resolver 
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export const AutoImportDeps = () => ({
    AutoImport({
        //指定自动导入声明文件,默认是在src/auto-imports.d.ts
        dts:'types/auto-imports.d.ts'  
        //自动导入vue,vue-router...中的api 如ref,reactive,nextTick等...
        imports:['vue', 'vue-router', '@vueuse/core',// 自定义导入的api也可以放在里面]
        //自定义解析器,可配合unplugin-vue-components插件
        resolvers: [ElementPlusResolver({})], 
        //项目中使用eslint时自动导入会和eslint冲突 配置此选项会在根目录下生成.eslintrc-auto-import.json文件
        //在.eslintrc.js文件中的extends配置项中添加 './.eslintrc-auto-import.json' 解决冲突
        eslintrc: {
          enabled: true
      }
    })
})
// 配置完成之后记得修改tsconfig.ts配置项
"include": [
    // .....
        "types/auto-imports.d.ts"
      ]
```

#### 6.2  unplugin-vue-components(https://github.com/antfu/unplugin-vue-components)

```typescript
//自动引入组件
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, NaiveUiResolver } from 'unplugin-vue-components/resolvers'
export const AutoRegistryComponents = () => {
  return Components({
    extensions: ['vue', 'md'],
    deep: true,
    dts: 'types/components.d.ts',
    directoryAsNamespace: false,
    globalNamespaces: [],
    directives: true,
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
      //自动导入elementplus 和 naive ui 的组件
    resolvers: [ElementPlusResolver(), NaiveUiResolver()]
  })
}
// 配置完成之后记得修改tsconfig.ts配置项
"include": [
    // .....
        "types/components.d.ts"
      ]
```

#### 6.3 vite-plugin-style-import

```typescript
//自动引入样式文件
import {createStyleImportPlugin , ElementPlusResolve} from 'vite-plugin-style-import'
export const AutoImportStyle = () => {
    createStyleImportPlugin({
      resolves: [
         ElementPlusResolve()
      ]
      // 自定义导入的样式
      // libs: [
      //   {
      //     libraryName: 'element-plus',
      //     esModule: true,
      //     resolveStyle: name => {
      //       return `element-plus/lib/theme-chalk/${name}.css`
      //     }
      //   }
      // ]
    })
}

```

#### 6.4   vite-plugin-svg-icons
::: code-group
```ts [main.ts]

//...
import 'virtual:svg-icons-register'
```
```typescript [svg.ts]
// 加载SVG文件，自动引入
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
export const ConfigSvgIconsPlugin = (isBuild: boolean) => {
  return createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild
  })
}
```

```vue [svgIcon.vue]
//封装svg组件
<template>
  <svg aria-hidden="true" class="svg-icon-spin" :class="calsses">
    <use :xlink:href="symbolId" :fill="props.color" />
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  },
  size: {
    type: String,
    default: '20'
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const calsses = computed(() => {
  return {
    [`sdms-size-${props.size}`]: props.size
  }
})
const fontSize = reactive({ default: '24px', small: '20px', large: '48px' })
</script>
<style lang="scss" scoped>
.svg-icon-spin {
  width: v-bind('fontSize.default');
  height: v-bind('fontSize.default');
  fill: v-bind(color);
  vertical-align: middle;
  color: v-bind(color);
  &.sdms-size-small {
    font-size: v-bind('fontSize.small');
    height: v-bind('fontSize.small');
  }

  &.sdms-size-large {
    font-size: v-bind('fontSize.large');
    height: v-bind('fontSize.large');
  }
}
</style>

```

:::