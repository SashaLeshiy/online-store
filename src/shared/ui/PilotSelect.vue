<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { type Category } from '@/entities/Category'

defineProps({
  dataSelect: {
    type: Array as PropType<Category[]>,
    required: true
  }
})
const emit = defineEmits(['selectItem'])

const showOptions = ref(false)
const selectTypeId = ref()

const toggleShowOptions = () => {
  showOptions.value = !showOptions.value
}

const hideOptions = () => {
  showOptions.value = false
}

const setOption = (item?: Category) => {
  selectTypeId.value = item
  emit('selectItem', item)
  hideOptions()
}
</script>

<template>
  <div class="pilot-select" @blur="hideOptions" tabindex="0">
    <div class="pilot-select__container">
      <div
        class="pilot-select__result-wrap"
        :class="{ 'pilot-select__result-wrap_active': showOptions }"
        @click="toggleShowOptions"
      >
        <p class="pilot-select__result" v-if="selectTypeId">{{ selectTypeId.name }}</p>
        <p class="pilot-select__result" v-else>Категории</p>
      </div>
      <ul class="pilot-select__options" :class="{ 'pilot-select__options_show': showOptions }">
        <li class="pilot-select__option" @click="setOption()">
          <span class="pilot-select__option-result">Все категории</span>
        </li>
        <li
          class="pilot-select__option"
          v-for="item in dataSelect"
          :key="item.id"
          @click="setOption(item)"
        >
          <span class="pilot-select__option-result"> {{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pilot-select {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: transparent;
  width: 100%;

  @media screen and (min-width: 1024px) {
    justify-content: left;
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    margin-right: 20px;
  }

  &__container {
    display: flex;
    position: relative;
    width: 80%;
    min-width: 134px;
    background-color: #ffffff;
    border: 1px solid #00a768;
    border-radius: 12px;

    @media screen and (min-width: 620px) {
      width: 50%;
    }

    @media screen and (min-width: 1024px) {
      max-width: 208px;
    }
  }

  &__result-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    position: relative;
    border-radius: 5px;
    width: 100%;
    padding-left: 12px;
    padding-right: 34px;
    cursor: pointer;

    &:hover {
      &::before {
        background: url('@/shared/assets/icons/arrow_grey_icon.svg') no-repeat center;
      }

      .pilot-select__result {
        color: #4e4b4b;
        font-weight: 500;
      }
    }

    &::before {
      content: '';
      position: absolute;
      display: flex;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: url('@/shared/assets/icons/arrow_grey_icon.svg') no-repeat center;
      width: 14px;
      height: 14px;
    }
  }

  &__result-wrap_active {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;

    &::before {
      background: url('@/shared/assets/icons/arrow_grey_icon.svg') no-repeat center;
    }
  }

  &__result {
    color: #4e4b4b;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
  }

  &__options {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    opacity: 0;
    position: absolute;
    top: 48px;
    left: 0;
    width: 100%;
    max-height: 400px;
    background-color: #ffffff;
    box-shadow: 1px 4px 10px rgba(0, 0, 0, 0.05);
    border: 1px solid #00a768;
    border-radius: 10px;
    padding: 0;
    z-index: 99;
    overflow-y: auto;
  }

  &__options_show {
    opacity: 1;
    display: flex;
  }

  &__option {
    position: relative;
    padding-left: 12px;
    display: flex;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 5px;

    &:hover {
      cursor: pointer;
    }
  }

  &__option-result {
    color: #4e4b4b;
    font-weight: 400;
    font-size: 16px;
  }

  &__option_active {
    &:after {
      content: '';
      position: absolute;
      background-size: cover;
      width: 16px;
      height: 12px;
      top: 50%;
      transform: translateY(-50%);
      right: 12px;
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>