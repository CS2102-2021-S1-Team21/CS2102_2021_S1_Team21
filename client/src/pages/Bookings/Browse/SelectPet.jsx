/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SelectPet(props) {
  
  return (
    <Autocomplete
      id="Select Pet"
      onChange={(event, newValue) => {
        props.setPet(newValue);
      }}      
      options={props.petOptions}
      getOptionLabel={(pet) => pet.name}
      renderInput={(params) => <TextField {...params} label="Pet"/>}
    />
  );
}

