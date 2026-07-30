import { ArrowBackIosNew, ArrowForwardIos, ExpandMore, GridView, List } from '@mui/icons-material'
import { Chip, IconButton, MenuItem, Select, Stack, Typography } from '@mui/material'
import { useState } from 'react'

interface SearchToolbarProps { view: 'grid' | 'list'; onViewChange: (view: 'grid' | 'list') => void }

export function SearchToolbar({ view, onViewChange }: SearchToolbarProps) {
  const [sort, setSort] = useState('Relevance')
  return <Stack className="sort-controls" direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}><Stack direction="row" spacing={2} sx={{ alignItems: 'center' }} className="view-controls"><IconButton className={view === 'grid' ? 'selected-view' : ''} onClick={() => onViewChange('grid')}><GridView /></IconButton><IconButton className={view === 'list' ? 'selected-view' : ''} onClick={() => onViewChange('list')}><List /></IconButton></Stack><Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}><Typography className="mobile-sort-label">Sort by:</Typography><Select value={sort} onChange={(event) => setSort(event.target.value)} className="sort-select" variant="standard" disableUnderline IconComponent={ExpandMore}>{['Relevance', 'Latest', 'Price Low to High', 'Price High to Low', 'MOQ Low to High', 'Ratings High to Low'].map((item) => <MenuItem value={item} key={item}>{item}</MenuItem>)}</Select><IconButton className="pagination-arrow"><ArrowBackIosNew /></IconButton><Chip label="1" className="page-chip" /><Typography>of 22</Typography><IconButton className="pagination-arrow"><ArrowForwardIos /></IconButton></Stack></Stack>
}
