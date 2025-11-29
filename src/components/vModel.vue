<template>
  <h2>原生表单</h2>
  <input type="text" v-model="inputValue" />
  <p>当前输入：{{ inputValue }}</p>

  <input type="checkbox" v-model="isChecked" />
  <p>选中状态：{{ isChecked }}</p>

  <h2>自定义组件</h2>
  <div class="child-box">
    <input type="text" v-model="model" />
    <button @click="updateText">修改</button>
  </div>

  <h2>多个v-model绑定</h2>
  <div class="modal" v-if="visible">
    <h3>{{ title }}</h3>
    <input type="text" v-model="title" placeholder="修改标题" />
    <button @click="change">切换</button>
  </div>

  <h2>显示定义props和emits</h2>
  <input type="text" v-model="valueProxy" />

  <h2>自定义修饰符</h2>
  <div class="field">
    <label for="">折扣代码:</label>
    <input type="text" v-model="proxyCode" placeholder="请输入代码" />

    <div class="debug">检测到的修饰符：{{ codeModifiers }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// 原生表单
const inputValue = ref("Hello Vue3");
const isChecked = ref(false);

// 默认绑定 (v-model) -> 对应 props: modelValue
const model = defineModel<string>("modelValue", { required: true });
console.log(model.value);

const updateText = () => {
  // 直接修改 model.value，Vue 会自动 emit 'update:modelValue'
  model.value = "子组件修改了值";
};

// 具名多个v-model绑定，(v-model:title) -> 对应 props: title
const visible = defineModel<boolean>("visiable", { required: true });
const title = defineModel<string>("title", { default: "默认标题" });

const change = () => {
  // 直接修改 visible.value，Vue 会自动 emit 'update:visiable'
  visible.value = !visible.value;
};

// 显式定义
interface Props {
  modelValue: string;
}

// 1.props
const props = defineProps<Props>();

// 2.emits
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// 3.使用 computed 包装，方便在 template 中直接使用 v-model
const valueProxy = computed({
  get() {
    return props.modelValue;
  },
  set(newVal: string) {
    emit("update:modelValue", newVal);
  },
});

// 自定义修饰符
// 1.定义具名v-model
const [code, codeModifiers] = defineModel<string, "upper" | "clean">("code", {
  required: false,
});

// 2.使用computed拦截
const proxyCode = computed({
  get() {
    return code.value;
  },
  set(newVal: string) {
    // 暂存待处理的新值
    let value = newVal;

    // 访问 codeModifiers (Vue 会自动将 v-model:code.xxx 映射到这里)
    if (codeModifiers.clean) {
      value = value.replace(/[^a-zA-Z0-9]/g, "");
    }
    if (codeModifiers.upper) {
      value = value.toUpperCase();
    }

    // 更新
    code.value = value;
  },
});
</script>

<style scoped>
.field {
  padding: 15px;
  border: 1px dashed #42b883;
  margin-bottom: 20px;
}
.debug {
  font-size: 0.85em;
  color: #888;
  margin-top: 5px;
}
</style>
