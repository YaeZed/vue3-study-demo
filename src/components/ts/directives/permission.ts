import type { Directive, DirectiveBinding } from "vue";

// mock用户拥有的权限列表
const userPermissions = ['user:add', 'user:edit']

export const vPermission: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const { value } = binding

        if (value && value instanceof Array && value.length > 0) {
            const requiredPermissions = value
            // 检查与用户权限是否有交集
            const hasPermission = userPermissions.some((permission) => requiredPermissions.includes(permission))

            if (!hasPermission) {
                //如果没有权限，则移除该元素
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            // 提示错误信息
            throw new Error(`需要传递权限数组! 例如 v-permission="['admin']"`)
        }
    },
}