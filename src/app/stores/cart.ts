import { defineStore } from 'pinia'
import { ref } from 'vue'

// type Cart = number

// export const useCartStore = defineStore('cartStore', {
//     state: () => ({
//         cart: JSON.parse(localStorage.getItem('cart')!).length as Cart 
//     }),
//     getters: {},
//     actions: {
//         setCart() {
//             this.cart = JSON.parse(localStorage.getItem('cart')!).length
//         }
//     }
// })

export const useCartStore = defineStore('cartStore', () => {
    const cart = ref<number>(JSON.parse(localStorage.getItem('cart')!).length)

    const setCart = () => {
        cart.value = JSON.parse(localStorage.getItem('cart')!).length
    }

    return {
        cart,
        setCart
    }
})


