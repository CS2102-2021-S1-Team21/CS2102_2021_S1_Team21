import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import api from '../api';

const EditProfile = () => {
  const [user, setUser] = useState({
    name: 'Bugs Bunny',
    email: 'hello@world.org',
    phonenumber: '999',
    address: 'nus',
    bio: ' i like carrots',
  });

  makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  useEffect(() => {
    api.caretakers.getCaretaker('asdfasdf@gmail.com').then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography>{'Edit My Profile'}</Typography>

        <form noValidate autoComplete="off">
          <TextField
            id="standard-multiline-flexible"
            label="Name"
            value={user.name}
            variant="outlined"
            disabled
            rowsMax={4}
          />
          <TextField
            id="standard-multiline-flexible"
            label="Email"
            value={user.email}
            variant="outlined"
            disabled
            rowsMax={4}
          />
          <div>
            <TextField
              id="standard-multiline-flexible"
              label="Contact"
              value={user.phonenumber}
              variant="outlined"
              multiline
              rowsMax={4}
            />
          </div>
          <div>
            <TextField
              id="standard-multiline-flexible"
              label="Address"
              value={user.address}
              variant="outlined"
              multiline
              rowsMax={4}
            />
          </div>
          <TextField
            id="standard-multiline-flexible"
            label="Bio"
            value={user.bio}
            variant="outlined"
            multiline
            rows={4}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default EditProfile;
