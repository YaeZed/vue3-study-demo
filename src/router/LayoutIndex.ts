import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

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
                components: {
                    default: SettingProfile,
                    NavBar: TopNav,
                    SideBar: SettingMenu
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router