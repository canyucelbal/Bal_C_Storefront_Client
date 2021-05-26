/* eslint-disable prettier/prettier */

// STATE
const state = () => ({
  items: [],
})

// MUTATIONS
const mutations = {
  items(state, items) {
    state.items = items
  },
  add(state, props) {
    const { quantity, product } = props
    if (state.items.find((i) => i.product.id === product.id)) {
      state.items = state.items
        .map((i) => {
          if (i.product.id === product.id) {
            return {
              product: i.product,
              quantity,
            }
          }
          return i
        })
        .filter((i) => i.quantity > 0)
    } else {
      state.items = [
        ...state.items,
        {
          quantity,
          product,
        },
      ].filter((i) => i.quantity > 0)
    }
  },
  remove(state, productId) {
    state.items = state.items.filter((i) => i.product.id !== productId)
  },
}

// ACTIONS
const actions = {
  addToCart({ commit, dispatch }, props) {
    const { product, quantity } = props
    commit('add', { quantity, product })
    dispatch('save')
  },
  removeFromCart({ commit, dispatch }, productId) {
    commit('remove', productId)
    dispatch('save')
  },
  save({ state }) {
    localStorage.setItem('items', JSON.stringify(state.items))
  },
  load({ commit }) {
    const items = localStorage.getItem('items')
    if (items) {
      try {
        const parsed = JSON.parse(items)
        commit('items', parsed)
      } catch (e) {
        console.log(e)
      }
    }
  },
}

// GETTERS
const getters = {
  cartItems: (state) => {
    return state.items
  },
  cartPrice: (state) => {
    return (
      state.items
        .map((i) => i?.product?.price * i?.quantity)
        .reduce((a, b) => a + b, 0) || 0
    )
  },
  itemCount: (state) => {
    return state.items.map((i) => i.quantity).reduce((a, b) => a + b, 0)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
