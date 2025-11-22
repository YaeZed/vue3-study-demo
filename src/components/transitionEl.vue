<template>
  <div class="container">
    <button @click="show = !show">切换动画</button>
    <!-- 自定义动画类名，结合第三方库 -->
    <transition
      name="custom-class"
      enter-active-class="animate__animated animate__bounceInRight"
      leave-active-class="animate__animated animate__bounceOutRight"
    >
      <div class="box" v-if="show">Animate.css动画</div>
    </transition>

    <!-- 动画组 -->
    <button @click="groups.push(groups.length + 1)">增加</button>
    <button @click="groups.pop()">减少</button>
    <transition-group
      name="custom-class"
      enter-active-class="animate__animated animate__bounceInRight"
      leave-active-class="animate__animated animate__bounceOutRight"
    >
      <div v-for="(item, index) in groups" :key="index" class="box">
        {{ item }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const show = ref(true);
const groups = ref([1, 2, 3]);
</script>

<style scoped>
.box {
  width: 200px;
  height: 100px;
  background-color: #42b883;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border-radius: 8px;
}
</style>
