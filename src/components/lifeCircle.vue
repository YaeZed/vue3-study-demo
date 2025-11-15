<template>
  <div class="lifecycle">
    <h3>生命周期演示</h3>
    <p>
      当前计数值 (count): <strong>{{ count }}</strong>
    </p>
    <button @click="count++">count++</button>
    <p><i>请打开浏览器的控制台查看生命周期日志。</i></p>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";

/**1.--- 创建阶段 ---
 * beforeCreate && created
 * <script setup> 本身就是在 beforeCreate 和 created 阶段执行的。
 * 因此，在 <script setup> 中，没有 beforeCreate 和 created 这两个钩子。
 * 在这个 <script> 标签顶层编写的任何代码（比如定义变量、console.log）都可以看作是在 created 钩子中执行的。
 */
console.log("--- 1.script setup ---");
console.log("组件正在被创建");

const count = ref(0);

/**
 * 2.--- 挂载阶段 ---
 * beforeMount && mounted
 */
// beforeMount 钩子的调用时机：在组件即将被挂载到 DOM 之前调用。此时，template 已经编译完成，但尚未渲染成真实的 DOM。
onBeforeMount(() => {
  console.log("--- 2. onBeforeMount ---");
  console.log("组件即将挂载，DOM 尚未创建。");
  console.log("count 值:", count.value);
});
// mounted 钩子的调用时机：在组件完成挂载到 DOM 之后调用。此时，template 中的数据已经渲染成真实的 DOM，可以进行后续的操作。
onMounted(() => {
  console.log("--- 3. onMounted ---");
  console.log("组件已挂载，DOM 已创建。");
  // 此时可以安全地访问 DOM，例如：
  //   const el = document.querySelector(".lifecycle");
  //   console.log("DOM 元素:", el);
});

/**
 * 3.--- 更新阶段 ---
 * beforeUpdate && updated
 */
// beforeUpdate 钩子的调用时机：当组件的响应式数据（如 ref 或 reactive）发生变化，即将触发 DOM 更新之前调用。此时，可以修改数据，但不触发视图更新。
onBeforeUpdate(() => {
  console.log("--- 4. onBeforeUpdate ---");
  console.log("数据已更新，但 DOM 尚未更新。");
  console.log("即将更新的 count 值:", count.value);
});
// updated 钩子的调用时机：在组件的 DOM 更新完成之后调用。
onUpdated(() => {
  console.log("--- 5. onUpdated ---");
  console.log("数据已更新，DOM 已更新。");
  console.log("更新后的 count 值:", count.value);
});

/**
 * 4.--- 销毁阶段 ---
 * beforeUnmount && unmounted
 * 当这个组件从父组件中被 v-if="false" 移除时触发
 */
// beforeUnmount 钩子的调用时机：在组件实例即将被卸载和销毁之前调用。此时组件功能仍然正常。
onBeforeUnmount(() => {
  console.log("--- 6. onBeforeUnmount ---");
  console.log("组件即将卸载。");
  // 适合在此处清理定时器、事件监听器等
  // clearInterval(myTimer);
});
// unmounted 钩子的调用时机：在组件实例完全卸载和销毁之后调用。此时组件功能已不可用。
onUnmounted(() => {
  console.log("--- 7. onUnmounted ---");
  console.log("组件已卸载。");
});
</script>

<style scoped>
.lifecycle {
  padding: 20px;
  border: 2px solid #42b983;
  border-radius: 8px;
  background-color: #f0f9f5;
}
button {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #36a476;
}
</style>
