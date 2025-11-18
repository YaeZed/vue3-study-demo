<template>
  <div class="card">
    <div class="user-info">
      <img :src="user.avatar" alt="avatar" />
      <div class="user-name">{{ user.name }}</div>
    </div>
    <hr />
    <div class="content">
      <p>{{ user.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface User {
  id: number;
  name: string;
  avatar: string;
  content: string;
}

const user = ref<User>({
  id: 1,
  name: "YaeZed",
  avatar: "https://avatars.githubusercontent.com/u/52018740?v=5",
  content: "Hello, Vue3!",
});
</script>

<style scoped>
.card {
  width: 300px;
  height: 300px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.user-info {
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
}

img {
  width: 150px;
  height: 150px;
  border-radius: 100px;
}

.user-name {
  margin-left: 30px;
  font-size: 24px;
  font-weight: bold;
}

.content {
  margin-left: 10px;
}
</style>
