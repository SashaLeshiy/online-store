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