<template>
  <div ref="chatingBox" class="chating-box">
    <div v-for="(message, index) in messages" :key="index" class="message">
      {{ message }}
    </div>
  </div>
  <input type="text" v-model="input" />
  <button @click="send">Send</button>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";

const messages = ref<String[]>(["消息1"]);
const input = ref("");
const chatingBox = ref<HTMLDivElement>();
const send = async () => {
  messages.value.push(input.value);
  // 确保数据渲染到dom上
  await nextTick();
  chatingBox.value!.scrollTop = chatingBox.value!.scrollHeight;
};
</script>

<style scoped>
.chating-box {
  width: 50vw;
  height: 50vh;
  background-color: steelblue;
  overflow-y: scroll;
}

.message {
  font-size: 1.5rem;
  color: white;
  margin: 1rem;
  border: 1px solid #fff;
  border-radius: 10px;
  text-align: left;
}
</style>
