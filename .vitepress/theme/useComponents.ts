// 导入并注册组件
import type { App } from 'vue'
import Antd from 'ant-design-vue'
import elementplus from 'element-plus'
import coms from './coms'
import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/antd.css'
// unocss样式
import 'virtual:uno.css'
import 'animate.css'

console.log('🚀  coms', coms)
export function useComponents(app: App) {
  app.use(elementplus).use(Antd)
  coms.forEach((com) => {
    app.component(com.name, com.val)
  })
}
