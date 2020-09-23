import { Box, Typography } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import React, { useState } from 'react';

// TODO: set up generic components that work with Formik

const FormTest = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Box>
      <Typography variant="h1">{'Forms'}</Typography>
      <KeyboardDatePicker
        onChange={(newDate) => {
          setDate(newDate);
          console.log(newDate);
        }}
        value={date}
      />
    </Box>
  );
};

export default FormTest;
