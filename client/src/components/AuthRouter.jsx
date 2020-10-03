import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PetOwnerProfile from '../pages/PetOwnerProfile';
import CaretakerProfile from '../pages/CaretakerProfile';

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
    <Switch>
      {/* <Route path="/pet-owner" component={PetOwnerListing} /> */}
      <Route exact path="/pet-owner/:email" component={PetOwnerProfile} />
      <Route exact path="/caretakers/:email" component={CaretakerProfile} />
    </Switch>
  );
};

export default AuthRouter;
