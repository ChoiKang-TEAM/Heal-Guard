import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Box, Tabs, Tab } from '@mui/material'

const Header = () => {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: any, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <AppBar position="static" style={{ background: '#333' }}>
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <Typography variant="h6">My Awesome App</Typography>
        </Box>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
        </Tabs>
      </Toolbar>
    </AppBar>
  )
}

export default Header
