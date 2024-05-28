export { formPlugins } from './form'
export { scroll } from './scroll'
export { echartsList } from './echarts'
export { otherPlugins } from './other'
export { editorList } from './editor'
export { fileOperation } from './file'
export { videoPlugins } from './video'

// 图片
export const images: ICard[] = [
  {
    name: 'cropperjs图片裁剪',
    desc: '一个图片编辑库，也有对应的vue版本 vue-cropperjs',
    src: 'https://fengyuanchen.github.io/cropperjs/',
  },
  {
    name: 'baguetteBox.js',
    desc: '简单易用的响应式图像灯箱效果脚本',
    src: 'https://feimosi.github.io/baguetteBox.js/',
  },
  {
    name: 'lightgallery.js',
    desc: '功能齐全的JavaScript图像灯箱插件',
    src: 'https://sachinchoolur.github.io/lightgallery.js/',
  },
  {
    name: 'v-viewer',
    desc: '图片浏览组件v-viewer,支持旋转、缩放、翻转等操作',
    src: 'https://github.com/mirari/v-viewer',
  },
]

// 流程图
export const flow: ICard[] = [
  {
    name: 'logic-flow',
    desc: '流程图',
    src: 'https://site.logic-flow.cn/docs/#/zh/guide/start',
  },
  {
    name: 'vueflow',
    desc: '流程图',
    src: 'https://vueflow.dev/',
  },
]

// canvas
export const canvasList: ICard[] = [
  {
    name: 'konva',
    desc: '一个简单操作canvas的库,像操作dom一样简单,支持vue和react--中文:http://konvajs-doc.bluehymn.com/docs/index.html',
    src: 'https://konvajs.org/docs/vue/index.html',
  },
  {
    name: 'fabric.js',
    desc: '图形转换、滤镜、动画和事件',
    src: 'http://fabricjs.com/',
  },
  {
    name: 'leaflet.js',
    desc: '添加地图、图层、标记、组件和交互元素',
    src: 'https://leafletjs.com/index.html',
  },
  {
    name: 'idraw.js',
    desc: '面向Web绘图的JavaScript框架',
    src: 'https://idrawjs.com/docs/zh-CN/',
  },
]

/**
 * 存储
 */
export const storageList: ICard[] = [
  {
    name: 'localForage 改进的localStorage',
    desc: '在浏览器和 Node.js 中存储值，而无需使用任何其他 API',
    src: 'https://localforage.github.io/localForage/',
  },
  {
    name: ' IndexedDB API',
    desc: ' 改进的IndexedDB API',
    src: 'https://github.com/jakearchibald/idb',
  },
  {
    name: 'Dexie.js',
    desc: 'IndexedDB 的简约包装',
    src: 'https://dexie.org/',
  },
  {
    name: ' js-cookie',
    desc: '简单、轻量级的 JavaScript API，用于处理浏览器 cookie',
    src: 'https://github.com/js-cookie/js-cookie',
  },

]
/**
 * table
 */
export const tableList: ICard[] = [
  {
    name: 'XRender',
    desc: '阿里:中后台「表单/表格/图表」开箱即用解决方案',
    src: 'https://xrender.fun/',
  },
  {
    name: 'VTable',
    desc: '高性能的多维数据分析表格',
    src: 'https://visactor.io/vtable/guide/Getting_Started/Getting_Started',
  },
  {
    name: 'VxeTable',
    desc: 'vue2,vue3功能强大的表格',
    src: 'https://vxetable.cn',
  },
  {
    name: 'antv-s2数据表格',
    desc: 'antv-s2数据表格',
    src: 'https://s2.antv.antgroup.com/',
  },
  {
    name: 'easytable(vue3版本)',
    desc: '虚拟滚动,大数据渲染',
    src: 'https://easytable.kohai.top/#/zh/doc/intro',
  },
  {
    name: 'Luckysheet 电子表格',
    desc: '纯前端类似excel的在线表格，功能强大 已更名为Univer',
    src: 'https://dream-num.github.io/LuckysheetDocs/zh/guide/',
  },
  {
    name: 'Handsontable 电子表格',
    desc: '在线的电子表格,支持多框架',
    src: 'https://handsontable.com/docs/javascript-data-grid/',
  },
  {
    name: 'sheetjs',
    desc: 'xlsx',
    src: 'https://xlsx.nodejs.cn/docs/',
  },

]

/**
 * 提示类插件
 */
export const tooltipList: ICard[] = [
  {
    name: 'floating-ui(Popper.js)',
    desc: 'tooltip提示组件,元Popper.js,很多组件库的tooltip提示依赖库',
    src: 'https://floating.nodejs.cn/',
  },
  {
    name: 'floating-vue',
    desc: 'tooltip menu dropdown等组件',
    src: 'https://floating-vue.starpad.dev/guide/installation',
  },
  {
    name: 'vue-toast-notification 轻提示',
    desc: 'notification 轻提示',
    src: 'https://ankurk91.github.io/vue-toast-notification/',
  },
  {
    name: 'tooltip 提示插件tippyjs',
    desc: 'tooltip',
    src: 'https://atomiks.github.io/tippyjs/v6/getting-started/',
  },
  {
    name: 'Vue3-Popper',
    desc: '也是一个tooltip',
    src: 'https://valgeirb.github.io/vue3-popper/guide/getting-started.html',
  },
  {
    name: 'React-Toastify',
    desc: 'react好用的通知框,message提示框',
    src: 'https://fkhadra.github.io/react-toastify/introduction/',
  },
  {
    name: 'Vue3-Toastify',
    desc: 'vue3好用的通知框,message提示框',
    src: 'https://vue3-toastify.js-bridge.com/',
  },
  {
    name: 'Vue-toastification',
    desc: 'vue2,vue3通知框',
    src: 'https://github.com/Maronato/vue-toastification',
  },
]
/**
 * 拖拽
 */

export const dragList: ICard[] = [
  {
    name: 'Grid Layout Plus',
    desc: 'Vue 3 的可拖拽、可缩放的布局',
    src: 'https://grid-layout-plus.netlify.app/zh/',
  },
  {
    name: 'vue3-drag-resize',
    desc: '可拖拽,缩放的vue组件',
    src: 'https://github.com/kirillmurashov/vue-drag-resize',
  },
  {
    name: 'vue3-draggable-resizable',
    desc: '另一个可拖拽,缩放的vue组件',
    src: 'https://github.com/a7650/vue3-draggable-resizable/blob/main/docs/document_zh.md',
  },
  {
    name: 'vue3-draggable',
    desc: '基于sortable.js的vue拖拽插件,vue3版本',
    src: 'https://sortablejs.github.io/vue.draggable.next/#/simple',
  },
  {
    name: 'react-dnd',
    desc: 'react的拖拽库',
    src: 'https://react-dnd.github.io/react-dnd/about',
  },
  {
    name: 'React-Grid-Layout',
    desc: 'react的拖拽布局',
    src: 'https://react-grid-layout.github.io/react-grid-layout/examples/0-showcase.html',
  },
  {
    name: 'draggable',
    desc: 'js拖拽库',
    src: 'https://shopify.github.io/draggable/examples/',
  },
]