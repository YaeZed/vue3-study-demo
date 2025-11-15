<template>
  <!-- 模板里可以直接使用变量 -->
  <div>
    {{ message }}
    <br />
    <button @click="changeMessage">改变message</button>
  </div>

  <div>
    {{ obj.name }}
    <br />
    <button @click="changeObj">改变Obj</button>
  </div>

  <div>
    防抖：{{ name }}
    <br />
    <input type="text" v-model="name" />
  </div>

  <br />
</template>

<script setup lang="ts">
import { ref, shallowRef, triggerRef, customRef } from "vue";

let message = ref<string | number>("Loading...");

const changeMessage = () => {
  //1.被ref包裹的变量，要用.value赋值
  message.value = 123;
};

// 2.isRef()方法可以判断一个变量是否是ref类型
// console.log(isRef(message)); // true

// 3.shallowRef()方法可以创建一个浅层的ref，即只会响应最外层(.value)的变量变化，不会响应内部变量的变化
let obj = shallowRef({ name: "YaeZed", age: 25 });
const changeObj = () => {
  obj.value.name = "YaeZed2";
  //   console.log(obj.value.name); //输出YaeZed2，但模板里并没有更新
  //   obj.value = { name: "YaeZed2", age: 23 };
  //   console.log(obj.value); // 输出{name: "YaeZed2", age: 23}，模板里更新了
  // 3.1 ref和shalloRef不能同时用，因为ref会更新页面，导致页面重新渲染，从而会影响shallowRef也更新
  //   message.value = "ref修改了";
  // 4.triggerRef()方法可以强制更新模板
  // triggerRef(obj);
};

// 5.customRef()方法可以自定义一个ref，可以实现响应式的功能
//customRef 是个工厂函数要求我们返回一个对象 并且实现 get 和 set  适合去做防抖（在连续的、高频的触发中，只执行最后一次。）之类的
const MyRef = <T>(value: T) => {
  let timer: any;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue: T) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          // 设置定时器，防止频繁触发set
          console.log("触发了set");
          value = newValue;
          trigger();
        }, 1000);
      },
    };
  });
};

const name = MyRef<string>("YaeZed");
</script>

<style scoped></style>
