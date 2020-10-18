import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import api from '../api';
import Availability from '../pages/availabilities/Availability';
import CaretakerProfile from '../pages/CaretakerProfile';
import EditProfile from '../pages/EditProfile';
import Leaves from '../pages/leaves/Leaves';
import PetOwnerProfile from '../pages/PetOwnerProfile';
import Bookings from '../pages/Bookings';
import { getSessionCookie } from '../utilities/sessionCookie';
import { StoreProvider } from '../utilities/store';
import Loading from './Loading';
import NavBar from './NavBar';
import PcsAdmin from '../pages/pcsAdmin/PcsAdmin';

const AuthRouter = () => {
  const sessionCookie = getSessionCookie();
  const [user, setUser] = useState(null);
  const [requestFailed, setRequestFailed] = useState(false);

  const getLoggedInUser = async () => {
    api.auth
      .getSessionInfo()
      .then((response) => {
        setUser(response);
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
          <Route exact path="/my-leaves" component={Leaves} />
          <Route exact path="/my-availability" component={Availability} />
          <Route exact path="/edit-profile" component={EditProfile} />
          <Route exact path="/my-bookings" component={Bookings} />
          <Route path="/pet-owners/:username" component={PetOwnerProfile} />
          <Route path="/caretakers/:username" component={CaretakerProfile} />
          <Route path="/pcs-admin" component={PcsAdmin} />
        </Switch>
      </NavBar>
    </StoreProvider>
  );
};

export default AuthRouter;
