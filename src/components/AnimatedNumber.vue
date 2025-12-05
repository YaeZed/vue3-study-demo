<template>
  <span>{{ formattedNumber }}</span>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import gsap from "gsap";

const props = defineProps<{
  value: number; // 接收父组件传来的目标值
}>();

// 用于展示的响应式数字（初始值等于传入的值）
const tweened = ref({ number: props.value });

// 监听 value 的变化
watch(
  () => props.value,
  (newVal) => {
    // 使用 GSAP 让 tweened.number 在 0.5秒内 平滑过渡到 newVal
    gsap.to(tweened.value, {
      duration: 0.5,
      number: newVal,
      ease: "power2.out", // 缓动效果：先快后慢
    });
  }
);

// 格式化显示（去除小数点）
const formattedNumber = computed(() => {
  return Math.floor(tweened.value.number); // 如果是金额，可以用 .toFixed(2)
});
</script>
