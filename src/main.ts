import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 全局组件定义
import baseButton from './components/baseButton.vue'

const app = createApp(App)

// 全局组件注册
// app.component('组件名', 组件对象)
// 注册后，在任何其他组件中都可以直接使用 <BaseButton>，无需导入。
app.component('base-button', baseButton)

// 使用element-plus
app.use(ElementPlus)
app.mount('#app')
