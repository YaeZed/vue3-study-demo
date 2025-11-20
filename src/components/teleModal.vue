<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="modal-overlay" @click="close">
        <div class="modal-content" @click.stop>
          <header>
            <h3>{{ title }}</h3>
          </header>

          <main>
            <slot></slot>
          </main>

          <footer>
            <button @click="close">关闭</button>
            <button @click="confirm" class="primary">确认</button>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
// 定义 Props 类型
interface Props {
  isOpen: boolean;
  title?: string;
}

// 定义 Emits 类型
interface Emits {
  // update:属性名 这种命名格式，就是 Vue 3 专门为了配合 v-model（双向绑定） 而设计的一套强制约定。
  (e: "update:isOpen", value: boolean): void;
  (e: "confirm"): void;
}

// 使用宏定义 Props 和 Emits (TS 语法)
const props = withDefaults(defineProps<Props>(), {
  title: "提示",
});

const emit = defineEmits<Emits>();

// 定义方法触发emit，关闭模态框逻辑
const close = () => {
  emit("update:isOpen", false);
};

const confirm = () => {
  emit("confirm");
  close();
};
</script>

<style scoped>
/* 简单的遮罩层样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 确保在最上层 */
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.primary {
  background-color: #42b983;
  color: white;
  margin-left: 10px;
}

/* Transition 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
