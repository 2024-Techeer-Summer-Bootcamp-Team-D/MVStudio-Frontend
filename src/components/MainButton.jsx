/* eslint-disable react/prop-types */
// src/components/StyledButton.jsx
import React from 'react';
import { Button } from '@mui/material';

const MainButton = ({ children }) => {
  return (
    <Button
      variant="contained"
      sx={{
        background: 'linear-gradient(45deg, #b75dfd 30%, #ffa9a9 90%)',
        borderRadius: '1rem',
        width: '20rem',
        height: '3rem',
        fontSize: '1rem',
        color: 'white',
        textTransform: 'none',
        marginTop: '1.5rem',
      }}
    >
      {children}
    </Button>
  );
};

export default MainButton;
