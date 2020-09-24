import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PetOwnerProfile from '../pages/PetOwnerProfile';

const AuthRouter = () => {
  // TODO: Check if user is authenticated
  // use cookie + express-session on backend
  const isAuthenticated = true;

  // If authentication fails, redirect to login
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  // Otherwise, go to the selected page
  return (
    <>
      <PetOwnerProfile />
      {/* TODO: debug this */}
      <Switch>
        <Route path="/pet-owner/:email" to={PetOwnerProfile} />
      </Switch>
    </>
  );
};

export default AuthRouter;
