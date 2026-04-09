import { ref } from 'vue'
import { API_ENDPOINTS } from '@/config/api'

export const useCardsApi = () => {
    const apiLoader = ref<boolean>(false)
    const apiError = ref<string | null>(null)

    const fetchCards = async () => {
        apiLoader.value = true
        apiError.value = null
        
        try {
            const res = await fetch(API_ENDPOINTS.products)
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            
            return await res.json()
        } catch (err) {
            apiError.value = err instanceof Error ? err.message : 'Ошибка загрузки товаров'
            console.error('Ошибка при загрузке товаров:', err)
            return null
        } finally {
            apiLoader.value = false
        }
    }

    return {
        apiLoader,
        apiError,
        fetchCards
    }
}