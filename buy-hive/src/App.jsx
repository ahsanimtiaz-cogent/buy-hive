import { useMemo, useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import {
  Apps,
  ArrowBackIosNew,
  ArrowForwardIos,
  ExpandMore,
  Close,
  GridView,
  List,
  Menu,
  Person,
  Search,
  ShoppingCartOutlined,
} from '@mui/icons-material'
import './App.css'
import './overrides.css'

const imageBase = 'https://tbh-production.s3.ap-southeast-1.amazonaws.com/Product'

const products = [
  ['Teakwood Outdoor Patio Sofa Furniture', '$ 125.00 - $ 6,900.00 / Set', '5 Sets', '1645385020/Images/163670064424262061.jpg'],
  ['Outdoor Aluminium Frame Furniture', '$ 615.70 - $ 762.50 / Set', '5 Sets', '104319170/Images/16376374001550894476.jpg'],
  ['Aluminium Sofa with Coffee Table', '$ 667.80 - $ 694.40 / Set', '5 Sets', '1097372935/Images/1637636954160800125.jpg'],
  ['Aluminium Outdoor Sofa', '$ 890.80 - $ 925.50 / Set', '5 Sets', '14512440/Images/163763654688980300.jpg'],
  ['Aluminium Frame Sofa Set', '$ 892.10 - $ 1,104.50 / Set', '5 Sets', '1077009789/Images/16376354131658955933.jpg'],
  ['Aluminium Frame Sofa', '$ 1,009.00 - $ 1,049.00 / Set', '5 Sets', '57326006/Images/16376348661184558908.jpg'],
  ['Leisure Outdoor Sofa', '$ 134.50 - $ 499.20 / Set', '5 Sets', '1121912299/Images/1637633847947788375.jpg'],
  ['Aluminum Garden Sofa', '$ 120.60 - $ 483.10 / Set', '5 Sets', '36954668/Images/16376322581246378711.jpg'],
  ['Garden Sofa Leisure Chair', '$ 59.00 - $ 156.50 / Set', '5 Sets', '1566854753/Images/1637574145175834214.jpg'],
  ['Rattan Park Seating Bench', '$ 179.00 - $ 188.10 / Unit', '5 Units', '483994266/Images/16375683361046886881.jpg'],
  ['Garden Hotel Bistro Home Sofa Set', '$ 125.00 - $ 131.50 / Unit', '5 Units', '1544419039/Images/16375673871213296195.jpg'],
  ['Outdoor Rope Dining Chair', '$ 155.00 - $ 162.90 / Unit', '5 Units', '526799632/Images/1637566256337520841.jpg'],
].map(([name, price, moq, image]) => ({ name, price, moq, image: `${imageBase}/${image}` }))

const productCertificates = ['FDA', 'Certificate of Conformity', 'CE', 'ASTM', 'GB', 'Certificate of Compliance', 'Intertek', 'ROHS', 'FCC', 'EN', 'EPA', 'ISO 11439:2000', 'SGS', 'Green Clean Certificate', 'ISO 11439:2013']
const supplierCertificates = ['DUNS', 'DRS', 'ISO 13485', 'ISO 9001', 'ISO 9001:2015', 'GMP']
const locations = ['Hong Kong S.A.R', 'India', 'China', 'Vietnam', 'United States', 'Canada', 'Australia', 'United Kingdom', 'Korea, Republic of']

function Logo() {
  return (
    <Stack direction="row" alignItems="center" spacing={1.2} sx={{ minWidth: 194 }}>
      <Box className="hive-mark" aria-hidden="true">
        <Box className="hive-cell cell-a" />
        <Box className="hive-cell cell-b" />
        <Box className="hive-cell cell-c" />
      </Box>
      <Box>
        <Typography className="logo-word">buyhive</Typography>
        <Typography className="logo-tagline">sourcing made easy</Typography>
      </Box>
    </Stack>
  )
}

function Header({ onMenu }) {
  return (
    <AppBar position="static" elevation={0} color="transparent" component="header">
      <Toolbar disableGutters className="header-toolbar">
        <Logo />
        <Stack className="desktop-nav" direction="row" spacing={5.2} alignItems="center">
          <Typography>Expert Sourcing</Typography>
          <Typography>Contract Manufacturing</Typography>
          <Typography className="active-nav">Buy</Typography>
          <Typography>Financing</Typography>
          <Typography>About Us <ExpandMore sx={{ fontSize: 16, verticalAlign: 'middle', color: '#9b9b9b' }} /></Typography>
        </Stack>
        <Stack direction="row" spacing={1.1} alignItems="center" sx={{ ml: 'auto' }}>
          <Button className="register-button">Register</Button>
          <Button className="signin-button" startIcon={<Person />}>Sign In</Button>
          <IconButton className="cart-button"><ShoppingCartOutlined /><Box className="cart-badge">0</Box></IconButton>
          <IconButton className="mobile-menu" onClick={onMenu}><Menu /></IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

function SearchArea({ query, setQuery, category, setCategory, onSearch, onCategories }) {
  return (
    <Box className="search-shell">
      <Button className="categories-button" startIcon={<Apps />} onClick={onCategories}>Categories</Button>
      <TextField
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => event.key === 'Enter' && onSearch()}
        placeholder="What are you looking for?"
        className="search-input"
        variant="standard"
        InputProps={{ disableUnderline: true }}
      />
      <Select value={category} onChange={(event) => setCategory(event.target.value)} className="category-select" IconComponent={ExpandMore} variant="standard" disableUnderline>
        <MenuItem value="All Categories">All Categories</MenuItem>
        <MenuItem value="Patio Furniture Sets">Patio Furniture Sets</MenuItem>
        <MenuItem value="Health & Wellness">Health &amp; Wellness</MenuItem>
      </Select>
      <Button className="search-button" onClick={onSearch} startIcon={<Search className="mobile-search-icon" />}>Search</Button>
    </Box>
  )
}

function CheckSection({ title, items, selected, setSelected, searchable = false, showCount = true }) {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? items : items.slice(0, 6)
  const toggle = (item) => setSelected(selected.includes(item) ? selected.filter((value) => value !== item) : [...selected, item])
  return (
    <Box className="filter-section">
      <Typography className="filter-title">{title}</Typography>
      {searchable && <TextField placeholder={`${title}...`} variant="standard" fullWidth className="filter-search" InputProps={{ disableUnderline: true, endAdornment: <Search sx={{ fontSize: 18, color: '#8b949c' }} /> }} />}
      <Stack spacing={0.1}>
        {shown.map((item) => <FormControlLabel key={item} className="check-row" control={<Checkbox checked={selected.includes(item)} onChange={() => toggle(item)} />} label={item} />)}
      </Stack>
      {items.length > 6 && <Button className="show-all" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show Less' : `Show All (${showCount ? items.length : ''})`}</Button>}
    </Box>
  )
}

function Filters({ values, setValues }) {
  return (
    <Paper className="filters-panel" elevation={0}>
      <Typography className="filter-title">Price</Typography>
      <Box className="price-inputs">
        <TextField value={values.price[0]} onChange={(e) => setValues({ ...values, price: [e.target.value, values.price[1]] })} variant="standard" InputProps={{ disableUnderline: true, endAdornment: <span>$</span> }} />
        <span>—</span>
        <TextField value={values.price[1]} onChange={(e) => setValues({ ...values, price: [values.price[0], e.target.value] })} variant="standard" InputProps={{ disableUnderline: true, endAdornment: <span>$</span> }} />
      </Box>
      <Slider value={values.price.map(Number)} min={0} max={6900} onChange={(_, value) => setValues({ ...values, price: value })} className="price-slider" />
      <Box className="filter-section moq-section">
        <Typography className="filter-title">MOQ</Typography>
        <TextField placeholder="Less than" variant="standard" fullWidth className="filter-search moq-input" InputProps={{ disableUnderline: true }} />
      </Box>
      <CheckSection title="Product Certification" items={productCertificates} selected={values.productCertificates} setSelected={(selected) => setValues({ ...values, productCertificates: selected })} searchable />
      <CheckSection title="Supplier Certification" items={supplierCertificates} selected={values.supplierCertificates} setSelected={(selected) => setValues({ ...values, supplierCertificates: selected })} searchable={false} showCount={false} />
      <CheckSection title="Supplier Location" items={locations} selected={values.locations} setSelected={(selected) => setValues({ ...values, locations: selected })} />
      <Box className="filter-section stock-section">
        <Typography className="filter-title">Stock Availability</Typography>
        <FormControlLabel className="check-row" control={<Checkbox checked={values.stock} onChange={(e) => setValues({ ...values, stock: e.target.checked })} />} label="Stock in USA" />
      </Box>
    </Paper>
  )
}

function PromoBanner() {
  return <Box className="promo-banner"><Typography>Placing bulk orders on BuyHive is safe &amp; easy.</Typography><Typography fontWeight={700}>Click to learn how it works!</Typography></Box>
}

function ProductCard({ product, list }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Box className={`product-card ${list ? 'list-product' : ''}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Box className="product-image-wrap"><Box component="img" src={product.image} alt="" className="product-image" /></Box>
      <Box className="product-details">
        <Typography className="product-name">{product.name}</Typography>
        <Typography className="product-moq">MOQ: {product.moq}</Typography>
        <Typography className="product-price">{product.price}</Typography>
        {hovered && <Button className="quick-view">Quick View</Button>}
      </Box>
    </Box>
  )
}

function SortControls({ view, setView }) {
  const [sort, setSort] = useState('Relevance')
  return (
    <Stack className="sort-controls" direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" spacing={2} alignItems="center" className="view-controls">
        <IconButton className={view === 'grid' ? 'selected-view' : ''} onClick={() => setView('grid')}><GridView /></IconButton>
        <IconButton className={view === 'list' ? 'selected-view' : ''} onClick={() => setView('list')}><List /></IconButton>
      </Stack>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Typography className="mobile-sort-label">Sort by:</Typography>
        <Select value={sort} onChange={(event) => setSort(event.target.value)} className="sort-select" variant="standard" disableUnderline IconComponent={ExpandMore}>
          {['Relevance', 'Latest', 'Price Low to High', 'Price High to Low', 'MOQ Low to High', 'Ratings High to Low'].map((item) => <MenuItem value={item} key={item}>{item}</MenuItem>)}
        </Select>
        <IconButton className="pagination-arrow"><ArrowBackIosNew /></IconButton><Chip label="1" className="page-chip" /><Typography>of 22</Typography><IconButton className="pagination-arrow"><ArrowForwardIos /></IconButton>
      </Stack>
    </Stack>
  )
}

function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [view, setView] = useState('grid')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [values, setValues] = useState({ price: [0, 6900], productCertificates: [], supplierCertificates: [], locations: [], stock: false })
  const visibleProducts = useMemo(() => query ? products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())) : products, [query])

  return (
    <Box className="app-page">
      <Container maxWidth={false} className="page-container">
        <Header onMenu={() => setMenuOpen(true)} />
        <SearchArea query={query} setQuery={setQuery} category={category} setCategory={setCategory} onSearch={() => {}} onCategories={() => setFiltersOpen(true)} />
        <Box className="mobile-category-button"><Button startIcon={<Apps />} onClick={() => setFiltersOpen(true)}>Categories</Button></Box>
        <Box className="results-heading"><Typography>Products</Typography><Typography component="span">(524 Products)</Typography></Box>
        <Button className="mobile-filter-button" onClick={() => setFiltersOpen(true)}>Show Filters</Button>
        <Box className="results-layout">
          <Box className="desktop-filters"><Filters values={values} setValues={setValues} /></Box>
          <Box className="results-content">
            <Typography className="buy-label">Buy</Typography>
            <PromoBanner />
            <SortControls view={view} setView={setView} />
            <Box className={`products-grid ${view === 'list' ? 'list-view' : ''}`}>
              {visibleProducts.map((product) => <ProductCard key={product.name} product={product} list={view === 'list'} />)}
            </Box>
          </Box>
        </Box>
      </Container>
      <Drawer anchor="left" open={filtersOpen} onClose={() => setFiltersOpen(false)} className="mobile-drawer"><Box className="drawer-content"><Stack direction="row" justifyContent="space-between" alignItems="center"><Typography className="drawer-title">Filters</Typography><IconButton onClick={() => setFiltersOpen(false)}><Close /></IconButton></Stack><Divider /><Filters values={values} setValues={setValues} /></Box></Drawer>
      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}><Box className="menu-drawer"><IconButton onClick={() => setMenuOpen(false)}><Close /></IconButton>{['Expert Sourcing', 'Contract Manufacturing', 'Buy', 'Financing', 'About Us'].map((item) => <Typography key={item} className={item === 'Buy' ? 'active-nav' : ''}>{item}</Typography>)}</Box></Drawer>
    </Box>
  )
}

export default App
