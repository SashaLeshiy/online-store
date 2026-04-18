import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import PilotSelect from '../PilotSelect.vue'
import { type Category } from '@/entities/Category'

describe('PilotSelect', () => {
  let wrapper: VueWrapper<any>
  const mockCategories: Category[] = [
    { id: 1, name: 'Электроника' },
    { id: 2, name: 'Одежда' },
    { id: 3, name: 'Книги' }
  ]

  const createWrapper = (props = {}) => {
    return mount(PilotSelect, {
      props: {
        dataSelect: mockCategories,
        ...props
      },
    })
  }

  beforeEach(() => {
    wrapper = createWrapper()
  })

  describe('Рендеринг', () => {
    it('должен корректно рендериться с переданными пропсами', () => {
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('.pilot-select').exists()).toBe(true)
    })

    it('должен отображать "Категории" по умолчанию, если ничего не выбрано', () => {
      const resultText = wrapper.find('.pilot-select__result')
      expect(resultText.text()).toBe('Категории')
    })

    it('должен отображать все категории из dataSelect', () => {
      const options = wrapper.findAll('.pilot-select__option')
      
      expect(options.length).toBe(mockCategories.length + 1) // +1 потому что есть пункт "Все категории"
      
      expect(options[0].text()).toContain('Все категории')
      
      // Проверяем категории
      expect(options[1].text()).toContain('Электроника')
      expect(options[2].text()).toContain('Одежда')
      expect(options[3].text()).toContain('Книги')
    })

    it('должен скрывать список опций по умолчанию', () => {
      const optionsList = wrapper.find('.pilot-select__options')
      expect(optionsList.classes()).not.toContain('pilot-select__options_show')
    })
  })

  describe('Взаимодействие с пользователем', () => {
    it('должен показывать опции при клике на result-wrap', async () => {
      const resultWrap = wrapper.find('.pilot-select__result-wrap')
      await resultWrap.trigger('click')
      
      const optionsList = wrapper.find('.pilot-select__options')
      expect(optionsList.classes()).toContain('pilot-select__options_show')
    })

    it('должен скрывать опции при повторном клике', async () => {
      const resultWrap = wrapper.find('.pilot-select__result-wrap')
      await resultWrap.trigger('click')
      await resultWrap.trigger('click')
      
      const optionsList = wrapper.find('.pilot-select__options')
      expect(optionsList.classes()).not.toContain('pilot-select__options_show')
    })

    it('должен скрывать опции при потере фокуса', async () => {
      const resultWrap = wrapper.find('.pilot-select__result-wrap')
      await resultWrap.trigger('click')
      
      // Имитируем потерю фокуса на родительском div
      await wrapper.trigger('blur')
      
      const optionsList = wrapper.find('.pilot-select__options')
      expect(optionsList.classes()).not.toContain('pilot-select__options_show')
    })

    it('должен эмитить selectItem с undefined при выборе "Все категории"', async () => {
      const resultWrap = wrapper.find('.pilot-select__result-wrap')
      await resultWrap.trigger('click')
      
      const allCategoriesOption = wrapper.findAll('.pilot-select__option')[0]
      await allCategoriesOption.trigger('click')
      
      expect(wrapper.emitted('selectItem')).toBeTruthy()
      expect((wrapper.emitted('selectItem') as Array<[Category?]>)[0]).toEqual([undefined])
    })

    it('должен эмитить selectItem с выбранной категорией', async () => {
      const resultWrap = wrapper.find('.pilot-select__result-wrap')
      await resultWrap.trigger('click')
      
      const categoryOption = wrapper.findAll('.pilot-select__option')[1]
      await categoryOption.trigger('click')
      
      expect(wrapper.emitted('selectItem')).toBeTruthy()
      expect((wrapper.emitted('selectItem') as Array<[Category?]>)[0]).toEqual([mockCategories[0]])
    })

    it('должен отображать название выбранной категории после выбора', async () => {
      const resultWrap = wrapper.find('.pilot-select__result-wrap')
      await resultWrap.trigger('click')
      
      const categoryOption = wrapper.findAll('.pilot-select__option')[2]
      await categoryOption.trigger('click')
      
      const resultText = wrapper.find('.pilot-select__result')
      expect(resultText.text()).toBe('Одежда')
    })

    it('должен отображать "Категории" после выбора "Все категории"', async () => {
      const resultWrap = wrapper.find('.pilot-select__result-wrap')
      await resultWrap.trigger('click')
      
      const allCategoriesOption = wrapper.findAll('.pilot-select__option')[0]
      await allCategoriesOption.trigger('click')
      
      const resultText = wrapper.find('.pilot-select__result')
      expect(resultText.text()).toBe('Категории')
    })
  })

  describe('Классы и стили', () => {
    it('должен добавлять класс active при открытом списке', async () => {
      const resultWrap = wrapper.find('.pilot-select__result-wrap')
      await resultWrap.trigger('click')
      
      expect(resultWrap.classes()).toContain('pilot-select__result-wrap_active')
    })

    it('должен убирать класс active при закрытии списка', async () => {
      const resultWrap = wrapper.find('.pilot-select__result-wrap')
      await resultWrap.trigger('click')
      await resultWrap.trigger('click')
      
      expect(resultWrap.classes()).not.toContain('pilot-select__result-wrap_active')
    })
  })

  describe('Edge cases', () => {
    it('должен корректно работать с пустым массивом dataSelect', async () => {
      wrapper = createWrapper({ dataSelect: [] })
      
      const options = wrapper.findAll('.pilot-select__option')
      // Только пункт "Все категории"
      expect(options.length).toBe(1)
      
      const resultWrap = wrapper.find('.pilot-select__result-wrap')
      await resultWrap.trigger('click')
      
      const allCategoriesOption = wrapper.find('.pilot-select__option')
      await allCategoriesOption.trigger('click')
      
      expect((wrapper.emitted('selectItem') as Array<[Category?]>)[0]).toEqual([undefined])
    })
  })
})