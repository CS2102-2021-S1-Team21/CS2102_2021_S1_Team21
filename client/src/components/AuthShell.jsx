import { Button, Typography } from '@material-ui/core';
import React from 'react';

const AuthShell = () => {
  return (
    <div>
      <Typography variant="h1" color="textPrimary">
        {'AuthShell'}
      </Typography>
      <Typography>{"Eventually, we'll be putting the user authentication logic here."}</Typography>
      <Button onClick={() => alert('Hello!')} variant="outlined" color="primary">
        {'Say hi!'}
      </Button>
    </div>
  );
};

export default AuthShell;
