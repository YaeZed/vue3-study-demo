<template>
  <div class="dashboard-home">
    <h2>👋 欢迎回来, John</h2>
    <p>这是您的数据概览。</p>

    <div class="cards">
      <div class="card c1">
        <h4>总用户数</h4>
        <span class="num">12,580</span>
      </div>
      <div class="card c2">
        <h4>今日收入</h4>
        <span class="num">$4,320</span>
      </div>
      <div class="card c3">
        <h4>活跃度</h4>
        <span class="num">88%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}
.card {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.c1 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.c2 {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
  color: #555;
}
.c3 {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  color: #444;
}
.num {
  font-size: 1.5rem;
  font-weight: bold;
  display: block;
  margin-top: 10px;
}
</style>
