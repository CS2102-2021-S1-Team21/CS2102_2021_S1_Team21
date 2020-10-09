import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import AuthRouter from './AuthRouter';
import FormTest from '../lab/FormTest';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Non-authenticated routes */}
        <Route exact path="/test/forms" component={FormTest} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/forgot-password" component={ForgotPassword} /> */}
        {/* <Route exact path="/reset-password" component={ResetPassword} /> */}

        {/* All other routes are authenticated */}
        <Route component={AuthRouter} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
