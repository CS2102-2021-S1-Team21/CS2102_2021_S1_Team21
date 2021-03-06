import { Typography } from '@material-ui/core';
import React from 'react';

const SecondaryInfo = ({label, content}) => {
  return (
    <>
      <Typography component="span" variant="body2" color="textPrimary">
        {label}
      </Typography>
      {content}
    </>
  )
}

export default SecondaryInfo;
