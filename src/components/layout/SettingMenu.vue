<template>
  <div class="setting-menu">
    <h3>⚙️ 设置选项</h3>
    <ul>
      <li class="active">个人资料 (Profile)</li>
      <li>账号安全 (Security)</li>
      <li>通知偏好 (Notifications)</li>
      <li>API 密钥 (Keys)</li>
    </ul>
  </div>
</template>

<style scoped>
/* 为了演示区别，我们将设置菜单的背景稍微改深一点 */
.setting-menu {
  padding: 20px;
  background-color: #eaeff2;
  height: 100%;
}
h3 {
  margin-top: 0;
  color: #444;
  font-size: 1rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 4px;
}
li:hover {
  background-color: #dbe4ea;
}
li.active {
  background-color: #42b983;
  color: white;
}
</style>
