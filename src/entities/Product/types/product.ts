export interface ProductImage {
  filename: string;
  index: number;
  urls: {
    original: string;
    thumbnail?: string;
    medium?: string;
  };
}
export interface Product {
    category: string,
    description: string,
    id: number,
    images: Array<ProductImage>,
    price: number,
    title: string,
    rating: {
      count: number,
      rate: number
    },
    createdAt?: string
    updatedAt?: string
}