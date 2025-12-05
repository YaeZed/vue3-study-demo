import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'animate.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // 引入插件
import router from './router/index'

// 全局组件定义
import baseButton from './components/baseButton.vue'

const app = createApp(App)

const store = createPinia()
store.use(piniaPluginPersistedstate) // 使用插件
app.use(store)
// 全局组件注册
// app.component('组件名', 组件对象)
// 注册后，在任何其他组件中都可以直接使用 <BaseButton>，无需导入。
app.component('base-button', baseButton)

// 使用element-plus
app.use(ElementPlus)

// 使用路由
app.use(router)
app.mount('#app')
