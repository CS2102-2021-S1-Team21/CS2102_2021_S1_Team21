import { Box, CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
    textAlign: 'center',
  },
}));

/** Circular progress indicator to be displayed while data is being fetched. */
const Loading = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress size={30} />
    </Box>
  );
};

export default Loading;
