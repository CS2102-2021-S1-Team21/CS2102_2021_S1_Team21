import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FormTest from '../lab/FormTest';
import HelloWorld from '../lab/HelloWorld';
import AuthRouter from './AuthRouter';
import Leaves from '../pages/leaves/Leaves';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Lab components */}
        <Route exact path="/hello-world" component={HelloWorld} />
        <Route exact path="/test/forms" component={FormTest} />
        <Route exact path="/myleaves" component={Leaves} />

        {/* Non-authenticated routes */}
        {/* <Route exact path="/login" component={Login} /> */}
        {/* <Route exact path="/forgot-password" component={ForgotPassword} /> */}
        {/* <Route exact path="/reset-password" component={ResetPassword} /> */}

        {/* All other routes are authenticated */}
        <Route component={AuthRouter} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
