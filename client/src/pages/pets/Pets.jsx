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
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../api';
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

  const { username: petOwnerUsername } = store.user;

  const updatePets = useCallback(() => {
    api.pets.getPets(petOwnerUsername).then((response) => {
      setPets(response.rows);
    });
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
    api.pets.deletePet(petOwnerUsername, petName).then(updatePets);
  };

  const handleSubmitEdit = async (originalPetName, updatedPet) => {
    api.pets
      .editPet(petOwnerUsername, originalPetName, updatedPet)
      .then(() => {
        updatePets();
        setSelectedPet(null);
      })
      .catch((err) => {
        // TODO: error handling
        console.error(err);
      });
  };

  const handleSubmitAdd = async (originalPetName, newPet) => {
    api.pets
      .addPet({ ...newPet, petOwnerUsername })
      .then(() => {
        updatePets();
        setSelectedPet(null);
      })
      .catch((err) => {
        // TODO: error handling
        console.error(err);
      });
  };

  const handleDialogClose = () => setSelectedPet(null);

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
