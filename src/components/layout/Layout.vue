<template>
  <div class="app-layout">
    <header class="header-area">
      <router-view name="NavBar"></router-view>
    </header>

    <div class="body-area">
      <aside class="sidebar-area">
        <router-view name="SideBar"></router-view>
      </aside>

      <main class="main-area">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style>
/* 全局重置，实际项目中通常在 base.css */
body {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
}
</style>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.header-area {
  height: 60px;
  flex-shrink: 0;
}
.body-area {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.sidebar-area {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid #eee;
}
.main-area {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background-color: #fff;
}

/* 简单的过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
