import { defineStore } from 'pinia'
import { type Product } from '@/entities/Product'
import { ref } from 'vue'

export const useCardsStore = defineStore('cardsStore', () => {
    const loader = ref<boolean>(false)
    const cards = ref<Product[]>([])
    
    const getCards = async () => {
        loader.value = true
        const res = await fetch('https://fakestoreapi.com/products')
        cards.value = await res.json()
        loader.value = false
    }

    return {
        loader,
        cards,
        getCards
    }
})
// import { defineStore } from 'pinia'
// import { type Product } from '@/entities/Product'
// import { ref } from 'vue'

// export const useCardsStore = defineStore('cardsStore', () => {
//     const loader = ref<boolean>(false)
//     const cards = ref<Product[]>([])
//     const error = ref<string | null>(null)
    
//     const getCards = async () => {
//         loader.value = true
//         error.value = null
        
//         try {
//             const res = await fetch('http://localhost:5000/api/products')
            
//             if (!res.ok) {
//                 throw new Error(`HTTP error! status: ${res.status}`)
//             }
            
//             cards.value = await res.json()
//         } catch (err) {
//             error.value = err instanceof Error ? err.message : 'Ошибка загрузки товаров'
//             console.error('Ошибка при загрузке товаров:', err)
//         } finally {
//             loader.value = false
//         }
//     }

//     return {
//         loader,
//         cards,
//         error,
//         getCards
//     }
// })