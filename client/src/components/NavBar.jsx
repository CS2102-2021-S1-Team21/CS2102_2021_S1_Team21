import { AppBar, Button, IconButton, makeStyles, Toolbar, Tooltip } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PetsIcon from '@material-ui/icons/Pets';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';
import { useStore } from '../utilities/store';

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
  title: {
    marginRight: theme.spacing(2),
  },
}));

const NavBar = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useStore();

  const handleLogin = async () => {
    // note: temporary, for testing only
    const accountType = prompt(
      'Which type of user do you want to log in as?\n\n1 - Admin\n2 - Pet Owner\n3 - Full-Time Caretaker\n4 - Part-Time Caretaker\n5 - Pet Owner + Full-Time + Part-Time Caretaker (invalid option, but just for demo purposes)',
    );
    const username = ((type) => {
      switch (type) {
        case '1':
          return 'pcsadmin';
        case '2':
          return 'ladygaga';
        case '3':
          return 'harambe';
        case '4':
          return 'dora';
        case '5':
          return 'oompaloompa';
        default:
          return null;
      }
    })(accountType);
    if (!username) return;
    const response = await api.auth.login({
      username,
      password: accountType === '1' ? 'pcsadmin' : 'password',
    });
    console.log(response);
    history.push('/');
    // to change to this eventually
    // history.push('/login');
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
          <Button
            startIcon={<PetsIcon />}
            color="inherit"
            size="large"
            className={classes.title}
            onClick={() => (user ? history.push('/dashboard') : history.push('/'))}
          >
            {'PCS'}
          </Button>

          {user ? (
            <>
              {/* TODO: handle mobile layout */}
              {user.isPetOwner && (
                <>
                  <Button
                    color="inherit"
                    className={classes.navItem}
                    onClick={() => history.push('/browse')}
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
                <Button
                  color="inherit"
                  className={classes.navItem}
                  onClick={() => history.push('/pcs-admin/leave-request')}
                >
                  {'Leave Application'}
                </Button>
              )}

              <div className={classes.space} />
              <Tooltip
                title="Edit Account Settings"
                onClick={() => history.push('/profile-settings')}
              >
                <IconButton color="inherit">
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={`View Profile (${user.name})`}
                // TODO: does this mean that pet owners need a profile too?
                onClick={() => history.push(`/profile/${user.username}`)}
              >
                <IconButton color="inherit">
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Log Out">
                <IconButton color="inherit" onClick={handleLogout}>
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <div className={classes.space} />
              <Button
                variant="outlined"
                color="inherit"
                className={classes.buttonWithSpace}
                onClick={() => history.push('/signup')}
              >
                {'Sign Up'}
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                className={classes.buttonWithSpace}
                onClick={handleLogin}
              >
                {'Login'}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default NavBar;
