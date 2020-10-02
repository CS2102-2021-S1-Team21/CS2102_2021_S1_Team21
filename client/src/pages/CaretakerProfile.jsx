import React, { useEffect, useState } from 'react';
import api from '../api';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

/** This is a dummy component for demo purposes. The actual one will look quite different. */
const CaretakerProfile = () => {
  const [caretaker, setCaretaker] = useState({ name: 'Bugs Bunny', email: 'hello@world.org', phonenumber: '999', address: 'nus', bio:' i like carrots' });

  makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  useEffect(() => {
    api.caretakers.getCaretaker('asdfasdf@gmail.com').then((res) => {
      setCaretaker(res);
    });
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography>{'Pet Owner Profile'}</Typography>
        <Typography color="primary">{`Name: ${caretaker.name}`}</Typography>
        <Typography color="secondary">{`Email: ${caretaker.email}`}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          // onClick={() => {
          //   api.petOwners
          //     .updateOwner(owner)
          //     .then((res) => setPetOwner(res))
          //     .catch((err) => console.err(err));
          // }}
        >
          {'Confirm'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CaretakerProfile;
