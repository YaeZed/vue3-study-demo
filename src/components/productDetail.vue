<template>
  <div class="detail-page">
    <button @click="goBack">⬅️ 返回列表</button>

    <h2>📄 商品详情页</h2>

    <div class="info-box">
      <p><strong>当前商品 ID (来自 Params):</strong> {{ productId }}</p>
      <p><strong>来源渠道 (来自 Query):</strong> {{ source }}</p>
      <p><strong>商品名称 (来自 Query):</strong> {{ productName }}</p>
    </div>

    <div v-if="productId === '1'" class="desc">🍎 这是最新款的智能手机。</div>
    <div v-else-if="productId === '3'" class="desc">
      💻 这是性能强大的笔记本电脑。
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// 1. 获取当前路由信息对象 (包含参数)
const route = useRoute();
const router = useRouter();

// 2. 获取 Params 参数 (类型通常是 string 或 string[])
// 对应路由路径 /product/:id
const productId = computed(() => route.params.id as string);

// 3. 获取 Query 参数
// 对应 URL 中的 ?source=...
const source = computed(() => route.query.source as string);
const productName = computed(() => route.query.productName as string);

// 模拟：实际开发中，通常在这里根据 ID 请求后端 API
onMounted(() => {
  console.log(`向后端请求 ID 为 ${productId.value} 的数据...`);
});

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.info-box {
  background: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}
.desc {
  margin-top: 20px;
  color: #2c3e50;
  font-weight: bold;
}
</style>
