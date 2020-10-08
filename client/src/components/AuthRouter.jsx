import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import api from '../api';
import PetOwnerProfile from '../pages/PetOwnerProfile';
import { getSessionCookie } from '../utilities/sessionCookie';
import { StoreProvider } from '../utilities/store';
import Loading from './Loading';
import NavBar from './NavBar';
import Leaves from '../pages/leaves/Leaves';
import Availability from '../pages/availabilities/Availability';

const AuthRouter = () => {
  const sessionCookie = getSessionCookie();
  const [user, setUser] = useState(null);
  const [requestFailed, setRequestFailed] = useState(false);

  const getLoggedInUser = async () => {
    api.auth
      .getSessionInfo()
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => setRequestFailed(true));
  };

  // Determine whether a user is logged in or not by whether the session cookie exists
  // Assumption: session cookie is cleared properly upon logout
  // TODO: check whether cookie expiry works correctly
  if (!sessionCookie || requestFailed) {
    return <Redirect to="/login" />;
  }

  // If there's an existing session, make sure the user is loaded before showing the page
  // TODO: error handling
  if (!user) {
    getLoggedInUser();
    return <Loading />;
  }

  return (
    <StoreProvider value={{ user }}>
      <NavBar>
        <Switch>
          {/* <Route path="/pet-owner" component={PetOwnerListing} /> */}
          <Route path="/pet-owner/:email" component={PetOwnerProfile} />
          <Route exact path="/myleaves" component={Leaves} />
          <Route exact path="/myavailability" component={Availability} />
        </Switch>
      </NavBar>
    </StoreProvider>
  );
};

export default AuthRouter;
