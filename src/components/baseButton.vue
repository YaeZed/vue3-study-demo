<template>
  <button class="base-button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
// 全局组件是在 main.ts 中一次性注册，之后就可以在项目中的任何组件模板内直接使用，无需 import。
// 这里可以定义 props, emits 等
// 例如:
// defineProps<{ type: 'primary' | 'secondary' }>()
</script>

<style scoped>
.base-button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.base-button:hover {
  background-color: #f0f0f0;
  scale: 0.98;
}
</style>
