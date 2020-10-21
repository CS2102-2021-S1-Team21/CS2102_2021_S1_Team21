/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SelectTransferType({ setTransferType, transferTypeOptions }) {
  return (
    <Autocomplete
      id="Select transfer type"
      onChange={(event, newValue) => {
        setTransferType(newValue.unnest);
      }}
      options={transferTypeOptions}
      getOptionLabel={(transferType) => transferType.unnest}
      renderInput={(params) => <TextField {...params} label="Transfer method" />}
    />
  );
}
