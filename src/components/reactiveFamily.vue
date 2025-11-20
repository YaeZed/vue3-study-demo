<template>
  <div>{{ person.name }} is {{ person.age }}</div>
  <button @click="addAge">点击增加年龄</button>
  <div>
    <ul>
      <li v-for="person in persons">{{ person }}</li>
    </ul>
    <button @click.prevent="addPerson">添加人员</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, shallowReactive } from "vue";

interface person {
  name: string;
  age: number;
}

// 1.reactive用来绑定复杂的数据类型 例如 对象 数组 map，set
const person = reactive({
  name: "YaeZed",
  age: 23,
});

const person1: person = reactive({
  name: "Tom",
  age: 25,
});

// 2.可以直接修改person的属性，不用.value
const addAge = () => {
  person.age++;
};

// 3.数组异步赋值渲染问题
let persons = reactive<string[]>([]);
let arr = ["YaeZed", "Tom", "Jerry"];
const addPerson = () => {
  setTimeout(() => {
    // 这样赋值页面是不会变化的，因为reactive是proxy代理，直接赋值会破坏响应式
    persons = arr;
    console.log(persons); // 输出 ["YaeZed", "Tom", "Jerry"]，但是模板并不会加载persons数组
  }, 1000);
};

// 3.1 解决方案1，使用数组的方法push
// const addPerson = () => {
//   setTimeout(() => {
//     persons.push(...arr);
//   }, 2000);
// };

// 3.2 解决方案2，包裹一层对象，数组设置为属性
// type Person = {
//   nameList: string[];
// };
// const personsObj = reactive<Person>({
//   nameList: [],
// });
// const addPerson = () => {
//   setTimeout(() => {
//     personsObj.nameList = arr;
//     console.log(personsObj.nameList);
//   }, 2000);
// };

// 4.同ref，shallowReactive用来绑定复杂的数据类型 例如 对象 数组 map，set，但是只会监听第一层属性的变化，不会监听深层属性的变化
</script>

<style scoped></style>
