<template>
  <!-- 样式穿透 -->
  <div class="login-container">
    <el-card class="custom-card">
      <template #header>
        <span>Login</span>
      </template>
      <el-input
        v-model="input"
        placeholder="please input something..."
        class="custom-input"
      ></el-input>
    </el-card>
  </div>

  <!-- v-bind() -->
  <div class="dynamic-box">
    <button @click="changeTheme">切换颜色</button>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore,
      voluptas.
    </p>
  </div>

  <!-- 插槽 -->
  <div>
    插槽
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const input = ref("");

const themeColors = ref(["#409eff", "#67c23a", "#f56c6c"]);
const themeColor = ref("409eff");
const fontSize = ref("16px");

const changeTheme = () => {
  // 随机切换颜色
  themeColor.value =
    themeColors.value[Math.floor(Math.random() * themeColors.value.length)];
};
</script>

<style scoped>
.custom-card :deep(.el-card__header) {
  background-color: #f5f7fa;
  border-bottom: 2px solid #409eff;
  font-weight: bold;
}

.custom-input {
  /* 局部重写css变量 */
  --el-input-focus-border-color: #13ce66;
  --el-input-text-color: #333;
  --el-input-border-color: #9b2626;
}

.dynamic-box p {
  color: v-bind(themeColor);
  font-size: v-bind(fontSize);
  transition: all 0.3s;
}

:slotted(.slot-class) {
  color: v-bind(themeColor);
}

/* 这条样式会编译成全局样式，没有 hash 后缀 */
:global(body) {
  margin: 0;
  overflow: hidden;
}
</style>
