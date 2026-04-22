import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../app/stores/user'
import { API_ENDPOINTS } from '../../config/api'

export const useRegister = () => {
  const router = useRouter()
  const userStore = useUserStore()

  const username = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const isLoading = ref(false)
  const error = ref('')

  const handleSubmit = async () => {
    if (!username.value || !email.value || !password.value) {
      error.value = 'Заполните все поля'
      return
    }

    if (password.value !== confirmPassword.value) {
      error.value = 'Пароли не совпадают'
      return
    }

    if (password.value.length < 6) {
      error.value = 'Пароль должен быть не менее 6 символов'
      return
    }

    isLoading.value = true
    error.value = ''

    try {
      const response = await fetch(API_ENDPOINTS.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка регистрации')
      }

      userStore.setUser(data.user)
      userStore.setToken(data.token)

      router.push('/profile')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка регистрации'
    } finally {
      isLoading.value = false
    }
  }

  return {
    username,
    email,
    password,
    confirmPassword,
    isLoading,
    error,
    handleSubmit
  }
}
