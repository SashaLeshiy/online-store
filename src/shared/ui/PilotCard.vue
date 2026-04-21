<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '@/app/stores/cart'
import addCard from '@/shared/utils/addCart'
import removeCard from '@/shared/utils/removeCard'
import PilotButton from '@/shared/ui/PilotButton.vue'
import { type Product } from '@/entities/Product'

const props = defineProps<{
  card: Product
}>()

const card = computed(() => props.card)

const storeCart = useCartStore()

const cart = ref<Product[]>(JSON.parse(localStorage.getItem('cart')!))

const isProductCart = (id: number) => {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]))
  }

  const cardInCart = cart.value?.find((elem) => elem.id === id)

  return Boolean(cardInCart)
}

const images = computed<string[]>(() => {
  return [
    `/api/products/${props.card.id}/images/0/original`,
    `/api/products/${props.card.id}/images/1/original`,
    `/api/products/${props.card.id}/images/2/original`
  ]
})

const currentIndex = ref(0)

const onMouseMove = (event: MouseEvent) => {
  const wrapper = event.currentTarget as HTMLElement
  if (!wrapper || images.value.length === 0) return

  const rect = wrapper.getBoundingClientRect()
  const x = event.clientX - rect.left
  const segmentWidth = rect.width / images.value.length
  const index = Math.min(images.value.length - 1, Math.max(0, Math.floor(x / segmentWidth)))
  currentIndex.value = index
}

const goToSlide = (index: number) => {
  if (index < 0 || index >= images.value.length) return
  currentIndex.value = index
}

// Текущее изображение
const currentImageUrl = computed(() => {
  if (images.value.length > 0 && images.value[currentIndex.value]) {
    return images.value[currentIndex.value]
  }
  return ''
})

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
</script>

<template>
  <div class="pilot-card">
    <router-link :to="`/products/${card.id}`" class="pilot-card__link">
      <div class="pilot-card__image-wrapper" @mousemove="onMouseMove">
        <div class="pilot-card__badge" v-if="isProductCart(card.id)">В корзине ✓</div>
        <div class="pilot-card__image-holder">
          <img :src="currentImageUrl" class="pilot-card__image" :alt="card.title" />
        </div>
        <div class="pilot-card__paginator" v-if="images.length > 1">
          <button
            v-for="(img, i) in images"
            :key="i"
            class="pilot-card__dot"
            :class="{ 'pilot-card__dot--active': i === currentIndex }"
            @click.stop="goToSlide(i)"
            :aria-label="`Изображение ${i + 1}`"
          />
        </div>
      </div>
      <div class="pilot-card__content">
        <h3 class="pilot-card__title">
          {{ card.title }}
        </h3>
        <div class="pilot-card__rating">
          <span class="pilot-card__rate">{{ card.rating.rate }}</span>
          <span class="pilot-card__reviews">( {{ card.rating.count }} отзывов)</span>
          <div class="pilot-card__stars">
            <span class="pilot-card__star">👍</span>
          </div>
        </div>
      </div>
    </router-link>
    <div class="pilot-card__footer">
      <div class="pilot-card__price">${{ card.price }}</div>
      <div class="pilot-card__actions">
        <PilotButton
          v-if="isProductCart(card.id)"
          @click.stop="removeCardInCart(card.id)"
          class="pilot-card__button pilot-card__button--remove"
          variant="outline"
        >
          <span class="pilot-card__button-icon">🗑️</span>
          Удалить
        </PilotButton>
        <PilotButton
          v-else
          @click.stop="addCardInCart(card)"
          class="pilot-card__button pilot-card__button--add"
          variant="primary"
        >
          <span class="pilot-card__button-icon">🛒</span>
          В корзину
        </PilotButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pilot-card {
  position: relative;
  padding: 20px;
  width: 100%;
  max-width: 320px;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: #e2e8f0;
  }

  &__link {
    color: inherit;
    text-decoration: none;
    display: block;
  }

  &__image-wrapper {
    position: relative;
    margin-bottom: 16px;
    height: 200px;
    border-radius: 12px;
    overflow: hidden;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);

    @media (max-width: 768px) {
      height: 180px;
    }

    @media (max-width: 480px) {
      height: 160px;
    }
  }

  &__badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: linear-gradient(135deg, #00a76b 0%, #00c853 100%);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    z-index: 2;
    box-shadow: 0 2px 8px rgba(0, 167, 107, 0.3);
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.3s ease;
  }

  &__image-holder {
    width: 100%;
    height: 100%;
    display: block;
  }

  &__image-holder--flip-x {
    transform: scaleX(-1);
  }

  &__image-holder--flip-y {
    transform: scaleY(-1);
  }

  &__image-wrapper:hover &__image {
    transform: scale(1.05);
  }

  &__paginator {
    position: absolute;
    bottom: 8px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    z-index: 2;
    padding: 0 8px;
  }

  &__dot {
    flex: 1 1 0;
    height: 4px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.5);
    border: none;
    cursor: pointer;
    padding: 0;
    outline: none;
    transition:
      background 0.2s ease,
      height 0.2s ease,
      opacity 0.2s ease;
    appearance: none;

    &:hover {
      opacity: 0.9;
    }
  }

  &__dot--active {
    background: #00a76b;
    height: 6px;
  }

  &__content {
    margin-bottom: 20px;
  }

  &__title {
    font-weight: 600;
    font-size: 1.1rem;
    line-height: 1.4;
    color: #1e293b;
    margin: 0 0 12px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 2.8em;
    transition: color 0.2s ease;

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }

  &__link:hover &__title {
    color: #00a76b;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__stars {
    display: flex;
    gap: 2px;
  }

  &__star {
    color: #00a76b;
    font-size: 0.9rem;
  }

  &__rate {
    color: #7b080c;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
  }

  &__reviews {
    color: #64748b;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }
  }

  &__price {
    font-weight: 700;
    font-size: 1.4rem;
    color: #00a76b;
    flex-shrink: 0;

    @media (max-width: 768px) {
      text-align: center;
      font-size: 1.3rem;
    }

    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }

  &__actions {
    flex-shrink: 0;
  }

  &__button {
    padding: 10px 16px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    white-space: nowrap;

    @media (max-width: 768px) {
      width: 100%;
      justify-content: center;
    }

    @media (max-width: 480px) {
      padding: 8px 12px;
      font-size: 0.85rem;
    }

    &--add {
      background: linear-gradient(135deg, #00a76b 0%, #00c853 100%);
      border: none;
      color: white;
      box-shadow: 0 2px 8px rgba(0, 167, 107, 0.3);

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 167, 107, 0.4);
      }
    }

    &--remove {
      background: transparent;
      border: 1px solid #fecaca;
      color: #dc2626;

      &:hover {
        background: #fef2f2;
        border-color: #fca5a5;
      }
    }
  }

  &__button-icon {
    margin-right: 6px;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 16px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
}
</style>
