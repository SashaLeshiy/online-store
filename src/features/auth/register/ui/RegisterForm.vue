<script setup lang="ts">
import { useRegister } from '@/shared/composables/useRegister'

const { username, email, password, confirmPassword, isLoading, error, handleSubmit } = useRegister()
</script>

<template>
  <div>
    <h2>Регистрация</h2>

    <div v-if="error" style="color: red; margin-bottom: 10px">
      {{ error }}
    </div>

    <form @submit.prevent="handleSubmit">
      <div style="margin-bottom: 10px">
        <label style="display: block; margin-bottom: 5px">Имя пользователя:</label>
        <input v-model="username" type="text" required style="width: 100%; padding: 8px" />
      </div>

      <div style="margin-bottom: 10px">
        <label style="display: block; margin-bottom: 5px">Email:</label>
        <input v-model="email" type="email" required style="width: 100%; padding: 8px" />
      </div>

      <div style="margin-bottom: 10px">
        <label style="display: block; margin-bottom: 5px">Пароль:</label>
        <input v-model="password" type="password" required style="width: 100%; padding: 8px" />
      </div>

      <div style="margin-bottom: 10px">
        <label style="display: block; margin-bottom: 5px">Подтверждение пароля:</label>
        <input
          v-model="confirmPassword"
          type="password"
          required
          style="width: 100%; padding: 8px"
        />
      </div>

      <button type="submit" :disabled="isLoading" style="padding: 10px 20px; cursor: pointer">
        {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
      </button>
    </form>

    <p style="margin-top: 15px">
      Уже есть аккаунт?
      <router-link to="/login">Войти</router-link>
    </p>
  </div>
</template>
