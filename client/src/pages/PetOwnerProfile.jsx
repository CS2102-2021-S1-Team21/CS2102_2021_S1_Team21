import { Card, CardActions, Button, CardContent, Typography } from '@material-ui/core';
import React, { useEffect, useState, useCallback } from 'react';
import api from '../api';

const PetOwnerProfile = (props) => {
  const { match } = props;
  const handle = match.params.username;
  const [petOwner, setPetOwner] = useState({
    name: 'Bugs Bunny',
    username: 'bugss',
    email: 'hello@world.org',
  });

  const fetchPetOwner = useCallback(async () => {
    api.petOwners.getPetOwner(handle).then((res) => {
      setPetOwner(res);
    });
  }, [handle]);

  useEffect(() => {
    fetchPetOwner();
  }, [fetchPetOwner]);

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
