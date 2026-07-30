import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { ExpandMore, Menu, Person, ShoppingCartOutlined } from '@mui/icons-material'
import { Logo } from '../../common/Logo'

interface HeaderProps { onMenu: () => void }

export function Header({ onMenu }: HeaderProps) {
  return <AppBar position="static" elevation={0} color="transparent" component="header"><Toolbar disableGutters className="header-toolbar">
    <Logo />
    <Stack className="desktop-nav" direction="row" spacing={5.2} sx={{ alignItems: 'center' }}><Typography>Expert Sourcing</Typography><Typography>Contract Manufacturing</Typography><Typography className="active-nav">Buy</Typography><Typography>Financing</Typography><Typography>About Us <ExpandMore sx={{ fontSize: 16, verticalAlign: 'middle', color: '#9b9b9b' }} /></Typography></Stack>
    <Stack direction="row" spacing={1.1} sx={{ ml: 'auto', alignItems: 'center' }}><Button className="register-button">Register</Button><Button className="signin-button" startIcon={<Person />}>Sign In</Button><IconButton className="cart-button"><ShoppingCartOutlined /><Box className="cart-badge">0</Box></IconButton><IconButton className="mobile-menu" onClick={onMenu}><Menu /></IconButton></Stack>
  </Toolbar></AppBar>
}
