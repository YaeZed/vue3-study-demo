<template>
  <div class="checkout-page">
    <h2>💸 结算中心</h2>
    <p>准备付款...</p>
    <button @click="pay">确认支付</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const pay = () => {
  alert("支付成功！");
  router.push({ name: "cart" }); // 支付完回购物车
};
</script>

<style scoped>
.checkout-page {
  padding: 20px;
  border: 2px dashed green;
  margin-top: 20px;
}
</style>
