<template>
  <h1>C</h1>
  <h2>{{ message }}</h2>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string; // 父组件传递的 props
}>();
</script>

<style scoped></style>
