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
import EditPetDialog from './EditPetDialog';

const DEFAULT_PET = {
  name: '',
  breed: '',
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.getContrastText(theme.palette.secondary.dark),
    backgroundColor: theme.palette.secondary.dark,
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
      console.log(response.rows);
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
    api.pets.editPet(petOwnerUsername, originalPetName, updatedPet).then(() => {
      updatePets();
      setSelectedPet(null);
    });
  };

  const handleSubmitAdd = async (originalPetName, newPet) => {
    api.pets.addPet({ ...newPet, petOwnerUsername }).then(() => {
      updatePets();
      setSelectedPet(null);
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
                <Button variant="outlined" onClick={handleClickAdd}>
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
                    onClick={() => {
                      setSelectedPet(pet);
                    }}
                  >
                    <EditIcon />
                  </IconButton>,
                  <IconButton key="delete" onClick={() => handleClickDelete(pet.name)}>
                    <DeleteIcon />
                  </IconButton>,
                ]}
              />
              <CardContent>
                <Typography>{pet.categoryname}</Typography>
                <Typography>{pet.breed}</Typography>
                <Typography>{pet.gender}</Typography>
                <Typography>{`Year of Birth: ${getYear(pet.yearofbirth)}`}</Typography>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
      <EditPetDialog
        pet={selectedPet === 'default' ? DEFAULT_PET : selectedPet}
        petCategories={petCategories}
        onClose={handleDialogClose}
        handleSubmit={selectedPet === 'default' ? handleSubmitAdd : handleSubmitEdit}
      />
    </Container>
  );
};

export default Pets;
