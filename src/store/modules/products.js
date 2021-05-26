/* eslint-disable prettier/prettier */
import axios from 'axios'

// STATE
const state = () => ({
  products: [],
  product: null,
})

// MUTATIONS
const mutations = {
  products(state, products) {
    state.products = products
  },
  product(state, product) {
    state.product = product
  },
}

// ACTIONS
const actions = {
  async fetchProducts({ commit }, queryString = '') {
    const url = `http://localhost:3030/api/products?${queryString}`
    const result = await axios.get(url)
    commit('products', result.data.data)
  },
  async fetchSingleProduct({ commit }, productId) {
    const url = `http://localhost:3030/api/products/${productId}`
    const result = await axios.get(url)
    commit('product', result.data.data)
  },
}

// GETTERS
const getters = {
  products(state) {
    return state.products
  },
  product(state) {
    return state.product
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
