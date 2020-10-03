import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import api from '../api';

/** This is a dummy component for demo purposes. The actual one will look quite different. */
const CaretakerProfile = (props) => {
  const { match } = props;
  const handle = match.params.email;
  const [caretaker, setCaretaker] = useState({
    // name: 'Bugs Bunny',
    // email: 'hello@world.org',
    // phonenumber: '999',
    // address: 'nus',
    // bio: ' i like carrots',
  });

  makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  useEffect(() => {
    api.caretakers.getCaretaker(handle).then((res) => {
      setCaretaker(res);
    });
  });

  return (
    <Card>
      <CardContent>
        <Typography>{'Caretaker Profile'}</Typography>
        <Typography color="primary">{`Name: ${caretaker.name}`}</Typography>
        <Typography color="secondary">{`Email: ${caretaker.email}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default CaretakerProfile;
