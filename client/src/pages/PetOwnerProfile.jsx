import { Card, CardContent, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import api from '../api';

/** This is a dummy component for demo purposes. The actual one will look quite different. */
const PetOwnerProfile = (props) => {
  const { match } = props;
  const handle = match.params.email;
  const [petOwner, setPetOwner] = useState({ name: 'Bugs Bunny', email: 'hello@world.org' });

  useEffect(() => {
    api.petOwners.getPetOwner(handle).then((res) => {
      setPetOwner(res);
    });
  });

  return (
    <Card>
      <CardContent>
        <Typography>{'Pet Owner Profile'}</Typography>
        <Typography color="primary">{`Name: ${petOwner.name}`}</Typography>
        <Typography color="secondary">{`Email: ${petOwner.email}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default PetOwnerProfile;
