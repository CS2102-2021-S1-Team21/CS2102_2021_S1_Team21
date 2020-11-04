import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FormTest from '../lab/FormTest';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import AuthRouter from './AuthRouter';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    position: 'relative',
  },
  content: {
    // TODO: make this mobile responsive
    paddingBottom: '60px', // height of footer
  },
  footer: {
    position: 'absolute', // relative to the container
    bottom: 0,
    width: '100%',
    height: '60px',
  }
}))

const AppRouter = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <BrowserRouter>
          <Switch>
            {/* Non-authenticated routes */}
            <Route exact path="/test/forms" component={FormTest} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Registration} />
            {/* <Route exact path="/forgot-password" component={ForgotPassword} /> */}
            {/* <Route exact path="/reset-password" component={ResetPassword} /> */}

            {/* All other routes are authenticated */}
            <Route component={AuthRouter} />
          </Switch>
        </BrowserRouter>
      </div>
      <Paper elevation={10} className={classes.footer}>
        <Footer />
      </Paper>
    </div>
  );
};

export default AppRouter;
