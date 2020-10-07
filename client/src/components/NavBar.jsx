import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  name: {
    marginLeft: theme.spacing(2),
  },
}));

const NavBar = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();

  // note: temporary, for testing only
  const handleLogin = async () => {
    const response = await api.auth.login({ username: 'oompaloompa', password: 'password' });
    console.log(response);
    history.push('/pet-owner/hello@gmail.com');
  };

  const handleLogout = async () => {
    const response = await api.auth.logout();
    console.log(response);
    history.push('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title}>{'Pet Caring Services'}</Typography>
          <Button variant="contained" onClick={handleLogin}>
            {'Login'}
          </Button>
          <Button variant="contained" onClick={handleLogout}>
            {'Logout'}
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default NavBar;
