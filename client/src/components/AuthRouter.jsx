import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import api from '../api';
import Availability from '../pages/availabilities/Availability';
import Leaves from '../pages/leaves/Leaves';
import Bookings from '../pages/Bookings';
import Jobs from '../pages/Jobs';
import Browse from '../pages/Browse';
import AdminDashboard from '../pages/pcsAdmin/AdminDashboard';
import LeaveRequest from '../pages/pcsAdmin/LeaveRequest';
import NewAdmin from '../pages/pcsAdmin/NewAdmin';
import Performance from '../pages/performance/Performance';
import PetProfile from '../pages/pets/PetProfile';
import Pets from '../pages/pets/Pets';
import ProfileSettings from '../pages/profileSettings/ProfileSettings';
import UserProfile from '../pages/userProfiles/UserProfile';
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

  /* eslint-disable no-nested-ternary */
  const defaultHomePage = user.isAdmin
    ? '/pcs-admin/dashboard'
    : user.isPetOwner
    ? '/caretakers'
    : '/my-jobs'; // user is a caretaker
  /* eslint-enable no-nested-ternary */

  return (
    <StoreProvider value={{ user }}>
      <NavBar>
        <Switch>
          {/* Redirect to the respective home page for this category of users */}
          <Route exact path="/" render={() => <Redirect to={defaultHomePage} />} />

          <Route exact path="/my-leaves" component={Leaves} />
          <Route exact path="/my-availability" component={Availability} />
          <Route exact path="/my-pets" component={Pets} />
          <Route exact path="/my-performance" component={Performance} />
          {/* <Route exact path="/edit-profile" component={EditProfile} /> */}
          <Route exact path="/my-bookings" component={Bookings} />
          <Route exact path="/browse" component={Browse} />
          <Route exact path="/my-jobs" component={Jobs} />
          <Route path="/pet-owners/:petOwnerUsername/pets/:petName" component={PetProfile} />
          <Route path="/profile-settings" component={ProfileSettings} />
          <Route path="/profile/:username" component={UserProfile} />
          {user.isAdmin && <Route path="/pcs-admin/dashboard" component={AdminDashboard} />}
          {user.isAdmin && <Route path="/pcs-admin/leave-request" component={LeaveRequest} />}
          {user.isAdmin && <Route path="/admins/new" component={NewAdmin} />}
        </Switch>
      </NavBar>
    </StoreProvider>
  );
};

export default AuthRouter;
