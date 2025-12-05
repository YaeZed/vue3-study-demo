<template>
  <h1>路由页面</h1>
  <!-- router-link -->
  <!-- <router-link :to="{ name: 'toFamily' }" replace>跳转到to</router-link> -->
  <!-- <hr /> -->
  <!-- <router-link to="/watchBasic" replace>跳转到watch</router-link> -->

  <!-- 编程式导航 -->
  <button @click="toPage('toFamily')">跳转到to</button>
  <button @click="toPage('watchBasic')">跳转到watch</button>

  <!-- 前进和后退 -->
  <button @click="router.go(1)">next</button>
  <button @click="router.back()">prev</button>

  <hr />
  <h1 style="font-weight: bold">这里渲染路由组件</h1>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const toPage = (name: string) => {
  router.push({
    name: name,
  });
};
</script>

<style scoped></style>
