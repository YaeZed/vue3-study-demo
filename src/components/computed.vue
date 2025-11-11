<template>
  <div>
    <p>{{ firstname }}</p>
    <p>{{ lastname }}</p>
    <p>{{ fullName1 }}</p>
  </div>

  <div>
    <p>{{ fullName2 }}</p>
    <button @click="changeName">点击修改名字</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

let firstname = ref("Yae");
let lastname = ref("Zed");

/**
 * computed
 * 计算属性就是当依赖的属性的值发生变化的时候，才会触发计算属性的更改，如果依赖的值没有变化，使用的是缓存中的属性值
 *
 */

// 1.函数形式，只有getter（只读）
const fullName1 = computed<string>(() => {
  return `${firstname.value} ${lastname.value}`;
});
// fullName.value = "Yae Zed"; // 这里会报错，因为computed只读，不能修改值

// 2.对象形式，有getter和setter
let fullName2 = computed<string>({
  get: () => {
    return `${firstname.value}-${lastname.value}`;
  },
  set: (newVal) => {
    // 当fullName2.value被修改的时候，会调用set方法
    console.log("set被调用了,newVal:", newVal);
    [firstname.value, lastname.value] = newVal.split("-");
  },
});

const changeName = () => {
  fullName2.value = "Yae-Sakura";
};
</script>

<style scoped></style>
