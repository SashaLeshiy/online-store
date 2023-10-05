<script setup lang="ts">
import { ref, defineComponent, computed, onMounted } from 'vue'
import { useCartStore } from '@/app/stores/cart'
import PilotMainContainer from '../shared/ui/PilotMainContainer.vue'
import PilotButton from '@/shared/ui/PilotButton.vue'
import { type Product } from '@/entities/Product'
import { useVuelidate } from '@vuelidate/core'
import { helpers, minLength, numeric, required, maxLength, between } from '@vuelidate/validators'
import router from '@/app/router'

defineComponent({
  PilotMainContainer,
  PilotButton
})

const cardNumber = ref<Number>()
const cardHolder = ref<String>('')
const cardMouth = ref<Number>()
const cardYear = ref<Number>()
const cardCcv = ref<Number>()

const currentDate = new Date()

const currentYear = Number(currentDate.getFullYear().toString().substring(2))

const valueCardMouth = (value: string) => /(01|02|03|04|05|06|07|08|09|10|11|12)/.test(value)

const rules = computed(() => ({
  cardNumber: {
    required: helpers.withMessage('Обязательное поле', required),
    numeric: helpers.withMessage('Только цифры', numeric),
    minLength: helpers.withMessage('Минимальная длина 16 символов', minLength(16)) 
  },
  cardHolder: {
    required: helpers.withMessage('Обязательное поле', required),
    minLength: helpers.withMessage('Минимальная длина 2 символа', minLength(2)) 
  },
  cardMouth: {
    required: helpers.withMessage('Обязательное поле', required),
    numeric: helpers.withMessage('Только цифры', numeric),
    valueCardMouth: helpers.withMessage('Неверный месяц', valueCardMouth),
    maxLength: helpers.withMessage('Максимум 2 цифры', maxLength(2))
  },
  cardYear: {
    required: helpers.withMessage('Обязательное поле', required),
    numeric: helpers.withMessage('Только цифры', numeric),
    maxLength: helpers.withMessage('Максимум 2 цифры', maxLength(2)),
    beetweenValue: helpers.withMessage('Неверный год', between(23, 99))
  },
  cardCcv: {
    required: helpers.withMessage('Обязательное поле', required),
    numeric: helpers.withMessage('Только цифры', numeric),
    maxLength: helpers.withMessage('Только 3 цифры', maxLength(3)),
    minLength: helpers.withMessage('Только 3 цифры', minLength(3)) 
  },
}))

const v = useVuelidate(rules, { cardNumber, cardMouth, cardYear, cardCcv, cardHolder })

const products = ref<Product[]>([])

const storeCart = useCartStore()

products.value = JSON.parse(localStorage.getItem('cart')!)

const setTotalPrice = computed(() => {
  let totalPrice: number = 0
  products.value.forEach((elem: { price: number; }) => {
    totalPrice += elem.price
  })
  return totalPrice.toFixed(2)
})

const goToCheck = (() => {
  localStorage.setItem('paid', JSON.stringify('true'))
  router.push({ path: 'check' })
})

onMounted(() => {
  if(!products.value || products.value.length <= 0) {
    router.push({path: '/'})
  }
})

</script>
<template>
  <PilotMainContainer class="payment-view__container">
    <div v-if="products && products.length > 0" class="payment-view">
      <h2 class="payment-view__title">Оплата тoваров - {{ products.length }}</h2>
      <h2 class="payment-view__footer-total">На сумму: $&nbsp;{{ setTotalPrice }}</h2>
      <div class="payment-view__card">
        <form class="payment-view__form" novalidate>
          <div class="payment-view__element">
            <input
              placeholder="1234 5678 9101 1121"
              type="text"
              v-model="v.cardNumber.$model"
              name="cardNumber"
              minlength="16"
              maxlength="16"
              class="payment-view__input"
              :class="{'payment-view__input-error' : v.cardNumber.$errors.length > 0}"
            />
          </div>
          <div class="payment-view__element">
            <input
              placeholder="Имя"
              v-model="v.cardHolder.$model"
              type="text"
              class="payment-view__input"
              :class="{'payment-view__input-error' : v.cardHolder.$errors.length > 0}"
            />
          </div>
          <div class="payment-view__element-date">
            <div class="payment-view__element-date--elem">
              <input
                placeholder="Месяц"
                v-model="v.cardMouth.$model"
                type="text"
                name="city"
                class="payment-view__input"
                :class="{'payment-view__input-error' : v.cardMouth.$errors.length > 0}"
              />
            </div>
            <div class="payment-view__element-date--elem">
              <input
                placeholder="Год"
                v-model="v.cardYear.$model"
                type="text"
                name="year"
                class="payment-view__input"
                :class="{'payment-view__input-error' : v.cardYear.$errors.length > 0}"
              />
            </div>
          </div>
          <div class="payment-view__element">
            <input
              placeholder="CCV"
              v-model="v.cardCcv.$model"
              type="text"
              name="ccv"
              class="payment-view__input payment-view__input-ccv"
              :class="{'payment-view__input-error' : v.cardCcv.$errors.length > 0}"
            />
          </div>
          <PilotButton
            :disabled="!Boolean(cardHolder) || !Boolean(cardNumber) || !Boolean(cardMouth) || !Boolean(cardYear) || !Boolean(cardCcv) || v.$error"
            class="payment-view__button"
            @click="goToCheck()"
          > Оплатить </PilotButton>
        </form>
      </div>
    </div>
  </PilotMainContainer>
</template>

<style lang="scss" scoped>
.payment-view {
  &__container {
    padding: 20px;
    min-height: calc(100dvh - 149px);
  }

  &__error {
    position: absolute;
    display: flex;
  }

  &__error-text {
    margin: 0;
    margin-right: 8px;
    padding: 0;
    color: #e41115;
    font-size: 12px;
    line-height: 18px;
 }
  &__view {
    margin-top: 40px;
  }

  &__card {
    margin-top: 20px;
    width: 100%;
    max-width: 500px;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__element {
    position: relative;
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 32px;
    }
  }

  &__element-date {
    display: grid;
    grid-template-columns: fit-content(100px) fit-content(100px);
    grid-gap: 10px;
    margin-bottom: 20px;
  }

  &__element-date--elem {
    width: 100%;
  }

  &__input {
    all: unset;
    padding: 16px;
    box-sizing: border-box;
    width: 100%;
    border: none;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
    border-radius: 12px;

    // &:focus {
    //   border: 1px solid #00a76b;
    // }
  }

  &__input::placeholder {
    color: #a8a1a1;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
  }

  &__input-ccv {
    width: 100px;
  }

  &__input-error {
    border: 1px solid #e41115;
  }

  &__button {
    max-width: 150px;
  }

}
</style>
