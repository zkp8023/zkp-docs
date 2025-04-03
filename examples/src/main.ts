import { createApp } from 'vue'

import App from './App.vue'
import { setupDirectives } from './directives'
import plugins from './plugins'
import 'ant-design-vue/dist/antd.css'
import '../src/style'
import 'animate.css'
// svg-icon
import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'

const app = createApp(App)

// 注册全局自定义指令
setupDirectives(app)

// 注册全局插件
app.use(plugins).mount('#app')
