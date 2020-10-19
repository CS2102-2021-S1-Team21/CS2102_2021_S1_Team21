import { Box, Typography } from '@material-ui/core';
import React from 'react';

const ProfileDetail = ({ iconType: Icon, title, data }) => {
  return (
    <>
      <Box display="inline-block" paddingRight={1}>
        {<Icon color="primary" fontSize="default" />}
      </Box>
      <Box display="inline-block">
        <Typography variant="caption">{title}</Typography>
        <Typography variant="body1">{data}</Typography>
      </Box>
    </>
  );
};

export default ProfileDetail;
