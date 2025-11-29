import type { Directive, DirectiveBinding } from "vue";

export const vClickOutside: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        // 定义点击处理函数
        const handleClick = (e: MouseEvent) => {
            // 如果点击的目标在元素内部
            if (el.contains(e.target as Node)) {
                return
            }
            // 如果点击的目标不在元素内部，且指令传入了函数，触发绑定的回调函数
            if (binding.value && typeof binding.value === 'function') {
                binding.value(e)
            }
        }

        // 将处理函数挂载到el上，方便后续卸载时读取
        (el as any).__clickOutside__ = handleClick

        // 绑定点击事件
        document.addEventListener('click', handleClick)
    },

    unmounted(el: HTMLElement) {
        // 移除事件监听，防止内存泄漏
        if ((el as any).__clickOutside__) {
            document.removeEventListener('click', (el as any).__clickOutside__)
            delete (el as any).__clickOutside__
        }
    },
}