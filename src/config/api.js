export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const API_ENDPOINTS = {
    products: `${API_BASE_URL}/products`,
    productById: (id) => `${API_BASE_URL}/products/${id}`,
    categories: `${API_BASE_URL}/products/categories/all`,
    productsByCategory: (category) => `${API_BASE_URL}/products?category=${category}`,
    productsWithLimit: (limit) => `${API_BASE_URL}/products?limit=${limit}`,
    productsSorted: (order) => `${API_BASE_URL}/products?sort=${order}`
}