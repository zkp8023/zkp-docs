import type { App } from 'vue'
import Popper from 'vue3-popper'
import Antd from 'ant-design-vue'
import ElementPlus from 'element-plus'

export default {
  install(app: App) {
    app.component('Popper', Popper)
    app.use(Antd).use(ElementPlus)
  },
}
