<template>
  <div>
    <h3>toRefs</h3>
    <p>姓名: {{ name }}</p>
    <p>年龄: {{ age }}</p>

    <input v-model="user.name" />
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, toRef, toRaw } from "vue";
/**
 * 1.toRefs
 * toRefs 的主要作用是让你能解构 reactive 对象，同时在模板中直接使用这些解构出来的变量（它们是 ref），并且保持响应性。
 *
 */

interface User {
  name: string;
  age: number;
}

const user = reactive<User>({
  name: "YaeZed",
  age: 25,
});
// // 如果想直接结构reactive，会丢失响应性
// const { name, age } = user;

// 使用 toRefs 解构，将所有属性转换为ref
const { name, age } = toRefs(user);

/**
 * 2.toRef
 * toRef 的作用是将一个响应式对象中的某个属性转换为 ref 对象。
 * toRef 不常用于“美化”模板，它主要用于在 <script setup> 逻辑中传递响应性。
 */
// const name = toRef(user, "name");

/**
 * 3.toRaw
 * toRaw 的作用是将一个响应式对象转换为普通对象。
 * toRaw 主要用于在 <script setup> 逻辑中传递响应性。
 */
const state = reactive({
  id: 1,
  title: "reactive state",
});

const logRawData = () => {
  // 获取原始对象
  const rawState = toRaw(state);

  console.log("--- 响应式代理 (Proxy) ---");
  console.log(state);
  console.log("--- 原始对象 (Raw) ---");
  console.log(rawState);
};
logRawData();
</script>

<style scoped></style>
