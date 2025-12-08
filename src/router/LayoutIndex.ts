import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// 1. 引入 NProgress JS
import NProgress from 'nprogress'
// 2. 🔥 必须引入 NProgress 的 CSS，否则看不到进度条！
import 'nprogress/nprogress.css'
// 1. 引入组件 (实际开发中建议使用懒加载)
import Layout from '../components/layout/Layout.vue' //这是父级容器
import TopNav from '../components/layout/TopNav.vue'
import SideMenu from '../components/layout/SideMenu.vue'
import SettingMenu from '../components/layout/SettingMenu.vue'
import DashboardHome from '../components/layout/DashboardHome.vue'
import SettingProfile from '../components/layout/SettingProfile.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: { name: 'Dashboard' },// 重定向
        // 父级路由：只是一个壳子，用来承载布局
        component: Layout,
        children: [
            {
                // 场景 A：仪表盘
                // 访问 /dashboard 时：
                // 1. default (主内容) -> 显示 DashboardHome
                // 2. NavBar -> 显示 TopNav
                // 3. SideBar -> 显示 SideMenu (标准菜单)
                path: 'dashboard',
                name: 'Dashboard',
                alias: ["board", "dash-board"],
                meta: { title: '数据概览' },
                components: {
                    default: DashboardHome,
                    NavBar: TopNav,
                    SideBar: SideMenu
                }
            },
            {
                // 场景 B：设置页
                // 访问 /settings 时：
                // 1. default (主内容) -> 显示 SettingProfile
                // 2. NavBar -> 依然显示 TopNav (复用)
                // 3. SideBar -> 🔥 变成了 SettingMenu (设置专用菜单)
                path: 'settings',
                name: 'Settings',
                meta: { title: '资料设置' },
                components: {
                    default: SettingProfile,
                    NavBar: TopNav,
                    SideBar: SettingMenu
                }
            }
        ],
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局守卫：路由切换时，更新页面标题
router.beforeEach((to, from) => {
    // 判断登录状态...
    // if (to.meta.requiresAuth && !isLogin) {
    //     return { name: 'Login' }
    // }
    if (to.meta.title) {
        document.title = to.meta.title as string
    }
})

// 3. (可选) 简单配置：关掉右上角的旋转圆圈 (Spinner)，通常我们只需要顶部的横条
NProgress.configure({ showSpinner: false })
// 4. 开启进度条：在路由跳转开始时
router.beforeEach((to, from) => {
    NProgress.start()

})

// 5. 结束进度条：在路由跳转完成时 (场景 B)
router.afterEach((to, from, failure) => {
    NProgress.done()
})
export default router