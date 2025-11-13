<template>
  <div>
    <p>count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>

  <div>
    <p>name: {{ state.user.name }}</p>
    <button @click="state.user.name = 'YaeSakura'">Change Name</button>
  </div>

  <div>
    <input type="text" v-model="state2.success.message" />
    <br />
    <button @click="state2.success.message = 'good'">Change Message</button>
  </div>

  <div>
    <h1>切换主题</h1>
    <p>当前主题: {{ options.settings.theme }}</p>
    <button @click="options.settings.theme = 'dark'">点击切换</button>
  </div>

  <div>
    <p>User Num: {{ userNum }}</p>
    <button @click="changgUserNum">切换用户</button>
  </div>

  <div>
    <h3>onInvalidate 演示 (处理竞态条件)</h3>
    <p>请在控制台中查看日志，并快速输入:</p>
    <input v-model="inputVal" />
  </div>
</template>

<script setup lang="ts">
/**
 * watch (侦听器) 是 Vue 组合式 API (Composition API) 中的一个核心功能。它允许你响应式地执行副作用 (side effects)。
 * 它可以监听数据的变化，并在数据变化时执行回调函数。
 */
import { clear } from "console";
import { ref, watch, reactive, watchEffect } from "vue";
/**
 * 1.监听一个ref变量
 */
let count = ref(0);
watch(count, (newVal, oldVal) => {
  console.log(`count 变量值发生了变化: ${oldVal} -> ${newVal}`);
});

/**
 * 2.监听一个getter函数
 * 当你不想直接侦听整个对象，而只想侦听对象上的某个特定属性时，这是最推荐的方式。你需要传入一个返回该属性的 "getter" 函数。
 */
const state = reactive({
  id: 1,
  user: {
    name: "yaezed",
    age: 23,
  },
});
// 监听 user.name 属性的变化
watch(
  () => state.user.name,
  (newVal: string, oldVal: string) => {
    console.log(`user.name 值发生了变化: ${oldVal} -> ${newVal}`);
  }
);

/**
 * 3.监听多个源
 * watch 可以通过一个数组同时侦听多个源（可以是 ref 和 getter 的混合体）。
 */
const query = ref("");
const category = ref("all");
watch([query, category], ([newQuery, newCategory], [oldQuery, oldCategory]) => {
  console.log(
    `query 值发生了变化: ${oldQuery} -> ${newQuery}, category 值发生了变化: ${oldCategory} -> ${newCategory}`
  );
});

/**
 * 4.侦听 Reactive 对象
 * 默认是开启deep
 */
const state2 = reactive({
  success: {
    code: 200,
    message: "success",
  },
});
watch(
  () => state2.success.message,
  (newVal, oldVal) => {
    console.log(`state2.success.code 值发生了变化: ${oldVal} -> ${newVal}`);
  }
);

/**
 * 5.watch的选项
 * watch 函数还可以接受一些选项参数，比如 deep、immediate、prepatch、postpatch。
 */

// 5.1 immediate
// 假设userId从store中获得
const userId = ref(1);
// 场景：我们希望页面加载时就根据 userId 获取一次数据，
// 之后 userId 变化时再获取
watch(
  userId,
  (newId) => {
    console.log(`正在获取 ID: ${newId} 的数据...`);
    // fetchUserData(newId);
  },
  { immediate: true }
); //页面加载后立即执行一次watch

// 5.2 deep
// 当你侦听一个 ref，但它内部是一个嵌套对象时，watch 默认不会侦听该对象的深层属性变化。你需要 deep: true 来强制它这样做。
const options = ref({
  settings: {
    theme: "light",
  },
});

watch(
  options,
  (newOptions, oldOptions) => {
    console.log("（会触发）主题变化为:", newOptions.settings.theme);
  },
  { deep: true }
);

/**
 * 6.watchEffect
 * watchEffect 是 Vue 3 组合式 API 提供的另一个侦听器。它和 watch 目标一致（在数据变化时执行副作用），但使用方式更简洁，因为它会自动追踪依赖。
 */
// 6.1 核心理念
// 非惰性，立即执行一次，并自动追踪函数内部用到的所有响应式数据，在它们变化时重新执行。
const userNum = ref(1);
// watchEffect 会在 <script setup> 执行到这里时立即运行一次
watchEffect(() => {
  // 当 watchEffect 运行时，它会追踪所有被“读取”的 .value
  console.log(`(watchEffect) 正在获取 ID: ${userNum.value} 的数据...`);
  // 假设的 API 调用
  // fetchUserData(userNum.value);
});

// 自动追踪变化
const changgUserNum = () => {
  userNum.value++;
};

// 6.2 可以使用watchEffect清除副作用（onInvalidate）
/**
 * watchEffect 的回调函数可以接收一个 onInvalidate 函数作为参数。这个函数用于注册一个“失效”时的回调。
 * 这在处理异步操作竞态时非常有用（例如，短时间内多次触发 API 请求）。
 * 当 watchEffect 即将重新运行时（或在侦听器被停止时），onInvalidate 注册的回调会先执行。
 * 1.取消异步请求：(最常用) fetch, axios 等
 * 2.解绑事件监听器：如果在 watchEffect 内部用 window.addEventListener 动态添加了一个事件，你可以在 onInvalidate 中用 window.removeEventListener 将其移除，防止内存泄漏。
 */

const inputVal = ref("vue");

watchEffect((onInvalidate) => {
  // 1. 每个 effect 运行时，都创建一个新的 AbortController
  const controller = new AbortController();
  const { signal } = controller;
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    inputVal.value
  )}`;
  console.log(`(Fetch) 正在搜索: ${inputVal.value}`);

  // 2. 发起异步请求，并将 signal 传给 fetch
  fetch(url, { signal })
    .then((response) => {
      // 在这里处理响应...
      console.log(`(Success) 成功获取: ${inputVal.value}`);
    })
    .catch((err) => {
      // 3. 如果请求被中止 (abort)，catch 会捕获到错误
      if (err.name === "AbortError") {
        console.log(`(Abort) 已取消上一次请求: ${inputVal.value}`);
      } else {
        // 处理其他错误
      }
    });

  // 4. 注册“失效”回调
  // 当 query 再次变化，watchEffect 即将重新运行时，
  // *上一次* 注册的 onInvalidate 回调会被执行。
  onInvalidate(() => {
    console.log("...查询变化太快，Effect 即将失效...");
    // 5. 中止上一次的 fetch 请求！
    controller.abort();
  });
});
</script>

<style scoped></style>
