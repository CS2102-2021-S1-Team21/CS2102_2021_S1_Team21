import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import api from '../api';
import Availability from '../pages/availabilities/Availability';
import CaretakerProfile from '../pages/CaretakerProfile';
import EditProfile from '../pages/EditProfile';
import Leaves from '../pages/leaves/Leaves';
import LeaveRequest from '../pages/pcsAdmin/LeaveRequest';
import PetOwnerProfile from '../pages/PetOwnerProfile';
import PetProfile from '../pages/pets/PetProfile';
import Pets from '../pages/pets/Pets';
import { getSessionCookie } from '../utilities/sessionCookie';
import { StoreProvider } from '../utilities/store';
import Loading from './Loading';
import NavBar from './NavBar';

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
          <Route exact path="/my-pets" component={Pets} />
          <Route exact path="/edit-profile" component={EditProfile} />
          <Route path="/pet-owners/:petOwnerUsername/pets/:petName" component={PetProfile} />
          <Route path="/pet-owners/:username" component={PetOwnerProfile} />
          <Route path="/caretakers/:username" component={CaretakerProfile} />
          <Route path="/pcs-admin/leave-request" component={LeaveRequest} />
        </Switch>
      </NavBar>
    </StoreProvider>
  );
};

export default AuthRouter;
