<template>
  <div class="child">
    <h3>后代组件接收：{{ user!.name }}</h3>
    <button @click="handleChange">修改名字</button>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { UserKey, UpdateUserKey } from "./ts/symbol";

// 1.注入数据
const user = inject(UserKey);
// 2.注入方法
const updateUser = inject(UpdateUserKey);

const handleChange = () => {
  // 3.调用方法
  if (updateUser) {
    updateUser("new name from child:YaeSakura");
  }
};
</script>

<style scoped></style>
