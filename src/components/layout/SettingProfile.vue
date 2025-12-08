<template>
  <div class="setting-profile">
    <h2>👤 编辑个人资料</h2>
    <div class="form-box">
      <div class="form-group">
        <label>用户名:</label>
        <input type="text" value="YaeZed" />
      </div>
      <div class="form-group">
        YaeZed
        <label>邮箱:</label>
        <input type="email" value="john@example.com" />
      </div>
      <div class="form-group">
        <label>个人简介:</label>
        <textarea
          rows="3"
          placeholder="在这里输入内容"
          v-model="content"
        ></textarea>
      </div>
      <button class="save-btn" @click="save">保存修改</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";

const router = useRouter();
const content = ref("");
const savedContent = ref("");

const isDirty = computed(() => {
  return content.value !== savedContent.value;
});

const save = () => {
  savedContent.value = content.value;
  alert("保存成功");
};

// 组件守卫，在离开页面前检查是否有未保存的修改
// 只有在这个组件内部逻辑触发时（比如用户点了浏览器的后退，或者切换了菜单）才有效
onBeforeRouteLeave((to, from) => {
  if (isDirty.value) {
    const confirmLeave = window.confirm("你有未保存的修改，是否离开?");
    if (!confirmLeave) {
      return false;
    }
  }
});
</script>

<style scoped>
.setting-profile {
  max-width: 600px;
}
.form-box {
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 0.9rem;
}
input,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.save-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
.save-btn:hover {
  background-color: #3aa876;
}
</style>
