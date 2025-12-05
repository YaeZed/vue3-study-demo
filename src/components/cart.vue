<template>
  <div class="shop-container">
    <div class="product-list">
      <h2>📱 Cart List</h2>
      <ul>
        <li v-for="item in products" :key="item.id" class="item">
          <span>{{ item.name }} - ${{ item.price }}</span>
          <button @click="addToCart(item)">+</button>
        </li>
      </ul>
    </div>
    <hr />
    <div class="cart-list">
      <h2>🛒 My Cart</h2>
      <p v-if="cartItems.length === 0">There are no items in your cart.</p>

      <ul v-else>
        <li v-for="item in cartItems" :key="item.id" class="item">
          <span>{{ item.name }} (price: ${{ item.price }})</span>

          <div class="actions">
            <button @click="handleDlete(item)" :disabled="item.quantity < 0">
              -
            </button>
            <span class="qty"
              >x <SliderNumber :value="item.quantity"></SliderNumber
            ></span>
            <button @click="item.quantity++">+</button>
            <button class="del-btn" @click="removeFromCart(item.id)">
              delete
            </button>
          </div>
        </li>
      </ul>

      <div class="summary" v-if="cartItems.length > 0">
        <h3>total items: {{ totalItems }}</h3>
        <h3>
          total price:
          <span class="price"
            >$ <AnimatedNumber :value="totalPrice"></AnimatedNumber
          ></span>
        </h3>
        <button class="clear-btn" @click="clearCart">clear</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCartStore } from "../stores/cart";
import AnimatedNumber from "./AnimatedNumber.vue";
import SliderNumber from "./SliderNumber.vue";

// 实例化store
const cartStore = useCartStore();

// 解构states和getters
const { products, cartItems, totalItems, totalPrice } = storeToRefs(cartStore);

// 解构actions
const { addToCart, removeFromCart, clearCart } = cartStore;

// 当数量减到0时，删除商品
const handleDlete = (item: any) => {
  item.quantity--;
  if (item.quantity <= 0) {
    removeFromCart(item.id);
  }
};
</script>

<style scoped>
/* 样式与之前保持一致 */
.shop-container {
  font-family: sans-serif;
  max-width: 600px;
  margin: 0 auto;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.actions {
  display: flex;
  align-items: center;
  gap: 5px;
}
.qty {
  font-weight: bold;
  margin: 0 10px;
}
.price {
  color: red;
  font-size: 1.2em;
}
.del-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
}
.clear-btn {
  background-color: gray;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
}
</style>
