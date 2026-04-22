// Получаем базовый URL из переменных окружения
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Типизация для endpoints
interface APIEndpoints {
  readonly products: string
  productById: (id: number) => string
  readonly categories: string
  productsByCategory: (category: string) => string
  productsWithLimit: (limit: number) => string
  productsSorted: (order: 'asc' | 'desc') => string

  readonly register: string
  readonly login: string
  readonly logout: string
  readonly me: string
  readonly updateProfile: string
  readonly changePassword: string

  productImages: (id: number, index: number, type: string) => string
}

// Создаем объект с endpoints
export const API_ENDPOINTS: APIEndpoints = {
  products: `${API_BASE_URL}/products`,
  productById: (id: number): string => `${API_BASE_URL}/products/${id}`,
  categories: `${API_BASE_URL}/products/categories/all`,
  productsByCategory: (category: string): string => `${API_BASE_URL}/products?category=${category}`,
  productsWithLimit: (limit: number): string => `${API_BASE_URL}/products?limit=${limit}`,
  productsSorted: (order: 'asc' | 'desc'): string => `${API_BASE_URL}/products?sort=${order}`,

  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  logout: `${API_BASE_URL}/auth/logout`,
  me: `${API_BASE_URL}/auth/me`,
  updateProfile: `${API_BASE_URL}/auth/profile`,
  changePassword: `${API_BASE_URL}/auth/change-password`,

  productImages: (id: number, index: number, type: string): string =>
    `${API_BASE_URL}/products/${id}/images/${index}/${type}`
}

export { API_BASE_URL }
