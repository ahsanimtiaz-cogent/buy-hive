import { Box, Stack, Typography } from '@mui/material'

export function Logo() {
  return <Stack direction="row" spacing={1.2} sx={{ minWidth: 194, alignItems: 'center' }}>
    <Box className="hive-mark" aria-hidden="true"><Box className="hive-cell cell-a" /><Box className="hive-cell cell-b" /><Box className="hive-cell cell-c" /></Box>
    <Box><Typography className="logo-word">buyhive</Typography><Typography className="logo-tagline">sourcing made easy</Typography></Box>
  </Stack>
}
