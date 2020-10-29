import { Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person';
import PetsIcon from '@material-ui/icons/Pets';
import PhoneIcon from '@material-ui/icons/Phone';
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../api';
import Loading from '../../components/Loading';
import ProfileDetail from '../../components/ProfileDetail';
import { useSnackbarContext } from '../../utilities/snackbar';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    padding: theme.spacing(2, 0),
  },
}));

const PetProfile = ({ match }) => {
  const classes = useStyles();
  const showSnackbar = useSnackbarContext();

  const [pet, setPet] = useState(null);
  const [petOwner, setPetOwner] = useState(null);

  const { petOwnerUsername, petName } = match.params;

  const updateData = useCallback(() => {
    showSnackbar(api.pets.getPet(petOwnerUsername, petName))
      .then((response) => {
        console.log(response);
        setPet(response);
      })
      .catch(console.error);
    showSnackbar(api.petOwners.getPetOwner(petOwnerUsername))
      .then((response) => {
        console.log(response);
        setPetOwner(response);
      })
      .catch(console.error);
  }, [petOwnerUsername, petName, showSnackbar]);

  useEffect(updateData, [updateData]);

  return (
    <Container>
      {!pet || !petOwner ? (
        <Loading />
      ) : (
        <>
          <Typography component="h1" variant="h2" className={classes.title}>
            {`Hello! My name is ${pet.name}.`}
          </Typography>

          <Paper className={classes.paper}>
            <Typography component="h2" variant="h5" gutterBottom>
              {'About My Owner'}
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} md={4}>
                <ProfileDetail iconType={PersonIcon} title="Name" data={petOwner.name} />
              </Grid>
              <Grid item xs={12} md={3}>
                <ProfileDetail
                  iconType={PhoneIcon}
                  title="Contact Number"
                  data={petOwner.phonenumber || '-'}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <ProfileDetail iconType={EmailIcon} title="Email" data={petOwner.email || '-'} />
              </Grid>
              <Grid item xs={12}>
                <ProfileDetail iconType={HomeIcon} title="Address" data={petOwner.address || '-'} />
              </Grid>
              <Grid item xs={12}>
                <ProfileDetail
                  iconType={AccountBoxIcon}
                  title="Bio"
                  data={petOwner.bio || 'Oops, looks like my owner forgot to write a bio...'}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper className={classes.paper}>
            <Typography component="h2" variant="h5" gutterBottom>
              {'About Me'}
            </Typography>
            <Grid container>
              <Grid item md={3}>
                <ProfileDetail iconType={PetsIcon} title="Category" data={pet.categoryname} />
              </Grid>
              <Grid item md={3}>
                <ProfileDetail iconType={PetsIcon} title="Breed" data={pet.breed} />
              </Grid>
              <Grid item md={3}>
                <ProfileDetail iconType={PetsIcon} title="Gender" data={pet.gender} />
              </Grid>
              <Grid item md={3}>
                <ProfileDetail
                  iconType={PetsIcon}
                  title="Age"
                  data={`${pet.age.years} years old`}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper className={classes.paper}>
            <Typography component="h2" variant="h5" gutterBottom>
              {'Looking After Me'}
            </Typography>
            <Grid container direction="column" spacing={2}>
              {pet.requirements.length === 0 ? (
                <Grid item>{"Nothing! It's easy"}</Grid>
              ) : (
                pet.requirements.map((requirement) => (
                  <Grid item key={requirement.requirementtype}>
                    <ProfileDetail
                      iconType={InfoIcon}
                      title={requirement.requirementtype}
                      data={requirement.description}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default PetProfile;
