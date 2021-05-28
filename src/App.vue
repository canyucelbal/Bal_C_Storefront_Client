<template>
  <div id="app">
    <div class="navbar">
      <p @click="$router.push('/')" class="brand-logo is-clickable">
        <i class="fas fa-bicycle" /> Bikestore
      </p>

      <span class="right">
        <div @click="$router.push('/cart')" class="cart">
          <span class="price"> {{ cartPrice }}$ </span>
          <span class="icon"><i class="fas fa-shopping-cart" /></span>
        </div>
      </span>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  created() {
    this.loadCart();
  },
  computed: {
    ...mapGetters({
      cartPrice: "cart/cartPrice",
    }),
  },
  methods: {
    ...mapActions({
      loadCart: "cart/load",
    }),
  },
};
</script>

<style lang="sass">
@import "./assets/main.scss"
</style>
