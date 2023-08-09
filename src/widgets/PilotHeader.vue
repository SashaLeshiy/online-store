<script setup lang="ts">
import { ref } from 'vue'
import PilotNavigation from '@/shared/ui/PilotNavigation.vue'
import PilotModal from '@/shared/ui/PilotModal.vue'
import PilotMainContainer from '../shared/ui/PilotMainContainer.vue'

const isModalOpen = ref<Boolean>(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}
</script>
<template>
  <section v-if="!isModalOpen" class="pilot-header">
    <PilotMainContainer class="pilot-header__container">
      <router-link to="/">
        <img src="@/shared/assets/images/polet_logo.jpg" alt="логотип" class="pilot-header__logo" />
      </router-link>
      <div class="pilot-header__right">
        <PilotNavigation @toggle-modal="toggleModal"></PilotNavigation>
      </div>
    </PilotMainContainer>
  </section>
  <Teleport to="body">
    <PilotModal v-if="isModalOpen" @toggle-modal="toggleModal"></PilotModal>
  </Teleport>
</template>

<style lang="scss" scoped>
.pilot-header {
  position: sticky;
  top: 0;
  left: 0;
  padding: 12px;
  width: 100%;
  height: 85px;
  box-sizing: border-box;
  z-index: 999;
  background: #ffffff;
  box-shadow: 0px 4px 21px rgba(0, 0, 0, 0.07);

  @media screen and (min-width: 768px) {
    padding: 24px;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__right {
    display: flex;
    flex-direction: row-reverse;

    @media screen and (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  &__link {
    color: #00a76b;
    text-decoration: none;
  }

  &__logo {
    width: 50px;
    height: 50px;
  }
}
</style>