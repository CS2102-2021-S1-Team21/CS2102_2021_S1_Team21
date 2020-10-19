import { Button } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React from 'react';

const SubmitButton = ({ children = 'Submit', props }) => {
  const formik = useFormikContext();
  return (
    <Button
      variant="contained"
      color="primary"
      disabled={formik.isSubmitting}
      {...props} // allow the above props to be overridden
      type="submit"
      fullWidth
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
