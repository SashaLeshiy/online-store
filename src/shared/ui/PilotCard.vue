<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { useCartStore } from '@/app/stores/cart'
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

const storeCart = useCartStore()

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
      <div class="pilot-card__image-wrapper">
        <div class="pilot-card__badge" v-if="isProductCart(card.id)">
          В корзине ✓
        </div>
        <img 
          v-if="card.image" 
          :src="card.image" 
          @error="altImg" 
          class="pilot-card__image" 
          :alt="card.title"
        />
        <div class="pilot-card__image-overlay">
          <span class="pilot-card__view-text">Посмотреть</span>
        </div>
      </div>
      <div class="pilot-card__content">
        <h3 class="pilot-card__title">
          {{ card.title }}
        </h3>
        <div class="pilot-card__rating">
          <span class="pilot-card__rate">{{ card.rating.rate }}</span>
          <span class="pilot-card__reviews">( {{ card.rating.count }} )</span>
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

  &__image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 167, 107, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease;
  }

  &__view-text {
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }

  &__image-wrapper:hover &__image-overlay {
    opacity: 1;
  }

  &__image-wrapper:hover &__view-text {
    transform: translateY(0);
  }

  &__image-wrapper:hover &__image {
    transform: scale(1.05);
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
  }

  &__price {
    font-weight: 700;
    font-size: 1.4rem;
    color: #00a76b;
    flex-shrink: 0;
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

  // Адаптивность
  @media (max-width: 768px) {
    padding: 16px;
    max-width: 100%;

    &__image-wrapper {
      height: 180px;
    }

    &__footer {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }

    &__price {
      text-align: center;
      font-size: 1.3rem;
    }

    &__button {
      width: 100%;
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    padding: 12px;

    &__image-wrapper {
      height: 160px;
    }

    &__title {
      font-size: 1rem;
    }

    &__price {
      font-size: 1.2rem;
    }

    &__button {
      padding: 8px 12px;
      font-size: 0.85rem;
    }
  }
}
</style>