<template>
  <div class="card">
    <div class="user-info">
      <img src="" alt="" />
      <div class="user-name"></div>
    </div>
    <hr />
    <div class="content">
      <p></p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.card {
  width: 300px;
  height: 300px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.user-info {
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
}

img {
  background-color: bisque;
  width: 150px;
  height: 150px;
  border-radius: 100px;
}

.user-name {
  width: 70px;
  height: 20px;
  background-color: bisque;
  margin-left: 30px;
  font-size: 24px;
  font-weight: bold;
}

.content {
  background-color: beige;
  height: 120px;
  width: 300px;
}
</style>
