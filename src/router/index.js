/* eslint-disable prettier/prettier */

import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/products/:id',
    name: 'Product',
    component: Product,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
