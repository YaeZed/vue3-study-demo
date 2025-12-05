<template>
  <div class="slide-container">
    <transition :name="transitionName">
      <span :key="value" class="number">{{ value }}</span>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";

const props = defineProps<{ value: number }>();

// 记录方向类名
const transitionName = ref("slide-up");

watch(
  () => props.value,
  (newVal, oldVal) => {
    // 如果新值大于旧值，向上滚动；否则向下滚动
    if (newVal > oldVal) {
      transitionName.value = "slide-up";
    } else {
      transitionName.value = "slide-down";
    }
  }
);
</script>

<style scoped>
.slide-container {
  display: inline-block;
  position: relative;
  height: 1.6em; /* 限制高度 */
  width: 2em; /* 限制宽度，防止数字变化导致布局抖动 */
  overflow: hidden; /* 隐藏超出部分 */
  vertical-align: middle;
  text-align: center;
}

.number {
  position: absolute; /* 让新旧数字重叠在一起 */
  left: 0;
  width: 100%;
  top: 0;
}

/* --- 向上滚动 (增加) --- */
/* 新数字进入 */
.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
/* 旧数字离开 */
.slide-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* --- 向下滚动 (减少) --- */
/* 新数字进入 */
.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
/* 旧数字离开 */
.slide-down-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* 激活状态 */
.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
</style>
