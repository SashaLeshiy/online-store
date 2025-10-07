<script setup lang="ts">
import { ref, computed, defineComponent } from 'vue'
import { useCartStore } from '@/app/stores/cart'
import PilotMainContainer from '../shared/ui/PilotMainContainer.vue'
import PilotButton from '@/shared/ui/PilotButton.vue'
import removeCard from '@/shared/utils/removeCard'
import { type Product } from '@/entities/Product'
import router from '@/app/router'

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
  products.value.forEach((elem: { price: number }) => {
    totalPrice += elem.price
  })
  return totalPrice.toFixed(2)
})

const goToPay = () => {
  router.push({ path: 'payment' })
}
</script>

<template>
  <PilotMainContainer class="cart-view__container">
    <div class="cart-view">
      <div v-if="products && products.length > 0" class="cart-view__content">
        <div class="cart-view__header">
          <h1 class="cart-view__title">
            <span class="cart-view__title-icon">🛒</span>
            Корзина 
            <span class="cart-view__count">({{ products.length || 0 }})</span>
          </h1>
        </div>
        
        <div class="cart-view__products">
          <div 
            v-for="product in products" 
            :key="product.id" 
            class="cart-view__product"
          >
            <div class="cart-view__product-image">
              <img 
                :src="product.image" 
                :alt="product.title"
                class="cart-view__product-img" 
              />
            </div>
            
            <div class="cart-view__product-info">
              <h3 class="cart-view__product-title">
                {{ product.title }}
              </h3>
              <div class="cart-view__product-price">${{ product.price }}</div>
            </div>
            
            <div class="cart-view__product-actions">
              <PilotButton
                @click="removeCardInCart(product.id)"
                class="cart-view__remove-btn"
                variant="outline"
              >
                <span class="cart-view__remove-icon">🗑️</span>
                Удалить
              </PilotButton>
            </div>
          </div>
        </div>
        
        <div class="cart-view__summary">
          <div class="cart-view__total">
            <div class="cart-view__total-label">Общая стоимость:</div>
            <div class="cart-view__total-amount">${{ setTotalPrice }}</div>
          </div>
          
          <PilotButton 
            class="cart-view__checkout-btn" 
            @click="goToPay()"
            variant="primary"
          >
            <span class="cart-view__checkout-icon">💳</span>
            Перейти к оплате
          </PilotButton>
        </div>
      </div>
      
      <div v-else class="cart-view__empty">
        <div class="cart-view__empty-icon">🛒</div>
        <h2 class="cart-view__empty-title">Ваша корзина пуста</h2>
        <p class="cart-view__empty-text">Добавьте товары, чтобы сделать заказ</p>
        <PilotButton 
          class="cart-view__empty-btn"
          @click="$router.push('/')"
          variant="primary"
        >
          Вернуться к покупкам
        </PilotButton>
      </div>
    </div>
  </PilotMainContainer>
</template>

<style lang="scss" scoped>
.cart-view {
  &__container {
    padding: 0;
    min-height: calc(100dvh - 149px);
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  }

  &__content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px 24px;
  }

  &__header {
    margin-bottom: 32px;
    text-align: center;
  }

  &__title {
    font-weight: 700;
    font-size: 2.5rem;
    line-height: 1.2;
    color: #1e293b;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin: 0;
  }

  &__title-icon {
    font-size: 2rem;
  }

  &__count {
    color: #00a76b;
    background: #e8f5e8;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 1.5rem;
  }

  &__products {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 32px;
  }

  &__product {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
  }

  &__product-image {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    border-radius: 12px;
    overflow: hidden;
    background: #f8fafc;
  }

  &__product-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__product-info {
    flex: 1;
    min-width: 0;
  }

  &__product-title {
    font-weight: 600;
    font-size: 1.1rem;
    line-height: 1.4;
    color: #1e293b;
    margin: 0 0 8px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__product-price {
    font-weight: 700;
    font-size: 1.25rem;
    color: #00a76b;
  }

  &__product-actions {
    flex-shrink: 0;
  }

  &__remove-btn {
    background: transparent;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 10px 16px;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
      background: #fef2f2;
      border-color: #fca5a5;
    }
  }

  &__remove-icon {
    margin-right: 6px;
  }

  &__summary {
    background: white;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  &__total {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__total-label {
    font-weight: 600;
    font-size: 1.1rem;
    color: #64748b;
  }

  &__total-amount {
    font-weight: 700;
    font-size: 1.5rem;
    color: #00a76b;
  }

  &__checkout-btn {
    background: linear-gradient(135deg, #00a76b 0%, #00c853 100%);
    border: none;
    color: white;
    padding: 14px 28px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 167, 107, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 167, 107, 0.4);
    }
  }

  &__checkout-icon {
    margin-right: 8px;
  }

  &__empty {
    text-align: center;
    padding: 80px 24px;
    max-width: 480px;
    margin: 0 auto;
  }

  &__empty-icon {
    font-size: 4rem;
    margin-bottom: 24px;
    opacity: 0.5;
  }

  &__empty-title {
    font-weight: 700;
    font-size: 1.75rem;
    color: #1e293b;
    margin: 0 0 12px 0;
  }

  &__empty-text {
    font-size: 1.1rem;
    color: #64748b;
    margin: 0 0 32px 0;
    line-height: 1.6;
  }

  &__empty-btn {
    background: linear-gradient(135deg, #00a76b 0%, #00c853 100%);
    border: none;
    color: white;
    padding: 14px 32px;
    border-radius: 12px;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 167, 107, 0.4);
    }
  }

  // Адаптивность
  @media (max-width: 768px) {
    &__content {
      padding: 24px 16px;
    }

    &__title {
      font-size: 2rem;
      flex-direction: column;
      gap: 8px;
    }

    &__product {
      flex-direction: column;
      text-align: center;
      gap: 16px;
      padding: 20px;
    }

    &__product-info {
      width: 100%;
    }

    &__summary {
      flex-direction: column;
      text-align: center;
      gap: 20px;
    }

    &__total {
      flex-direction: column;
      gap: 8px;
    }
  }

  @media (max-width: 480px) {
    &__title {
      font-size: 1.75rem;
    }

    &__product-image {
      width: 60px;
      height: 60px;
    }

    &__checkout-btn,
    &__empty-btn {
      width: 100%;
    }
  }
}
</style>