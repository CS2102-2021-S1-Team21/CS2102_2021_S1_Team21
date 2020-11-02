import { AppBar, Button, Container, makeStyles, Toolbar } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import PCSHomeButton from './PCSHomeButton';

const useStyles = makeStyles((theme) => ({
  buttonWithSpace: {
    margin: theme.spacing(1),
  },
  container: {
    margin: theme.spacing(4, 2),
  },
  navItem: {
    margin: theme.spacing(1),
  },
  space: {
    flexGrow: 1,
  },
}));

const NoAuthAppShell = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <PCSHomeButton onClick={() => history.push('/')} />

          <div className={classes.space} />
          <Button
            variant="outlined"
            color="inherit"
            className={classes.buttonWithSpace}
            onClick={() => history.push('/register')}
          >
            {'Sign Up'}
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            className={classes.buttonWithSpace}
            onClick={() => history.push('/login')}
          >
            {'Login'}
          </Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>{children}</Container>
    </>
  );
};

export default NoAuthAppShell;
