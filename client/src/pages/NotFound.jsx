import { Box, Container, Typography } from '@material-ui/core';
import React from 'react';

const NotFound = () => {
  return (
    <Box margin={4}>
      <Container>
        <Typography>{'Oops, the page you were looking for does not exist!'}</Typography>
        <br />
        <Typography>{'Is the URL spelt correctly?'}</Typography>
      </Container>
    </Box>
  );
};

export default NotFound;
