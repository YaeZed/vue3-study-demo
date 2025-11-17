<template>
  <div class="child-contaier">
    <h3>子组件</h3>
    <p>父组件传来的消息 (mainMessage):</p>
    <blockquote>{{ props.mainMessage }}</blockquote>

    <button @click="sendMessageToParent">向父组件发送消息</button>
  </div>
</template>

<script lang="ts" setup>
/**
 * 1. 接收 Props (父 -> 子)
 *  使用泛型参数为 props 定义类型。
 */
const props = defineProps<{
  mainMessage: string; // 父组件传递的 props
}>();

/**
 * 2.定义 Emits (子 -> 父)
 * 使用泛型参数为 emit 定义事件和载荷类型。
 */
const emit = defineEmits<{
  // (e: '事件名', 载荷1: 类型, 载荷2: 类型, ...): void
  (e: "updateMessage", message: string): void;
}>();

// 定义一个点击事件，用于触发emit
const sendMessageToParent = () => {
  const message = `你好父组件，我更新了！(时间戳: ${Date.now()})`;

  // 触发事件，并将消息传递给父组件
  // Vue会查找父组件上绑定的@updateMessage事件，并执行回调函数
  emit("updateMessage", message);
};
</script>

<style scoped>
.child-container {
  border: 2px dashed #42b983;
  background-color: #f0fff4;
  padding: 15px;
  margin-top: 15px;
  border-radius: 8px;
}
blockquote {
  margin: 0;
  padding: 10px;
  background: #fff;
  border-left: 5px solid #ccc;
}
</style>
