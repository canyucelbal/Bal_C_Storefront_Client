<template>
  <div style="margin-bottom: 5rem">
    <p class="page-title">Products</p>

    <p class="page-subtitle">You can filter by category</p>
    <!--CATEGORY-FILTER-->
    <div class="categories">
      <!---electric-->
      <div>
        <input
          v-model="category"
          type="radio"
          id="all"
          name="category"
          :value="null"
        />
        <label for="all">All</label>
      </div>

      <!---bmx-->
      <div>
        <input
          v-model="category"
          type="radio"
          id="bmx"
          name="category"
          value="bmx"
        />
        <label for="bmx">BMX</label><br />
      </div>

      <!---mountain-->
      <div>
        <input
          v-model="category"
          type="radio"
          id="mountain"
          name="category"
          value="mountain"
        />
        <label for="mountain">Mountain</label><br />
      </div>

      <!---electric-->
      <div>
        <input
          v-model="category"
          type="radio"
          id="electric"
          name="category"
          value="electric"
        />
        <label for="electric">Electric</label>
      </div>
    </div>

    <!--PRODUCTS-->
    <div class="gridpane">
      <div v-for="product of products" :key="product.id" class="product-card">
        <img
          class="responsive-img"
          :src="`http://localhost:3030/api/images/${product.image}`"
          alt="image"
        />
        <p class="title">
          {{ product.name }}
        </p>
        <p class="desc">
          {{ product.description }}
        </p>

        <div class="buttons">
          <!--Price-->
          <p class="price-tag">{{ product.price }}$</p>

          <!--View-->
          <button
            @click="$router.push(`/products/${product.id}`)"
            class="btn-see"
          >
            <i class="fas fa-eye"></i>
            View
          </button>
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
                  cartItems.find((i) => i.product.id === product.id).quantity -
                    1
                )
              "
              class="btn-decrease"
            >
              <i class="fas fa-minus" />
            </button>
            <p class="quantity-tag">
              {{ cartItems.find((i) => i.product.id === product.id).quantity }}
            </p>
            <button
              @click.prevent="
                add(
                  product,
                  cartItems.find((i) => i.product.id === product.id).quantity +
                    1
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      category: null,
    };
  },
  created() {
    this.fetchProducts();
  },
  computed: {
    ...mapGetters({
      products: "products/products",
      cartItems: "cart/cartItems",
    }),
    queryString() {
      if (this.category) {
        return `category=${this.category}`;
      }
      return "";
    },
  },
  methods: {
    ...mapActions({
      fetchProducts: "products/fetchProducts",
      addToCart: "cart/addToCart",
    }),
    add(product, quantity) {
      this.addToCart({
        product,
        quantity,
      });
    },
  },
  watch: {
    category() {
      this.fetchProducts(this.queryString);
    },
  },
};
</script>

<style></style>
