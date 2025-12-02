import { ref, onMounted, onUnmounted } from 'vue'

export const useWindowSize = (wait = 200) => {
    //初始化宽高，检查window是否存在
    const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0)
    const height = ref(typeof window !== 'undefined' ? window.innerHeight : 0)

    let timer: number | null = null
    // 更新函数
    const update = () => {
        width.value = window.innerWidth
        height.value = window.innerHeight
    }

    // 防抖逻辑
    const debouncedUpdate = () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            update()
        }, wait)
    }
    // 监听窗口大小变化
    onMounted(() => {
        window.addEventListener('resize', debouncedUpdate)

    })

    onUnmounted(() => {
        window.removeEventListener('resize', debouncedUpdate)
        // 销毁组件时，清除定时器
        if (timer) clearTimeout(timer)

    })

    // 返回响应式数据
    return { width, height }
}