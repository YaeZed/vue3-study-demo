<template>
  <nav class="top-nav">
    <div class="logo">🚀 Vue Admin</div>
    <div class="menu">
      <router-link to="/dashboard" active-class="active">仪表盘</router-link>
      <router-link to="/settings" active-class="active">系统设置</router-link>
    </div>
    <div class="user-info">管理员: John</div>
  </nav>
</template>

<style scoped>
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  color: white;
  padding: 0 20px;
  height: 100%; /* 填满父容器高度 */
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
}

.menu a {
  color: #aaa;
  text-decoration: none;
  margin: 0 15px;
  padding: 8px 0;
  font-size: 1rem;
  transition: color 0.3s;
}

.menu a:hover,
.menu a.active {
  color: #42b983; /* Vue 绿 */
  border-bottom: 2px solid #42b983;
}

.user-info {
  font-size: 0.9rem;
}
</style>
