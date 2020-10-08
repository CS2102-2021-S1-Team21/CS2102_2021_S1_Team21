import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Chip, Box, CardContent, Container, Typography } from '@material-ui/core';
import api from '../api';
import ReviewsSection from '../lab/ReviewsSection';

/** This is a dummy component for demo purposes. The actual one will look quite different. */
const CaretakerProfile = (props) => {
  const { match } = props;
  const handle = match.params.username;
  const [caretaker, setCaretaker] = useState({});
  const [services, setServices] = useState([]);

  makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const fetchCaretaker = async () => {
    api.caretakers.getCaretaker(handle).then((res) => {
      setCaretaker(res);
    });
  };

  function fetchServices() {
    return [
      { name: 'grooming', petCategory: 'dog' },
      { name: 'grooming', petCategory: 'cat' },
      { name: 'walk', petCategory: 'dog' },
    ];
  }

  useEffect(() => {
    fetchCaretaker();
    setServices(
      fetchServices().map((s) => {
        if (!s.message) {
          s.message = `${s.name} for ${s.petCategory}`; // eslint-disable-line no-param-reassign
        }
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
            <Typography variant="h4">{`${caretaker.name}`}</Typography>
          </Box>
          <Typography variant="h6">{'About'}</Typography>
          <Typography paragraph>{`${caretaker.bio}`}</Typography>

          <Typography variant="h6">{'Address'}</Typography>
          <Typography paragraph>{`${caretaker.address}`}</Typography>

          <Typography variant="h6">{'Email'}</Typography>
          <Typography paragraph>{`${caretaker.email}`}</Typography>

          <Typography variant="h6">{'Services I offer'}</Typography>
          <Box mt={1}>{services}</Box>
          <ReviewsSection handle={handle} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default CaretakerProfile;
