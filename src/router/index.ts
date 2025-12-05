import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/toFamily',
        name: 'toFamily',// 路由命名
        component: () => import('../components/toFamily.vue')
    },
    {
        path: '/watchBasic',
        name: 'watchBasic',
        component: () => import('../components/watchBasic.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('../components/cart.vue')
    },
    {
        path: '/detail/:id',// 动态路由
        name: 'detail',
        component: () => import('../components/productDetail.vue')

    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 导出
export default router