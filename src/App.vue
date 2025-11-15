<template>
  <!-- <commandBasic></commandBasic> -->
  <!-- <refFamily></refFamily> -->
  <!-- <reactiveFamily></reactiveFamily> -->
  <!-- <toFamily></toFamily> -->
  <!-- <computed></computed> -->
  <!-- <watchBasic></watchBasic> -->
  <lifeCircle v-if="display"></lifeCircle>
  <button @click="display = !display">点击切换组件</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import commandBasic from "./components/commandBasic.vue";
import refFamily from "./components/refFamily.vue";
import reactiveFamily from "./components/reactiveFamily.vue";
import toFamily from "./components/toFamily.vue";
import computed from "./components/computed.vue";
// import watchBasic from "./components/watchBasic.vue";
import lifeCircle from "./components/lifeCircle.vue";

const display = ref(true);
</script>

<style scoped></style>
