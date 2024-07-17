/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

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

const StyledTabs = styled(Tabs)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '0.1rem', // Adjust height as needed
    background: '#a4a4a4',
  },
}));

export default function BasicTabs({ value, handleChange, isOwner }) {
  return (
    <Box sx={{ width: '100%', overflow: 'visible' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            '& .MuiTabs-indicator': {
              top: '-0.1rem', // Adjust to overlap the border
              zIndex: 99, // Ensure the indicator is above the border
              height: '0.2rem', // Adjust the height as needed
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
        </StyledTabs>
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
