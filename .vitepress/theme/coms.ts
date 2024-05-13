import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'
// 导入主题样式
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'

// 导入自定义组件
import {
  BothTransAndAnimate,
  // 网页导航卡片组件
  CardList,
  CardList2,
  CardList3,
  CssDrag,
  // 拖拽
  DragSimple,
  DragUpload,
  // css
  DynamicHeight,
  // form表单
  FormExample,
  // Api
  IntersectionObserver,
  ResizeObserver,
  // 插件 sortablejs
  SortableBasicDemo,
  SortableClasses,
  SortableHandle,
  // 过渡
  TransitionAnimate,
  TransitionAnimateThird,
  // 无限滚动
  // Vue3SeamlessScroll,
  VueTransition,
} from '../../examples'

// 处理组件自定义
export default [
  Demo,
  DemoBlock,
  DragSimple,
  // Vue3SeamlessScroll,
  DragUpload,
  VueTransition,
  TransitionAnimate,
  TransitionAnimateThird,
  BothTransAndAnimate,
  CardList,
  CardList2,
  CardList3,
  SortableBasicDemo,
  SortableHandle,
  SortableClasses,
  IntersectionObserver,
  ResizeObserver,
  CssDrag,
  FormExample,
  DynamicHeight,
].map((com, i) => {
  i === 0 && (com.name = 'Demo')
  return {
    name: com.name,
    val: com,
  }
})
