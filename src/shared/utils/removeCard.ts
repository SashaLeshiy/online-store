import { type Product } from '@/entities/Product'

const removeCard = (id: number) => {
    const cartProducts = JSON.parse(localStorage.getItem('cart') || '')
                        .filter((elem: Product) => {
                          return elem.id !== id
                        })
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }

export default removeCard