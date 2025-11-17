<template>
  <!-- <commandBasic></commandBasic> -->
  <!-- <refFamily></refFamily> -->
  <!-- <reactiveFamily></reactiveFamily> -->
  <!-- <toFamily></toFamily> -->
  <!-- <computed></computed> -->
  <!-- <watchBasic></watchBasic> -->

  <!-- 生命周期eg -->
  <!-- <lifeCircle v-if="display"></lifeCircle>
  <button @click="display = !display">点击切换组件</button> -->

  <!-- 父子组件传参eg -->
  <!-- <div class="parent-container">
    <h2>父组件</h2>
    <label>更新给子组件的消息：</label>
    <input type="text" v-model="messageForChild" />
  </div>

  <p>
    从子组件收到的消息: <strong>{{ messageFromChild }}</strong>
  </p>

  <hr />

  <props_emits
    :main-message="messageForChild"
    @update-message="handleChildMessage"
  ></props_emits> -->

  <!-- 全局组件 -->
  <!-- <base-button>全局按钮组件</base-button> -->

  <!-- 递归组件 -->
  <!-- <treeNode :node="fileTree"></treeNode> -->

  <!-- 全局动态组件 -->
  <!-- <div style="display: flex">
    <button v-for="data in dynamics" @click="changeComponent(data)">
      {{ data.name }}
    </button>
  </div>
  <hr />
  <component :is="currentComponent" :message="currentMessage"></component> -->

  <!-- 插槽 -->
  <slotBasic>
    <!-- 默认插槽 -->
    <p>这是父组件</p>
    <img src="./assets/macllen.PNG" alt="macllen" style="width: 100px" />

    <!-- 具名插槽 -->
    <!-- 使用 <template> 标签和 v-slot 指令（或其简写 #）来指定要填充的插槽。 -->
    <template #header>
      <h2>这是一个模态框标题</h2>
    </template>

    <template #main>
      <p>这是模态框的主要内容</p>
    </template>

    <template #footer>
      <button>取消</button>
      <button>确认</button>
    </template>

    <!-- 作用域插槽 -->
    <!--父组件通过 v-slot (或 #) 解构子组件传递的数据，并且可以立即为这些数据添加 TypeScript 类型。  -->
    <template #user-item="{ user, isAdmin }: { user: User, isAdmin: boolean }">
      <span> {{ user.name }}-{{ user.age }}岁 </span>
      <span v-if="isAdmin" style="color: red; margin-left: 10px">[管理员]</span>
    </template>
  </slotBasic>
</template>

<script setup lang="ts">
import { ref, type Component, markRaw, shallowRef } from "vue";
import commandBasic from "./components/commandBasic.vue";
import refFamily from "./components/refFamily.vue";
import reactiveFamily from "./components/reactiveFamily.vue";
import toFamily from "./components/toFamily.vue";
import computed from "./components/computed.vue";
// import watchBasic from "./components/watchBasic.vue";
import lifeCircle from "./components/lifeCircle.vue";
import props_emits from "./components/props_emits.vue";
import treeNode from "./components/treeNode.vue";
// 插槽
import slotBasic from "./components/slotBasic.vue";

// 动态组件
import A from "./components/dynamics/A.vue";
import B from "./components/dynamics/B.vue";
import C from "./components/dynamics/C.vue";
const display = ref(true);

/**
 * 父子组件传参
 */
// 父组件的本地状态
const messageForChild = ref("你好，子组件！这是来自父组件的消息。");
const messageFromChild = ref("...等待子组件的消息..."); // 存放从子组件收到的消息

// 定义一个函数，用于处理子组件触发的 'updateMessage' 事件
// TypeScript 在这里可以根据子组件的 emit 定义自动推断 'newMessage' 的类型为 string
const handleChildMessage = (newMessage: string) => {
  messageFromChild.value = newMessage;
};

/**
 * 递归组件
 */
import type { TreeNodeData } from "./components/ts/types";

// mock数据
const fileTree = ref<TreeNodeData>({
  id: "root",
  label: "项目根目录 (src)",
  children: [
    {
      id: "c1",
      label: "components",
      children: [
        { id: "c1-1", label: "TreeNode.vue" },
        { id: "c1-2", label: "BaseButton.vue" },
      ],
    },
    {
      id: "c2",
      label: "views",
      children: [{ id: "c2-1", label: "HomePage.vue" }],
    },
    {
      id: "c3",
      label: "App.vue",
      // 这个节点没有 children，递归将在此处停止
    },
  ],
});

/**
 * 全局动态组件
 */
// 2. 定义一个对象来映射组件名称或键
// 使用 markRaw 告诉 Vue 这些组件不需要被深度响应式处理，可以优化性能
const componentsMap: Record<string, Component> = {
  ComponentA: markRaw(A),
  ComponentB: markRaw(B),
  ComponentC: markRaw(C),
};
// 定义一个dynamics数组
// 其中每个对象包含组件名称、组件对象、给组件传递的消息
interface DynamicData {
  name: string;
  com: Component;
  message: string;
}

const dynamics = ref<DynamicData[]>([
  {
    name: "ComponentA",
    com: componentsMap.ComponentA,
    message: "hello world",
  },
  {
    name: "ComponentB",
    com: componentsMap.ComponentB,
    message: "welcome",
  },
  {
    name: "ComponentC",
    com: componentsMap.ComponentC,
    message: "YaeZed",
  },
]);

// 3.创建 ref 来存储当前要渲染的组件对象和传递给子组件的消息
// 使用 shallowRef 是最佳实践，因为组件对象本身不需要深度响应
// 并使用 Component 类型，它从 'vue' 导入
const currentComponent = shallowRef<Component>(componentsMap.ComponentA);
const currentMessage = ref("hello world");

// 4.定义切换组件的方法
const changeComponent = (data: DynamicData) => {
  currentComponent.value = data.com;
  currentMessage.value = data.message;
};

// 作用域插槽
// 可以（也应该）在父组件中也定义这个类型，以便复用
interface User {
  id: number;
  name: string;
  age: number;
}
</script>

<style scoped>
.parent-container {
  border: 2px solid #34495e;
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 8px;
}
input {
  margin-left: 10px;
}
button {
  padding: 20px 20px;
  margin: 10px 10px;
  font-size: 20px;
}
</style>
