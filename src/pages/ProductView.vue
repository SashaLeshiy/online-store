<script setup lang="ts">
import { onMounted, ref, defineComponent } from 'vue'
import { useCartStore } from '@/app/stores/cart'
import { useRoute } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import addCard from '@/shared/utils/addCart'
import removeCard from '@/shared/utils/removeCard'
import PilotButton from '@/shared/ui/PilotButton.vue'
import PilotMainContainer from '../shared/ui/PilotMainContainer.vue'
import { type Product } from '@/entities/Product'
import { API_ENDPOINTS } from '@/config/api'

defineComponent({
  PilotMainContainer,
  PilotButton,
  Swiper,
  SwiperSlide
})
const modules = [Navigation]

const storeCart = useCartStore()

const cart = ref<Product[]>(JSON.parse(localStorage.getItem('cart')!))

const route = useRoute()
const product = ref<Product>()
const openDescription = ref(false)

const loadData = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.productById(Number(route.params.id)))

    if (!response.ok) {
      throw new Error(`Товар не найден (${response.status})`)
    }

    product.value = await response.json()
  } catch (error) {
    if (error instanceof Error) {
      console.error('Ошибка загрузки товара:', error.message)
    } else {
      console.error('Неизвестная ошибка:', error)
    }
  }
}

onMounted(() => {
  loadData()
})

const isProductCart = (id: number) => {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]))
  }

  const cardInCart = cart.value.find((elem) => elem.id === id)

  return Boolean(cardInCart)
}

const addCardInCart = (card: Product) => {
  addCard(card)
  cart.value = JSON.parse(localStorage.getItem('cart')!)
  storeCart.setCart()
}

const removeCardInCart = (id: number) => {
  removeCard(id)
  cart.value = JSON.parse(localStorage.getItem('cart')!)
  storeCart.setCart()
}

const altImg = (event: Event) => {
  ;(event.target as HTMLImageElement).src = getImgUrl('error_photo.jpg')
}

const getImgUrl = (imageName: string) => {
  let url = new URL(`../shared/assets/images/${imageName}`, import.meta.url).pathname
  return url
}

const toggleOpenDescription = () => {
  openDescription.value = !openDescription.value
}

const productImage = (url: string) => {
  return `/api/${url}`
}
</script>

<template>
  <PilotMainContainer>
    <div class="product-view">
      <div v-if="product" class="product-view__slider">
        <swiper
          v-if="product.images"
          :style="{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff'
          }"
          :spaceBetween="10"
          :navigation="true"
          :modules="modules"
          class="product-view__swiper"
        >
          <swiper-slide v-for="image in product.images" :key="image.filename">
            <img
              :src="productImage(image.urls.original)"
              @error="altImg"
              class="product-view__img"
            />
          </swiper-slide>
        </swiper>
      </div>
      <div v-if="product" class="product-view__content">
        <h2 class="product-view__title">
          {{ product.title }}
        </h2>
        <button
          type="button"
          class="product-view__description-button"
          @click="toggleOpenDescription"
        >
          {{ openDescription ? 'Скрыть описание' : 'Показать описание' }}
        </button>
        <div v-if="openDescription" class="product-view__description-content">
          <h3 class="product-view__description">
            {{ product.description }}
          </h3>
        </div>
        <div class="product-view__middle">
          <div class="product-view__middle-rate">
            Рейтинг: <span class="product-view__middle-numbers">{{ product.rating.rate }}</span>
          </div>
          <div class="product-view__middle-count">
            Оценили: <span class="product-view__middle-numbers">{{ product.rating.count }}</span>
          </div>
        </div>
        <div class="product-view__footer">
          <h3 class="product-view__price">
            Цена: <span class="product-view__price-number">$ {{ product.price }}</span>
          </h3>
          <PilotButton
            v-if="isProductCart(product.id)"
            @click="removeCardInCart(product.id)"
            class="product-view__button"
          >
            Из корзины
          </PilotButton>
          <PilotButton v-else @click="addCardInCart(product)" class="product-view__button"
            >В корзину</PilotButton
          >
        </div>
      </div>
    </div>
  </PilotMainContainer>
</template>

<style lang="scss" scoped>
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #00a768;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
.product-view {
  padding: 20px;
  min-height: calc(100dvh - 149px);

  @media screen and (min-width: 768px) {
    display: grid;
    justify-items: center;
    grid-template-columns: 20px;
    grid-template-columns: 40% 1fr;
    grid-column-gap: 20px;
    padding: 40px;
  }

  &__content {
    min-width: 100%;
  }
  &__swiper {
    text-align: center;
    cursor: grab;

    :deep(.swiper-wrapper) {
      align-items: center;
    }

    :deep(.swiper-button-prev) {
      color: #00a768;
    }

    :deep(.swiper-button-next) {
      color: #00a768;
    }
  }

  &__thumbs {
    text-align: center;
  }

  &__slider {
    width: 100%;
  }

  &__img {
    width: 100%;
    max-width: 160px;
  }

  &__img-loader {
    display: none;
  }

  &__img-loader--active {
    display: inherit;
  }

  &__title {
    margin-bottom: 20px;
  }

  &__description {
    margin-bottom: 20px;
  }

  &__description-button {
    padding: 0;
    border: 0;
    color: #00a768;
    background: none;
    border-bottom: 1px dotted;
    cursor: pointer;
  }

  &__middle {
    display: flex;
    padding-top: 10px;
    padding-bottom: 24px;
  }

  &__middle-rate {
    margin-right: 20px;
  }

  &__middle-numbers {
    color: #00a768;
    font-style: italic;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__price-number {
    color: #00a768;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
  }
}
</style>
