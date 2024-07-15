/* eslint-disable react/prop-types */
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ value, handleChange, isOwner }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            '& .MuiTabs-indicator': {
              top: 0, // Indicator position set to top
            },
            '& .MuiTab-root': {
              color: '#ffffff', // Tab text color
            },
            '& .Mui-selected': {
              color: '#ffffff', // Selected tab text color
            },
          }}
        >
          {isOwner ? (
            <Tab label="My Videos" {...a11yProps(0)} />
          ) : (
            <Tab label="Videos" {...a11yProps(0)} />
          )}
          {isOwner && <Tab label="Recently Viewed" {...a11yProps(1)} />}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        My Videos
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Recently Viewed
      </CustomTabPanel>
    </Box>
  );
}
