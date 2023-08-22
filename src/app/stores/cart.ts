import { defineStore } from 'pinia'

type Cart = number

export const useCartStore = defineStore('cartStore', {
    state: () => ({
        cart: JSON.parse(localStorage.getItem('cart')!).length as Cart 
    }),
    getters: {},
    actions: {
        setCart() {
            this.cart = JSON.parse(localStorage.getItem('cart')!).length
        }
    }
})


