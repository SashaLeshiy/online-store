<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/app/stores/cart'
import MENU from '@/shared/constants/menu'

const emit = defineEmits<{
  (e: 'toggle-modal'): void
}>()

const menu = ref(MENU)

const storeCart = useCartStore()

const toggleModal = () => {
  emit('toggle-modal')
}
</script>

<template>
  <div class="pilot-navigation">
    <div v-for="item in menu" :key="item.id" class="pilot-navigation__menu">
      <router-link
        :to="item.route"
        class="pilot-navigation__menu-text"
        active-class="pilot-navigation__menu-text--active"
        v-slot="{ isActive }"
      >
        <button
          type="button"
          class="pilot-navigation__button"
          :class="[isActive && 'pilot-navigation__button-active']"
        >
          {{ item.name }}
           <div class="pilot-navigation__button-cart">
            <p class="pilot-navigation__button-quantity">
              {{ storeCart.cart }}
            </p>
           </div>
        </button>
      </router-link>
    </div>
    <div class="pilot-navigation__menu-mobile">
      <button type="button" class="pilot-navigation__menu-mobile--button" @click="toggleModal">
        &#9776;
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pilot-navigation {
  @media screen and (min-width: 620px) {
    display: flex;
  }

  &__button {
    position: relative;
    padding: 0;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-transform: uppercase;
    color: #0e0e0f;
    background: none;
    border: none;
  }

  &__button:hover {
    color: #00a76b;
    cursor: pointer;
  }

  &__button-active {
    color: #00a76b;
  }

  &__button-cart {
    position: absolute;
    top: -10px;
    right: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;
    width: 16px;
    height: 16px;
    background-color: #7b080c;
    border-radius: 50%;
  }

  &__button-quantity {
    color: #ffffff;
    font-weight: 700;
    font-size: 12px;
    line-height: 12px;
  }

  &__icon {
    width: 12px;
    margin-right: 3px;
  }

  &__menu {
    display: none;

    @media screen and (min-width: 620px) {
      display: inherit;
      margin-right: 20px;
    }

    @media screen and (min-width: 1024px) {
      margin-right: 48px;
    }
  }

  &__menu:nth-child(2) {
    margin-right: 0;
  }

  &__menu-mobile {
    @media screen and (min-width: 620px) {
      display: none;
    }
  }

  &__menu-mobile--button {
    width: 40px;
    height: 40px;
    color: #00a76b;
    background: none;
    border: 1px solid #00a76b;
    border-radius: 50%;
  }
}
</style>
