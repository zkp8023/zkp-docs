# antd 主题定制

 `antd` 使用`less`开发样式，项目中使用`less`作为 `css` 预处理器,
[antd全部样式变量](https://github.com/vueComponent/ant-design-vue/blob/main/components/style/themes/default.less)

## 1. modifyVar 直接修改变量
:::tip
使用`unplugin-vue-components`插件时 需配置 `AntDesignVueResolver({ importStyle: 'less' }),`
:::

```ts
// antd组件库样式文件
import 'ant-design-vue/dist/antd.less'
```
:::code-group

```ts[vite.config.ts]
 css: {
      preprocessorOptions: {
        less: {
          // 直接覆盖变量 修改全局主色为red
          modifyVars: { 'primary-color': 'red' },
          javascriptEnabled: true,
        },
      },
    },
```
:::
## 2. 自定义less文件变量覆盖
:::tip
使用`unplugin-vue-components`插件时 需配置 `AntDesignVueResolver({ importStyle: 'less' }),`
:::

```ts
// 引入组件库变量文件
import 'ant-design-vue/dist/antd.variable.min.css'
// 自定义变量文件
import 'antd.less'
```

:::code-group

```[antd.less]
/* 定制antd组件库主题，修改antd全局默认样式 ,全部样式变量*/
@primary-color: blue;
```

```ts[vite.config.ts]
 css: {
      preprocessorOptions: {
        less: {
          // 通过自定义变量文件覆盖antd原有变量
          modifyVars: { hack: 'true; @import \'@/style/antd.less\';' },
          javascriptEnabled: true,
        },
      },
    },
```
:::

## 3. 动态主题
:::tip
使用`unplugin-vue-components`插件时 需配置 `AntDesignVueResolver({ importStyle: false }),`
:::


:::code-group

```vue[App.vue]
<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { ConfigProvider } from 'ant-design-vue'
import type { Theme } from 'ant-design-vue/es/config-provider'
// 自定义主题色 可存储在 pinia 动态修改赋值
const customTheme: Theme = {
  primaryColor: '#0d79be', // 全局主色
  successColor: 'green', // 成功色
  infoColor: 'grey', // 信息色
  warningColor: 'yellow', // 警告色
  errorColor: 'red', // 错误色
}
ConfigProvider.config({
  theme: customTheme,

})
</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view v-slot="{ Component }">
      <transition name="fade-slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </a-config-provider>
</template>
```
:::