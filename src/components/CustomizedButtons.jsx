/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
// import EditIcon from '@mui/icons-material/Edit';

// Use TypeScript generics only if needed for type safety.
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[1200],
  '&:hover': {
    backgroundColor: purple[1000],
  },
}));

export default function CustomizedButtons({ onClick }) {
  return (
    <Stack spacing={7} direction="row" onClick={onClick}>
      <ColorButton variant="contained">
        {/* <EditIcon fontSize="small" /> */}
        Edit
      </ColorButton>
    </Stack>
  );
}
