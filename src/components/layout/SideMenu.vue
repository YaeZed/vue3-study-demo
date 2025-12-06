<template>
  <div class="side-menu">
    <h3>📊 数据中心</h3>
    <ul>
      <li class="active">概览 (Overview)</li>
      <li>实时监控 (Live)</li>
      <li>销售报表 (Sales)</li>
      <li>访客分析 (Analytics)</li>
    </ul>
  </div>
</template>

<style scoped>
.side-menu {
  padding: 20px;
  background-color: #f8f9fa;
  height: 100%;
}
h3 {
  margin-top: 0;
  color: #666;
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
  color: #333;
}
li:hover {
  background-color: #e9ecef;
}
li.active {
  background-color: #e3f2fd;
  color: #1976d2;
  font-weight: bold;
}
</style>
