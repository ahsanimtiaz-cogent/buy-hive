export interface Product {
  name: string
  price: string
  moq: string
  image: string
}

export interface FilterState {
  price: [number, number]
  productCertificates: string[]
  supplierCertificates: string[]
  locations: string[]
  stock: boolean
}
