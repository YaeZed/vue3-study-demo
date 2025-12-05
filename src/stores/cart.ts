import { defineStore } from "pinia"
import { computed, ref } from "vue"

// 1.定义接口
// 基础商品类型
interface Product {
    id: number,
    name: string,
    price: number,
}

// 购物车商品类型
interface CartItem extends Product {
    quantity: number
}

export const useCartStore = defineStore('cart', () => {
    // 2.定义状态
    const products = ref<Product[]>([
        { id: 1, name: 'iPhone 15', price: 6000 },
        { id: 2, name: 'AirPods Pro', price: 1500 },
        { id: 3, name: 'MacBook Air', price: 8000 },
    ])

    // 购物车列表，初始为空
    const cartItems = ref<CartItem[]>([])

    // 3.定义getters
    // 获取购物车数量
    const totalItems = computed((): number => {
        return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
    })
    // 获取购物车总价
    const totalPrice = computed((): number => {
        return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    })

    // 4.定义actions
    // 添加商品到购物车
    const addToCart = (product: Product) => {
        // 遍历购物车列表，查找是否已存在该商品
        const existingItem = cartItems.value.find(item => item.id === product.id)
        if (existingItem) {
            // 已存在，数量+1
            existingItem.quantity++
        } else {
            // 不存在，添加到列表
            cartItems.value.push({ ...product, quantity: 1 })
        }
    }

    // 从购物车中删除商品
    const removeFromCart = (productId: number) => {
        // 遍历购物车列表，查找该商品并删除
        cartItems.value = cartItems.value.filter(item => item.id !== productId)
    }

    // 清空购物车
    const clearCart = () => {
        cartItems.value = []
    }

    return {
        products,
        cartItems,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart
    }
}, {
    persist: {
        key: 'cartStorage',
        storage: localStorage
    }
})