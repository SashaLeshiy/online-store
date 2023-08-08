<script setup lang="ts">
import { ref, type PropType } from 'vue'
import addCard from '@/shared/utils/addCart'
import removeCard from '@/shared/utils/removeCard'
import PilotButton from '@/shared/ui/PilotButton.vue'
import { type Product } from '@/entities/Product'

defineProps({
  card: {
    type: Object as PropType<Product>,
    required: true
  }
})

const cart = ref<Product[]>(JSON.parse(localStorage.getItem('cart')!))

const isProductCart = (id: number) => {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]))
  }

  const cardInCart = cart.value?.find((elem) => elem.id === id)

  return Boolean(cardInCart)
}

const altImg = (event: Event) => {
        (event.target as HTMLImageElement).src = getImgUrl('error_photo.jpg')
    }

const getImgUrl = (imageName: string) => {
  let url = new URL(`../shared/assets/images/${imageName}`, import.meta.url).pathname
  return url
}

const addCardInCart = (card: Product) => {
  addCard(card)
  cart.value = JSON.parse(localStorage.getItem('cart')!)
}

const removeCardInCart = (id: number) => {
  removeCard(id)
  cart.value = JSON.parse(localStorage.getItem('cart')!)
}
</script>

<template>
  <div class="pilot-card">
    <router-link :to="`/products/${card.id}`" class="pilot-card__link">
      <div class="pilot-card__wrapper">
        <img v-if="card.image" :src="card.image" @error="altImg" class="pilot-card__img" />
      </div>
      <div class="pilot-card__content">
        <h3 class="pilot-card__title">
          {{ card.title }}
        </h3>
        <p class="pilot-card__price">Цена: $ {{ card.price }}</p>
      </div>
    </router-link>
    <PilotButton
      v-if="isProductCart(card.id)"
      @click="removeCardInCart(card.id)"
      class="pilot-card__button"
    >
      Из корзины
    </PilotButton>
    <PilotButton v-else @click="addCardInCart(card)" class="pilot-card__button"
      >В корзину</PilotButton
    >
  </div>
</template>

<style lang="scss" scoped>
.pilot-card {
  position: relative;
  padding: 10px;
  margin-bottom: 12px;
  width: 280px;
  height: 376px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  border-radius: 20px;

  @media screen and (min-width: 768px) {
    padding: 18px;
  }

  @media screen and (min-width: 1024px) {
    padding: 24px;
  }

  &__wrapper {
    position: relative;
    margin-bottom: 12px;
    height: 250px;
    text-align: center;
  }

  &__img {
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    max-width: 100%;
    max-height: 100%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    cursor: pointer;
  }

  &__img:hover {
    opacity: 0.7;
  }

  &__title {
    color: #000000;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__link {
    color: #000000;
    text-decoration: none;
  }

  &__title:hover {
    color: #00a76b;
    cursor: pointer;
  }

  &__content {
    position: relative;
  }

  &__price {
    margin-top: 20px;
  }

  &__button {
    position: absolute;
    bottom: 24px;
    right: 20px;
  }
}
</style>
