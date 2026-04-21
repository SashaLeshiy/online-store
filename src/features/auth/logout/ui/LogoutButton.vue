<script setup lang="ts">
import { useLogout } from '@/shared/composables/useLogout'

const { isLoading, handleLogout } = useLogout()
</script>

<template>
  <button @click="handleLogout" :disabled="isLoading" style="padding: 5px 10px; cursor: pointer">
    {{ isLoading ? 'Выход...' : 'Выйти' }}
  </button>
</template>
