import elementplus from 'element-plus'
import 'element-plus/dist/index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// unocss样式
import 'virtual:uno.css'
import 'animate.css'
// 导入并注册组件
import type { App } from 'vue'
import coms from './coms'

export function useComponents(app: App) {
  app.use(elementplus).use(Antd)
  coms.forEach((com) => {
    app.component(com.name, com.val)
  })
}
