import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../../entities/User'
import { fetchWithAuth } from '../../shared/utils/fetchWithAuth'
import { API_ENDPOINTS } from '../../config/api'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const setUser = (newUser: User | null) => {
    user.value = newUser
  }

  const setToken = (newToken: string | null) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  const setError = (newError: string | null) => {
    error.value = newError
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const clearAuth = () => {
    user.value = null
    setToken(null)
    error.value = null
  }

  const fetchCurrentUser = async () => {
    if (!token.value) return

    setLoading(true)
    try {
      const response = await fetchWithAuth(API_ENDPOINTS.me)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const userData = await response.json()
      user.value = userData
    } catch (err) {
      console.error('Failed to fetch user:', err)
      clearAuth()
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    token,
    isLoading,
    error,
    setUser,
    setToken,
    setError,
    setLoading,
    clearAuth,
    fetchCurrentUser
  }
})
