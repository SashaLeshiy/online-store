
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/app/stores/cart'
import router from '@/app/router'
import { type Product } from '@/entities/Product'
import PilotMainContainer from '../shared/ui/PilotMainContainer.vue'
import PilotButton from '@/shared/ui/PilotButton.vue'

const storeCart = useCartStore()

const products = ref<Product[]>([])
const paid = ref<String>('')

paid.value = JSON.parse(localStorage.getItem('paid')!)

products.value = JSON.parse(localStorage.getItem('cart')!)


onMounted(() => {
  if(!products.value || products.value.length <= 0) {
    router.push({ path: '/' })
  } else if (paid.value !== 'true') {
    router.push({ path: 'payment' })
  } else {
    localStorage.removeItem('cart')
    localStorage.removeItem('paid')
    storeCart.setCart()
  }
})

const goToMain = (() => {
  router.push({ path: '/' })
})
</script>

<template>
    <PilotMainContainer class="check-view__container">
        <h1>Оплата получена, спасибо за покупку!</h1>
        <PilotButton
            class="check-view__button"
            @click="goToMain()"
          > Вернуться в каталог </PilotButton>
    </PilotMainContainer>
</template>

<style lang="scss" scoped>
.check-view {
    &__container {
    padding: 20px;
    min-height: calc(100dvh - 149px);
  }
}
</style>