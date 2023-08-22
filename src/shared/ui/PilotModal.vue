<script setup lang="ts">
import { ref } from 'vue'
import MENU from '@/shared/constants/menu'
import { type Menu } from '@/widgets/Menu'

const emit = defineEmits<{
  (e: 'toggle-modal'): void
}>()

const menu = ref<Menu[]>(MENU)

const lengthCart: number = JSON.parse(localStorage.getItem('cart')!).length 

const toggleModal = () => {
  emit('toggle-modal')
}
</script>

<template>
  <div class="pilot-modal">
    <div class="pilot-modal__header">
      <button type="button" class="pilot-modal__close" @click="toggleModal">
        <p class="pilot-modal__close-icon">&#215;</p>
      </button>
    </div>
    <div class="pilot-modal__menu">
      <div v-for="item in menu" :key="item.id" class="pilot-modal__link">
        <router-link
          :to="item.route"
          class="pilot-modal__link-text"
          active-class="pilot-modal__link-text--active"
          v-slot="{ isActive }"
        >
          <button
            type="button"
            class="pilot-modal__button"
            :class="[isActive && 'pilot-modal__button-active']"
            @click="toggleModal"
          >
            {{ item.name }}<sup v-if="item.name === 'Корзина' && lengthCart">{{ lengthCart }}</sup>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pilot-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  color: #0e0e0f;
  background-color: #ffffff;
  transition: all 0.5s ease-in-out;

  &__header {
    text-align: center;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    width: 40px;
    height: 40px;
    font-size: 40px;
    color: #0e0e0f;
    background: none;
    border: 1px solid #00a76b;
    border-radius: 50%;
  }

  &__close-icon {
    margin: 0;
  }

  &__menu {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }

  &__button {
    margin-bottom: 20px;
    background: none;
    font-size: 24px;
    line-height: 28px;
    text-transform: uppercase;
    border: none;

    &-active {
      color: #00a76b;
    }
  }

  &__link-text--active {
    color: #00a76b;
  }
}
</style>
