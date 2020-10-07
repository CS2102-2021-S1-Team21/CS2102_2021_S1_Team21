import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import api from '../api';

/** This is a dummy component for demo purposes. The actual one will look quite different. */
const PetOwnerProfile = () => {
  const [petOwner, setPetOwner] = useState({ name: 'Bugs Bunny', email: 'hello@world.org' });

  const fetchPetOwner = async () => {
    api.petOwners.getPetOwner('notaphoenix@gmail.com').then((res) => {
      setPetOwner(res);
    });
  };

  useEffect(() => {
    fetchPetOwner();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography>{'Pet Owner Profile'}</Typography>
        <Typography color="primary">{`Name: ${petOwner.name}`}</Typography>
        <Typography color="secondary">{`Email: ${petOwner.email}`}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={() => {
            fetchPetOwner();
            // api.petOwners
            //   .updateOwner(owner)
            //   .then((res) => setPetOwner(res))
            //   .catch((err) => console.err(err));
          }}
        >
          {'Confirm'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default PetOwnerProfile;
