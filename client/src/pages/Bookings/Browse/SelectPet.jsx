/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SelectPet() {
  return (
    <Autocomplete
      id="Select Pet"
      options={Pets}
      getOptionLabel={(pet) => pet.name}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Pet"/>}
    />
  );
}

const Pets = [
  { name: 'porky', year: 1994 },
  { name: 'bacony', year: 1975 },
];
