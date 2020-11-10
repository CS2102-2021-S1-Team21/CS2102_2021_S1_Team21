import { Box, Card, CardContent, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import api from '../../api';
import Loading from '../../components/Loading';
import { useSnackbarContext } from '../../utilities/snackbar';
import NotFound from '../NotFound';
import CaretakerSection from './CaretakerSection';

const UserProfile = (props) => {
  const { match } = props;
  const handle = match.params.username;
  const showSnackbar = useSnackbarContext();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  useEffect(() => {
    showSnackbar(api.userProfiles.getUserProfile(handle))
      .then((res) => {
        setUser(res);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [handle]);

  if (isLoading) return <Loading />;
  if (!user) return <NotFound />;

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
          
          <Typography variant="h6">{'Phone Number'}</Typography>
          <Typography paragraph>{`${user.phonenumber}`}</Typography>

          <Typography variant="h6">{'Email'}</Typography>
          <Typography paragraph>{`${user.email}`}</Typography>

          {user.iscaretaker && <CaretakerSection handle={handle} />}
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;
