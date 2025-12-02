<template>
  <h2>自定义计数器cnt1</h2>
  <p>当前计数: {{ cnt1.count }}</p>
  <p>双倍计数: {{ cnt1.doubleCount }}</p>
  <button @click="cnt1.increment">+</button>
  <button @click="cnt1.decrement">-</button>

  <h2>自定义计数器cnt2</h2>
  <p>当前计数: {{ cnt2.count }}</p>
  <p>双倍计数: {{ cnt2.doubleCount }}</p>
  <button @click="cnt2.increment">+</button>
  <button @click="cnt2.decrement">-</button>

  <div>
    <h2>窗口尺寸监听</h2>
    <p>宽度: {{ width }} px</p>
    <p>高度: {{ height }} px</p>

    <div v-if="width < 768" class="mobile-warning">当前是移动端布局</div>
  </div>
</template>

<script setup lang="ts">
import { useCounter } from "./ts/hooks/useCounter";
import { useWindowSize } from "./ts/hooks/useWindowSize";

const cnt1 = useCounter(10);
// 两者不冲突
const cnt2 = useCounter(20);

const { width, height } = useWindowSize(1500);
</script>

<style scoped>
.mobile-warning {
  color: red;
  font-weight: bold;
}
</style>
