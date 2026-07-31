import { Box } from '@mui/material'
import type { Product } from '../../../types/catalog'
import { ProductCard } from '../ProductCard'

interface ProductGridProps { products: Product[]; view: 'grid' | 'list' }

export function ProductGrid({ products, view }: ProductGridProps) { return <Box className={`products-grid ${view === 'list' ? 'list-view' : ''}`}>{products.map((product) => <ProductCard key={product._id} product={product} list={view === 'list'} />)}</Box> }
