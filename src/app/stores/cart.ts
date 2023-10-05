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
    const cart = ref<number>()

    if(localStorage.getItem('cart')) {
        cart.value = JSON.parse(localStorage.getItem('cart')!).length
    }
    

    const setCart = () => {
        if(localStorage.getItem('cart')) {
            cart.value = JSON.parse(localStorage.getItem('cart')!).length
        } else {
            cart.value = 0
        }
        
    }

    return {
        cart,
        setCart
    }
})


