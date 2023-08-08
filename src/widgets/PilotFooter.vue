<script setup lang="ts">
import PilotMainContainer from '../shared/ui/PilotMainContainer.vue'

</script>

<template>
  <section class="pilot-footer">
    <PilotMainContainer>
      <div class="pilot-footer__copyright">
        Copyright © 2023 pilot-store
      </div>
    </PilotMainContainer>
  </section>
</template>

<style lang="scss" scoped>
.pilot-footer {
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 64px;
  background: #00A76B;
}
</style>
