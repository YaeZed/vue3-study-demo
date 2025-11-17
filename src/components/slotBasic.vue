<template>
  <div class="card">
    <h3>默认插槽</h3>
    <!-- 1.默认插槽，子组件中只有一个未命名的slot出口 -->
    <slot></slot>
  </div>

  <!-- 2.具名插槽 -->
  <div class="modal">
    <h3>具名插槽</h3>
    <header class="modal-header">
      <slot name="header"></slot>
    </header>
    <main class="modal-main">
      <slot name="main"></slot>
    </main>
    <footer class="modal-footer">
      <slot name="footer"></slot>
    </footer>
  </div>

  <!-- 3.作用域插槽 -->
  <div class="user-list">
    <h3>作用域插槽</h3>
    <p>用户列表：</p>
    <ul>
      <li v-for="user in users" :key="user.id">
        <!-- 子组件通过在 <slot> 标签上绑定属性，来将数据"暴露"给父组件。 -->
        <slot
          :user="user"
          :isAdmin="user.name === 'YaeZed'"
          name="user-item"
        ></slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// 3.作用域插槽
interface User {
  id: number;
  name: string;
  age: number;
}

const users = ref<User[]>([
  { id: 1, name: "YaeZed", age: 20 },
  { id: 1, name: "YaeSakura", age: 22 },
]);
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  max-width: 300px;
}

.modal {
  background: #fff;
  border: 1px solid #ddd;
}
.modal-header,
.modal-footer {
  padding: 10px;
  background: #f4f4f4;
}
.modal-body {
  padding: 20px;
}
</style>
