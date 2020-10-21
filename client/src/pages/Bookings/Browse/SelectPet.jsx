/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SelectPet({ setPet, petOptions }) {
  return (
    <Autocomplete
      id="Select Pet"
      onChange={(event, newValue) => {
        setPet(newValue);
      }}
      options={petOptions}
      getOptionLabel={(pet) => pet.name}
      renderInput={(params) => <TextField {...params} label="Pet" />}
    />
  );
}
