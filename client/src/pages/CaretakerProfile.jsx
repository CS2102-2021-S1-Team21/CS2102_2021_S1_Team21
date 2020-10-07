import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Chip, Box, CardContent, Container, Typography } from '@material-ui/core';
import api from '../api';
import ReviewsSection from '../lab/ReviewsSection';

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
    //
  });
  const [services, setServices] = useState([]);

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
    function getServices() {
      return [
        { name: 'grooming', petCategory: 'dog' },
        { name: 'grooming', petCategory: 'cat' },
        { name: 'walk', petCategory: 'dog' },
      ];
    }
    setServices(
      getServices().map((s) => {
        s.message = s.name + ' for ' + s.petCategory;
        return (
          <Box component="span" mr={1}>
            <Chip label={s.message} />
          </Box>
        );
      }),
    );
  }, [handle]);

  return (
    <Container>
      <Card>
        <CardContent>
          <Box mb={3}>
            <Typography style={{ color: 'red' }} variant="h4">{`${caretaker.name}`}</Typography>
          </Box>
          <Typography variant="h6">{'About'}</Typography>
          <Typography paragraph>{`${caretaker.bio}`}</Typography>

          <Typography variant="h6">{'Address'}</Typography>
          <Typography paragraph>{`${caretaker.address}`}</Typography>

          <Typography variant="h6">{'Email'}</Typography>
          <Typography paragraph>{`${caretaker.email}`}</Typography>

          <Typography variant="h6">{'Services I offer'}</Typography>
          <Box mt={1}>{services}</Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CaretakerProfile;
