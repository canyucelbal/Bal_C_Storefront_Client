<template>
  <div>
    <!--HEADER-->
    <div class="horizontal-div">
      <!--IMAGE-->
      <div class="img-container">
        <img
          class="product-img"
          :src="`http://localhost:3030/api/images/${product.image}`"
          alt="image"
        />
      </div>
      <!--TITLE-DESCRIPTION-->
      <div class="vertical-div">
        <p class="product-name">{{ product.name }}</p>
        <p class="product-desc">{{ product.description }}</p>
        <!--CONTROLS-->
        <div class="horizontal-div">
          <p class="price-tag">{{ product.price }}$</p>

          <div class="buttons">
            <!--Initial button-->
            <button
              v-if="!cartItems.find((i) => i.product.id === product.id)"
              @click.prevent="add(product, 1)"
              class="btn-add"
            >
              <i class="fas fa-shopping-cart"></i>
              Add to Cart
            </button>

            <!--Update quantity-->
            <div v-else class="horizontal-group">
              <button
                @click.prevent="
                  add(
                    product,
                    cartItems.find((i) => i.product.id === product.id)
                      .quantity - 1
                  )
                "
                class="btn-decrease"
              >
                <i class="fas fa-minus" />
              </button>
              <p class="quantity-tag">
                {{
                  cartItems.find((i) => i.product.id === product.id).quantity
                }}
              </p>
              <button
                @click.prevent="
                  add(
                    product,
                    cartItems.find((i) => i.product.id === product.id)
                      .quantity + 1
                  )
                "
                class="btn-increase"
              >
                <i class="fas fa-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--VIDEO-->
    <div class="video-container">
      <video
        :src="`http://localhost:3030/api/videos/${product.video}`"
        controls
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  created() {
    this.fetchProduct(this.productId);
  },
  computed: {
    ...mapGetters({
      product: "products/product",
      cartItems: "cart/cartItems",
    }),
    productId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions({
      fetchProduct: "products/fetchSingleProduct",
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
