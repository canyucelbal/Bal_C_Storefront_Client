<template>
  <div class="container">
    <!--HEADER-->
    <p class="page-title">Cart</p>
    <p class="page-subtitle">You added following products to your cart</p>
    <!--LIST-->
    <div>
      <div v-for="item of cartItems" :key="item.product.id" class="row">
        <img
          class="image"
          :src="`${baseURL}/images/${item.product.image}`"
          alt="image"
        />
        <div style="padding: 0.5rem">
          <p class="item-name">{{ item.product.name }}</p>
          <p class="item-category">Category: {{ item.product.category }}</p>
        </div>
        <div class="right buttons">
          <button @click.prevent="add(item.product, 0)" class="btn-delete">
            <i class="fas fa-trash" />
            Delete
          </button>
          <div class="horizontal-group">
            <button
              @click.prevent="
                add(
                  item.product,
                  cartItems.find((i) => i.product.id === item.product.id)
                    .quantity - 1
                )
              "
              class="btn-decrease"
            >
              <i class="fas fa-minus" />
            </button>
            <p class="quantity-tag">
              {{
                cartItems.find((i) => i.product.id === item.product.id).quantity
              }}
            </p>
            <button
              @click.prevent="
                add(
                  item.product,
                  cartItems.find((i) => i.product.id === item.product.id)
                    .quantity + 1
                )
              "
              class="btn-increase"
            >
              <i class="fas fa-plus" />
            </button>
          </div>

          <!--SUBTOTAL-->
          <p class="subtotal">{{ item.quantity * item.product.price }}$</p>
        </div>
      </div>
    </div>

    <!--INFO-->
    <div class="info-pane">
      <p class="item-count">{{ itemCount }} Items</p>
      <div class="cart-price">
        <p>Total Before Tax: {{ cartPrice }}$</p>
        <p>Tax: {{ cartPrice }}$</p>
        <p>Total: {{ cartPrice - (cartPrice * 13) / 100 }}$</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      cartPrice: "cart/cartPrice",
      cartItems: "cart/cartItems",
      itemCount: "cart/itemCount",
    }),
    baseURL() {
      return process.env.VUE_APP_API_URL;
    },
  },
  methods: {
    ...mapActions({
      addToCart: "cart/addToCart",
    }),
    add(product, quantity) {
      this.addToCart({
        product,
        quantity,
      });
    },
  },
};
</script>

<style></style>
