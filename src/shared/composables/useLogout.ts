import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../app/stores/user'
import { fetchWithAuth } from '../../shared/utils/fetchWithAuth'
import { API_ENDPOINTS } from '../../config/api'

export const useLogout = () => {
  const router = useRouter()
  const userStore = useUserStore()
  const isLoading = ref(false)

  const handleLogout = async () => {
    isLoading.value = true

    try {
      await fetchWithAuth(API_ENDPOINTS.logout, {
        method: 'POST'
      })
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      userStore.clearAuth()
      isLoading.value = false
      router.push('/login')
    }
  }

  return {
    isLoading,
    handleLogout
  }
}
