import { type Product } from '@/entities/Product'

const addCard = (card: Product) => {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
      const cartProducts = JSON.parse(localStorage.getItem('cart') || '')
      cartProducts.push(card)
      localStorage.setItem('cart', JSON.stringify(cartProducts))
  }

  export default addCard