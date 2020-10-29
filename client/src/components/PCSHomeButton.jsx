import { Box, Button } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import React from 'react';

const PCSHomeButton = (props) => (
  <Box mr={2}>
    <Button startIcon={<PetsIcon />} color="inherit" size="large" {...props}>
      {'PCS'}
    </Button>
  </Box>
);

export default PCSHomeButton;
