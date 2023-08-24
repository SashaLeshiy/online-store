<script setup lang="ts">
import { ref, computed } from 'vue'
import PilotCard from '@/shared/ui/PilotCard.vue'
import PilotSelect from '../shared/ui/PilotSelect.vue'
import PilotMainContainer from '../shared/ui/PilotMainContainer.vue'
import PilotLoader from '../shared/ui/PilotLoader.vue'
import { useCardsStore } from '@/app/stores/cards'
import CATEGORY from '@/shared/constants/category'
import { type Product } from '@/entities/Product'
import { type Category } from '@/entities/Category'

const searchQuery = ref('')
const categories = ref<Category[]>(CATEGORY)
const category = ref()
const filterCards = ref<Product[]>([])

const products = useCardsStore()

products.getCards()


const getProducts = computed((): Product[] => {
  return products.cards
})

const selectItem = (item?: Category) => {
  if (item) {
    category.value = item.id
    switch (item.id) {
      case 1: {
        filterCards.value = products.cards.filter((elem) => elem.category === "men's clothing")
        break
      }
      case 3: {
        filterCards.value = products.cards.filter((elem) => elem.category === 'jewelery')
        break
      }
      case 4: {
        filterCards.value = products.cards.filter((elem) => elem.category === 'electronics')
        break
      }
      case 2: {
        filterCards.value = products.cards.filter((elem) => elem.category === "women's clothing")
        break
      }
      default: {
        return null
      }
    }
  } else {
    category.value = null
  }
}

const filteredCards = computed((): Product[] => {
  if (category.value) {
    return filterCards.value
  } else if (searchQuery.value) {
    return searchData()
  } else {
    return products.cards
  }
})

const searchData = () => {
  if(searchQuery.value) {
    filterCards.value = products.cards.filter((elem) => {
      return elem.title.toLowerCase().indexOf(searchQuery.value.trim().toLowerCase()) > -1
    })
  }
    return filterCards.value
}

</script>

<template>
  <section class="pilot-cards">
    <PilotMainContainer class="pilot-cards__container">
      <div class="pilot-cards__header">
        <h1 class="pilot-cards__title">Наши товары</h1>
        <div class="pilot-cards__search">
          <input 
            type="text"
            name="query"
            v-model="searchQuery"
            class="pilot-cards__input"
            placeholder="Искать"
          />
        </div>
        <PilotSelect :dataSelect="categories" @selectItem="selectItem" />
      </div>
      <div v-if="getProducts.length <=0" class="pilot-cards__loader">
        <PilotLoader />
      </div>
      <div v-else class="pilot-cards__cards">
        <div v-for="elem in filteredCards" :key="elem?.id">
          <PilotCard :card="elem"></PilotCard>
        </div>
      </div>
      
      <div v-if="searchQuery && filterCards.length <= 0" class="pilot-cards__nothing">
        Ничего не найдено
      </div>
    </PilotMainContainer>
  </section>
</template>

<style lang="scss" scoped>
.pilot-cards {
  padding: 0 12px;

  @media screen and (min-width: 768px) {
    padding: 0 22px;
  }

  @media screen and (min-width: 1024px) {
    padding: 0 40px;
  }

  @media screen and (min-width: 1280px) {
    padding: 0 60px;
  }

  @media screen and (min-width: 1440px) {
    padding: 0 80px;
  }

  &__loader {
    text-align: center;
  }

  &__container {
    display: flex;
    flex-direction: column;
    min-height: calc(100dvh - 149px);
  }

  &__header {
    display: grid;
    align-items: center;
    margin-bottom: 20px;

    @media screen and (min-width: 620px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  &__search {
    position: relative;
    justify-self: center;
    margin-bottom: 12px;
    width: 80%;
    height: 48px;

    &::before {
      content: "";
      position: absolute;
      display: flex;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: url('@/shared/assets/images/search_icon.png') no-repeat center;
      width: 16px;
      height: 16px;
    }

    @media screen and (min-width: 620px) {
      margin-bottom: 0;
    }
  }

  &__input {
    display: flex;
    justify-self: center;
    padding-left: 12px;
    width: 100%;
    height: 48px;
    min-width: 134px;
    background-color: #ffffff;
    border: 1px solid #00a768;
    border-radius: 12px;

    @media screen and (min-width: 620px) {
      margin-top: 0;
    }

    &:focus {
      outline: none;
    }
  }

  &__title {
    text-align: center;

    @media screen and (min-width: 1024px) {
      font-weight: 600;
      font-size: 40px;
      line-height: 56px;
    }
  }

  &__cards {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 12px;

    @media screen and (min-width: 620px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
      grid-gap: 12px;
      padding-bottom: 20px;
    }

    @media screen and (min-width: 1024px) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (min-width: 1400px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  &__button {
    align-self: center;
  }

  &__nothing {
    font-weight: 400;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
  }
}
</style>
