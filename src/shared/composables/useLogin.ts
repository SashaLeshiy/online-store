import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../app/stores/user'
import { API_ENDPOINTS } from '../../config/api'

export const useLogin = () => {
  const router = useRouter()
  const userStore = useUserStore()

  const email = ref('')
  const password = ref('')
  const isLoading = ref(false)
  const error = ref('')

  const handleSubmit = async () => {
    if (!email.value || !password.value) {
      error.value = 'Заполните все поля'
      return
    }

    isLoading.value = true
    error.value = ''

    try {
      const response = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка входа')
      }

      userStore.setUser(data.user)
      userStore.setToken(data.token)

      router.push('/profile')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка входа'
    } finally {
      isLoading.value = false
    }
  }

  return {
    email,
    password,
    isLoading,
    error,
    handleSubmit
  }
}
