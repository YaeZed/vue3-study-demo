<template>
  <div class="sneder">
    <h3>我是组件A（发送方）</h3>
    <button @click="handleSend">发送用户信息给兄弟组件</button>
  </div>
</template>

<script setup lang="ts">
import bus from "./ts/mittBus";

const handleSend = () => {
  console.log("组件A:事件已发送");

  // 这里的 'user-login' 必须匹配 Events 中定义的 key
  // 第二个参数必须匹配 { username: string; token: string; }
  bus.emit("user-login", {
    username: "YaeZed",
    token: "0826",
  });
};
</script>

<style scoped></style>
