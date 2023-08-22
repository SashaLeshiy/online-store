<script setup lang="ts">
import { ref, computed, defineComponent } from 'vue'
import { useCartStore } from '@/app/stores/cart'
import PilotMainContainer from '../shared/ui/PilotMainContainer.vue'
import PilotButton from '@/shared/ui/PilotButton.vue'
import removeCard from '@/shared/utils/removeCard'
import { type Product } from '@/entities/Product'

defineComponent({
  PilotMainContainer,
  PilotButton
})

const products = ref<Product[]>([])

const storeCart = useCartStore()

products.value = JSON.parse(localStorage.getItem('cart')!)

const removeCardInCart = (id: number) => {
  removeCard(id)
  products.value = JSON.parse(localStorage.getItem('cart')!)
  storeCart.setCart()
}

const setTotalPrice = computed(() => {
  let totalPrice: number = 0
  products.value.forEach((elem: { price: number; }) => {
    totalPrice += elem.price
  })
  return totalPrice.toFixed(2)
})
</script>
<template>
  <PilotMainContainer class="cart-view__container">
    <div class="cart-view">
      <h1 class="cart-view__title">Корзина - {{ products.length }}</h1>
      <div v-if="products.length > 0" class="cart-view__products">
        <div
          v-for="product in products"
          :key="product.id"
          class="cart-view__products-element"
        >
          <div class="cart-view__products-element--image">
            <img :src="product.image" class="cart-view__products-element--img" />
          </div>
          <h2 class="cart-view__products-element--title">
            {{ product.title }}
          </h2>
          <h3 class="cart-view__products-element--price">$ {{ product.price }}</h3>
          <PilotButton
            @click="removeCardInCart(product.id)"
            class="cart-view__products-element--button"
          >
            Из корзины
          </PilotButton>
        </div>
        <h2>Общая стоимость: $&nbsp;{{ setTotalPrice }}</h2>
      </div>
      <div v-else class="cart-view__title">Ваша корзина пуста</div>
    </div>
  </PilotMainContainer>
</template>

<style lang="scss" scoped>
.cart-view {
  &__container {
    padding: 20px;
    min-height: calc(100dvh - 149px);
  }
  &__title {
    font-weight: 600;
    font-size: 40px;
    line-height: 56px;
  }

  &__products {
    width: 100%;
    box-sizing: border-box;
  }

  &__products-element {
    display: grid;
    grid-gap: 20px;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    border: 1px solid #00a76b;
    border-radius: 8px;
    margin-bottom: 10px;

    @media screen and (min-width: 620px) {
      grid-template-columns: max-content 1fr 1fr 1fr;
      justify-content: left;
    }
  }

  &__products-element--image {
    justify-self: center;
    width: 100px;
  }

  &__products-element--img {
    width: 100%;
  }

  &__products-element--price {
    justify-self: center;
  }

  &__products-element--button {
    justify-self: center;
    max-width: 136px;
  }
}
</style>