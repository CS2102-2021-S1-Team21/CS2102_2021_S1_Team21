import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Snackbar,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../api';
import Alert from '../../components/Alert';
import { getYear } from '../../utilities/datetime';
import { useStore } from '../../utilities/store';
import PetFormDialog from './PetFormDialog';

const DEFAULT_PET = {
  name: '',
  breed: '',
  requirements: [],
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.getContrastText(theme.palette.secondary.dark),
    backgroundColor: theme.palette.secondary.dark,
  },
  editButton: {
    color: theme.palette.primary.light, // TODO: change this colour
  },
}));

const Pets = () => {
  const classes = useStyles();
  const store = useStore();

  const [petCategories, setPetCategories] = useState([]);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  // TODO: move snackbar state management into App or AppRouter
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState({ message: '', severity: '' });

  const { username: petOwnerUsername } = store.user;

  const handleResponseError = (promise) =>
    promise.then((response) => {
      if (response.error) {
        setSnackbarContent({ message: response.error, severity: 'error' });
        setSnackbarOpen(true);
        throw Error(response.error);
      }
      return response;
    });

  const updatePets = useCallback(() => {
    handleResponseError(api.pets.getPets(petOwnerUsername))
      .then((response) => {
        setPets(response.rows);
      })
      .catch(console.error);
  }, [petOwnerUsername]);

  useEffect(updatePets, [updatePets]);
  useEffect(() => {
    api.petCategories.getPetCategories().then((response) => setPetCategories(response.rows));
  }, []);

  const handleClickAdd = () => {
    setSelectedPet('default'); // Note: this is a bit hacky
  };

  const handleClickDelete = (petName) => {
    // TODO: make a prettier dialog
    // eslint-disable-next-line
    if (!confirm(`Are you sure you want to delete ${petName}?`)) return;
    handleResponseError(api.pets.deletePet(petOwnerUsername, petName))
      .then(updatePets)
      .catch(console.error);
  };

  const handleSubmitEdit = async (originalPetName, updatedPet) => {
    handleResponseError(api.pets.editPet(petOwnerUsername, originalPetName, updatedPet))
      .then(() => {
        updatePets();
        setSelectedPet(null);
      })
      .catch(console.error);
  };

  const handleSubmitAdd = async (originalPetName, newPet) => {
    handleResponseError(api.pets.addPet({ ...newPet, petOwnerUsername }))
      .then(() => {
        updatePets();
        setSelectedPet(null);
      })
      .catch(console.error);
  };

  const handleDialogClose = () => setSelectedPet(null);
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Box mb={2}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography component="h1" variant="h4">
                  {'My Pets'}
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleClickAdd}>
                  {'Add Pet'}
                </Button>
              </Grid>
            </Grid>
          </Box>

          {pets.map((pet) => (
            <Card key={pet.name}>
              <CardHeader
                avatar={<Avatar className={classes.avatar}>{pet.name[0]}</Avatar>}
                title={pet.name}
                action={[
                  <IconButton
                    key="edit"
                    className={classes.editButton}
                    onClick={() => {
                      setSelectedPet(pet);
                    }}
                  >
                    <EditIcon />
                  </IconButton>,
                  <IconButton
                    key="delete"
                    color="secondary"
                    onClick={() => handleClickDelete(pet.name)}
                  >
                    <DeleteIcon />
                  </IconButton>,
                ]}
              />
              <CardContent>
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <Typography color="primary">{'Profile Info'}</Typography>
                    <Typography>{pet.categoryname}</Typography>
                    <Typography>{pet.breed}</Typography>
                    <Typography>{pet.gender}</Typography>
                    <Typography gutterBottom>
                      {`Year of Birth: ${getYear(pet.yearofbirth)}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography color="primary">{'Special Requirements'}</Typography>
                    {pet.requirements.length === 0 ? (
                      <Typography>{'None'}</Typography>
                    ) : (
                      pet.requirements.map((requirement) => (
                        <Typography>{`${requirement.requirementtype} – ${requirement.description}`}</Typography>
                      ))
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={10_000}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbarContent.severity} onClose={handleSnackbarClose}>
          {snackbarContent.message}
        </Alert>
      </Snackbar>
      <PetFormDialog
        title={selectedPet === 'default' ? 'New Pet' : 'Edit Pet'}
        pet={selectedPet === 'default' ? DEFAULT_PET : selectedPet}
        petCategories={petCategories}
        onClose={handleDialogClose}
        handleSubmit={selectedPet === 'default' ? handleSubmitAdd : handleSubmitEdit}
      />
    </Container>
  );
};

export default Pets;
