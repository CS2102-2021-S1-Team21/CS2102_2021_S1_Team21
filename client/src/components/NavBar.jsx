import { AppBar, Button, IconButton, makeStyles, Toolbar, Tooltip } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import api from '../api';
import { useStore } from '../utilities/store';
import PCSHomeButton from './PCSHomeButton';

const useStyles = makeStyles((theme) => ({
  buttonWithSpace: {
    margin: theme.spacing(1),
  },
  navItem: {
    margin: theme.spacing(1),
  },
  space: {
    flexGrow: 1,
  },
}));

const NavBar = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useStore();

  const handleLogout = async () => {
    const response = await api.auth.logout();
    console.log(response);
    history.push('/login');
  };

  if (!user) {
    return <Redirect path="/login" />;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <PCSHomeButton onClick={() => history.push('/')} />

          {/* TODO: handle mobile layout */}
          {user.isPetOwner && (
            <>
              <Button
                color="inherit"
                className={classes.navItem}
                onClick={() => history.push('/caretakers')}
              >
                {'Find Caretakers'}
              </Button>
              <Button
                color="inherit"
                className={classes.navItem}
                onClick={() => history.push('/my-pets')}
              >
                {'My Pets'}
              </Button>
              <Button
                color="inherit"
                className={classes.navItem}
                onClick={() => history.push('/my-bookings')}
              >
                {'My Bookings'}
              </Button>
            </>
          )}
          {(user.isFullTimeCaretaker || user.isPartTimeCaretaker) && (
            <Button
              color="inherit"
              className={classes.navItem}
              onClick={() => history.push('/my-jobs')}
            >
              {'My Jobs'}
            </Button>
          )}
          {user.isFullTimeCaretaker && (
            <Button
              color="inherit"
              className={classes.navItem}
              onClick={() => history.push('/my-leaves')}
            >
              {'My Leave Applications'}
            </Button>
          )}
          {user.isPartTimeCaretaker && (
            <Button
              color="inherit"
              className={classes.navItem}
              onClick={() => history.push('/my-availability')}
            >
              {'My Availability'}
            </Button>
          )}
          {user.isAdmin && (
            <>
              <Button
                color="inherit"
                className={classes.navItem}
                onClick={() => history.push('/pcs-admin/dashboard')}
              >
                {'Dashboard'}
              </Button>
              <Button
                color="inherit"
                className={classes.navItem}
                onClick={() => history.push('/pcs-admin/leave-request')}
              >
                {'Leave Application'}
              </Button>
              <Button
                color="inherit"
                className={classes.navItem}
                onClick={() => history.push('/admins/new')}
              >
                {'Manage Accounts'}
              </Button>
            </>
          )}

          <div className={classes.space} />
          <Tooltip title="Edit Account Settings" onClick={() => history.push('/profile-settings')}>
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          {!user.isAdmin && (
            <Tooltip
              title={`View Profile (${user.name})`}
              onClick={() => history.push(`/profile/${user.username}`)}
            >
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Log Out">
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default NavBar;
