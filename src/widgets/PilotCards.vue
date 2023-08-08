<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import PilotCard from '@/shared/ui/PilotCard.vue'
import PilotSelect from '../shared/ui/PilotSelect.vue'
import PilotMainContainer from '../shared/ui/PilotMainContainer.vue'
import CATEGORY from '@/shared/constants/category'
import { type Product } from '@/entities/Product'
import { type Category } from '@/entities/Category'

const cards = ref<Product[]>([])
const searchQuery = ref('')
const categories = ref<Category[]>(CATEGORY)
const category = ref()
const filterCards = ref<Product[]>([])

const loadData = () => {
  fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((json) => {
      cards.value = json
    })
    .catch((error) => console.log(error.message))
}

const selectItem = (item: Product) => {
  if (item) {
    category.value = item.id
    switch (item.id) {
      case 1: {
        filterCards.value = cards.value.filter((elem) => elem.category === "men's clothing")
        break
      }
      case 3: {
        filterCards.value = cards.value.filter((elem) => elem.category === 'jewelery')
        break
      }
      case 4: {
        filterCards.value = cards.value.filter((elem) => elem.category === 'electronics')
        break
      }
      case 2: {
        filterCards.value = cards.value.filter((elem) => elem.category === "women's clothing")
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

const filteredCards = computed(() => {
  if (category.value) {
    return filterCards.value
  } else if (searchQuery.value) {
    return searchData()
  } else {
    return cards.value
  }
})

const searchData = () => {
  if(searchQuery.value) {
    filterCards.value = cards.value.filter((elem) => {
      return elem.title.toLowerCase().indexOf(searchQuery.value.trim().toLowerCase()) > -1
    })
  }
    return filterCards.value
}

onMounted(() => {
  loadData()
})
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
      <div v-if="filteredCards" class="pilot-cards__cards">
        <div v-for="card in filteredCards" :key="card?.id">
          <PilotCard :card="card"></PilotCard>
        </div>
      </div>
      <div v-else class="pilot-cards__loader">
        <div class="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div v-if="searchQuery && filterCards.length <= 0" class="pilot-cards__nothing">
        Ничего не найдено
      </div>
    </PilotMainContainer>
  </section>
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
