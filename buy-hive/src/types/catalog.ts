export interface Product {
  _id: string
  productName: string
  shortDescription: string
  displayMOQ: string
  minimumOrderQuantity: number
  price: string
  categoryName: string
  country: string
  stockInUSA: boolean
  images: string[]
  certificates: string[]
  supplierName: string
  createdAt: string
  updatedAt: string
}

export interface FilterState {
  price: [number, number]
  productCertificates: string[]
  supplierCertificates: string[]
  locations: string[]
  stock: boolean
}
