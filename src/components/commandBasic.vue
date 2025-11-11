<template>
  <!-- 1.插值语法 -->
  <!-- <h1>{{ message }}</h1> -->
  <!-- 2.插值语法里可以写表达式:
     （1）条件运算
     （2）数值运算
     （3）操作api
      -->
  <!-- <h1>{{ message.split("").reverse().join("") }}</h1> -->
  <!-- 3.v-text：可以直接将数据绑定到元素的文本内容上 -->
  <!-- <h1 v-text="message"></h1> -->
  <!-- 4.v-html：可以直接将数据绑定到元素的innerHTML上 -->
  <!-- <div v-html="innerHTML"></div> -->
  <!-- 5.v-if：条件渲染 -->
  <!-- <h1 v-if="show">v-if渲染{{ message }}</h1> -->
  <!-- 6.v-show：条件展示 -->
  <!-- <h1 v-show="show">v-show渲染{{ message }}</h1> -->
  <!-- 7.v-for：循环渲染 -->
  <!-- <ul>
    <li v-for="fruit in arr">{{ fruit }}</li>
  </ul> -->
  <!-- 8.v-on：事件绑定，简写为@事件名
     （1）可以用修饰符控制事件的触发条件，如：@click.stop
     9.v-bind：属性绑定，简写为:属性名，若属性里有多个值，用数组表示，如：:class="['btn', 'active']" -->
  <!-- <button @click="handleClick" :class="show ? 'btn' : ''">Click me</button> -->
  <!-- 10.v-model：双向数据绑定，可以绑定input、select、textarea等元素的value和input事件 -->
  <!-- <input type="text" v-model="message" />
  <h2>{{ message }}</h2> -->
  <!-- 10.v-once：只渲染一次，后续更新不会重新渲染 -->
  <!-- <h1 v-once>{{ message }}</h1> -->
  <!-- 11.v-memo，可以缓存组件的渲染结果，提高渲染效率 -->
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
const show: boolean = true;
const message: Ref<string> = ref("Hello Vue 3 + Vite");
const innerHTML: string = "<h1>This is innerHTML</h1>";
const arr: string[] = ["apple", "banana", "orange"];
const handleClick = () => {
  console.log("点击事件");
};
</script>

<style scoped>
.btn {
  font-family: "Roboto", sans-serif;
  background: linear-gradient(to right, #4facfe, #00f2fe);
  color: #fff;
  padding: 10px 20px;
  border: none;
  transition: all 0.3s ease;
}
.btn:hover {
  background: linear-gradient(to right, #00f2fe, #4facfe);
  scale: 1.1;
}
</style>
