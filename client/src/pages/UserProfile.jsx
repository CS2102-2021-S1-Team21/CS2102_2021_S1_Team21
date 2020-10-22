import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Box, CardContent, Container, Typography } from '@material-ui/core';
import api from '../api';
import CaretakerSection from './CaretakerSection';

const UserProfile = (props) => {
  const { match } = props;
  const handle = match.params.username;
  const [user, setUser] = useState({});

  makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  useEffect(() => {
    api.profiles.getProfile(handle).then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <Container>
      <Card>
        <CardContent>
          <Box mb={3}>
            <Typography variant="h4">{`${user.name}`}</Typography>
          </Box>
          <Typography variant="h6">{'About'}</Typography>
          <Typography paragraph>{`${user.bio}`}</Typography>

          <Typography variant="h6">{'Address'}</Typography>
          <Typography paragraph>{`${user.address}`}</Typography>

          <Typography variant="h6">{'Email'}</Typography>
          <Typography paragraph>{`${user.email}`}</Typography>

          {user.iscaretaker && <CaretakerSection handle={handle} />}
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;
