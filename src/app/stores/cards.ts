import { defineStore } from 'pinia'
import { type Product } from '@/entities/Product'

export const useCardsStore = defineStore('cardsStore', {
    state: () => ({
        loader: <boolean>false,
        cards: <Product[]>[]
    }),
    actions: {
        async getCards() {
            this.loader = true
            const res = await fetch('https://fakestoreapi.com/products')
            this.cards = await res.json()
            this.loader = false
        }
    }
})