<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/app/stores/user'
import LogoutButton from '@/features/auth/logout/ui/LogoutButton.vue'

const userStore = useUserStore()

const formatDate = (date: string) => {
  if (!date) return 'Нет данных'
  return new Date(date).toLocaleDateString('ru-RU')
}

onMounted(() => {
  if (userStore.token && !userStore.user) {
    userStore.fetchCurrentUser()
  }
})
</script>

<template>
  <div style="max-width: 600px; margin: 50px auto; padding: 20px">
    <h2>Профиль пользователя</h2>

    <div v-if="userStore.isLoading">Загрузка...</div>

    <div v-else-if="userStore.user">
      <div style="margin-bottom: 10px"><strong>ID:</strong> {{ userStore.user.id }}</div>
      <div style="margin-bottom: 10px">
        <strong>Имя пользователя:</strong> {{ userStore.user.username }}
      </div>
      <div style="margin-bottom: 10px"><strong>Email:</strong> {{ userStore.user.email }}</div>
      <div style="margin-bottom: 10px">
        <strong>Роль:</strong>
        {{ userStore.user.role === 'admin' ? 'Администратор' : 'Пользователь' }}
      </div>
      <div style="margin-bottom: 20px">
        <strong>Дата регистрации:</strong> {{ formatDate(userStore.user.createdAt) }}
      </div>

      <div style="margin-top: 30px">
        <LogoutButton />
      </div>
    </div>

    <div v-else>
      <p>Не удалось загрузить данные профиля</p>
      <router-link to="/login">Войти</router-link>
    </div>
  </div>
</template>
