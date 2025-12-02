import { ref, computed } from 'vue'

export const useCounter = (initialValue = 0) => {
    // 1.定义状态
    const count = ref(initialValue)

    // 2.定义逻辑
    const doubleCount = computed(() => count.value * 2)

    const increment = () => {
        count.value++
    }

    const decrement = () => {
        count.value--
    }

    return {
        count,
        doubleCount,
        increment,
        decrement
    }
}