import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useCartStore } from "../stores/cart"
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
        path: '/',
        name: 'cart',
        component: () => import('../components/cart.vue')
    },
    {
        path: '/detail/:id',// 动态路由
        name: 'detail',
        component: () => import('../components/productDetail.vue')

    },
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import('../components/checkout.vue'),
        // 路由守卫
        // 如果写next，就使用next，否则用return
        beforeEnter: (to, from) => {

            const cartStore = useCartStore()

            if (cartStore.cartItems.length != 0) {
                // 放行
                return
            } else {
                // 阻止进入
                alert('please add product to cart first')
                return false
            }
        }
    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 导出
export default router