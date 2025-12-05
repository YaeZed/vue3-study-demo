import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/toFamily',
        component: () => import('../components/toFamily.vue')
    },
    {
        path: '/watchBasic',
        component: () => import('../components/watchBasic.vue')
    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 导出
export default router