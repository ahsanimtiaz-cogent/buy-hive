import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import type { Product } from '../../../types/catalog'

interface ProductCardProps { product: Product; list?: boolean }

export function ProductCard({ product, list = false }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  return <Box className={`product-card ${list ? 'list-product' : ''}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}><Box className="product-image-wrap"><Box component="img" src={product.image} alt="" className="product-image" /></Box><Box className="product-details"><Typography className="product-name">{product.name}</Typography><Typography className="product-moq">MOQ: {product.moq}</Typography><Typography className="product-price">{product.price}</Typography>{hovered && <Button className="quick-view">Quick View</Button>}</Box></Box>
}
