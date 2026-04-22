<script setup lang="ts">
import { useLogin } from '../../../../shared/composables/useLogin'

const { email, password, isLoading, error, handleSubmit } = useLogin()
</script>

<template>
  <div>
    <h2>Вход</h2>

    <div v-if="error" style="color: red; margin-bottom: 10px">
      {{ error }}
    </div>

    <form @submit.prevent="handleSubmit">
      <div style="margin-bottom: 10px">
        <label style="display: block; margin-bottom: 5px">Email:</label>
        <input v-model="email" type="email" required style="width: 100%; padding: 8px" />
      </div>

      <div style="margin-bottom: 10px">
        <label style="display: block; margin-bottom: 5px">Пароль:</label>
        <input v-model="password" type="password" required style="width: 100%; padding: 8px" />
      </div>

      <button type="submit" :disabled="isLoading" style="padding: 10px 20px; cursor: pointer">
        {{ isLoading ? 'Вход...' : 'Войти' }}
      </button>
    </form>

    <p style="margin-top: 15px">
      Нет аккаунта?
      <router-link to="/register">Зарегистрироваться</router-link>
    </p>
  </div>
</template>
