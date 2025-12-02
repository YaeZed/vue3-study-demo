<template>
  <input type="text" placeholder="自动获取焦点的输入框" v-focus />

  <p v-color="'red'">这段文字是红色的</p>

  <div class="btns">
    鉴权按钮：
    <button class="btn" v-permission="['user:edit']">编辑用户</button>
    <button class="btn" v-permission="['user:add']">添加用户</button>
  </div>

  <div>
    点击外部关闭弹窗
    <ul v-if="isShow" v-click-outside="closeModal">
      <li>11</li>
      <li>11</li>
      <li>11</li>
    </ul>
  </div>

  <div class="div">
    <h2>图片懒加载</h2>
    <div v-for="item in arr" :key="item">
      <img :data-index="item" v-lazy="item" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Directive, type DirectiveBinding, ref } from "vue";
import { vPermission } from "./ts/directives/permission";
import { vClickOutside } from "./ts/directives/clickOutside";
import { vLazy } from "./ts/directives/lazy";
// 写法
// 定义一个v-focus指令
// 命名规则：vxxx
const vFocus: Directive = {
  mounted(el: HTMLElement) {
    el.focus();
  },
};

// 定义一个带参数的指令v-color
const vColor: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.style.color = binding.value;
  },
};

const isShow = ref(true);
const closeModal = () => {
  isShow.value = false;
};

// Record:它的核心作用是：快速定义一个对象，规定它的“键（Key）”是什么类型，“值（Value）”是什么类型。
const images: Record<string, { default: string }> = import.meta.glob(
  "../assets/images/*.*",
  { eager: true }
);

// 数据提取p
let arr = Object.values(images).map((item) => item.default);
</script>

<style scoped>
.btn {
  margin: 10px;
}

img {
  height: 50vh;
  width: auto;
}
</style>
