import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type Product } from '@/entities/Product'
import { useCardsApi } from '@/shared/composables/useCardsApi'

export const useCardsStore = defineStore('cardsStore', () => {
    const cards = ref<Product[]>([])
    const { apiLoader: loader, apiError: error, fetchCards } = useCardsApi()
    
    const getCards = async () => {
        const data = await fetchCards()
        if (data) {
            cards.value = data
        }
    }

    return {
        loader,
        cards,
        error,
        getCards
    }
})