<script setup lang="ts">
import { RouterView } from 'vue-router'
import PilotHeader from '@/widgets/PilotHeader.vue'
import PilotFooter from '@/widgets/PilotFooter.vue'
</script>

<template>
  <div class="pilot-main" id="main">
    <pilot-header></pilot-header>
      <RouterView />
    <pilot-footer></pilot-footer>
  </div>
</template>

<style lang="scss" scoped>
</style>
