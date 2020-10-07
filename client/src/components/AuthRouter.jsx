import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import api from '../api';
import Loading from './Loading';
import PetOwnerProfile from '../pages/PetOwnerProfile';
import { getSessionCookie } from '../utilities/sessionCookie';
import NavBar from './NavBar';

const AuthRouter = () => {
  // Determine whether a user is logged in or not by whether the session cookie is set
  // Assumption: session cookie is cleared properly upon logout
  // TODO: check whether cookie expiry works correctly
  const session = getSessionCookie();

  if (!session) {
    return <Redirect to="/login" />;
  }

  return (
    <NavBar>
      <Switch>
        {/* <Route path="/pet-owner" component={PetOwnerListing} /> */}
        <Route path="/pet-owner/:email" component={PetOwnerProfile} />
      </Switch>
    </NavBar>
  );
};

export default AuthRouter;
