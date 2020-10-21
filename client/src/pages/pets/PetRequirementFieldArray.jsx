import { Button, Grid, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Field } from 'formik';
import React, { Fragment } from 'react';
import FormTextField from '../../components/forms/FormTextField';

const DEFAULT_PET_REQUIREMENT = {
  requirementtype: '',
  description: '',
};

const PetRequirementsFieldArray = ({ form: { values }, push, remove }) => {
  // FIXME: quite laggy when typing
  return (
    <Grid container spacing={2} justify="flex-end">
      {values.requirements.map((requirement, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={index}>
          <Grid item xs={12} md={4}>
            <Field
              name={`requirements.${index}.requirementtype`}
              label="Requirement Type"
              component={FormTextField}
            />
          </Grid>
          <Grid item xs={11} md={7}>
            <Field
              name={`requirements.${index}.description`}
              label="Description"
              component={FormTextField}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton color="secondary" onClick={() => remove(index)}>
              <RemoveIcon />
            </IconButton>
          </Grid>
        </Fragment>
      ))}
      <Grid item>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => push(DEFAULT_PET_REQUIREMENT)}
        >
          {'Add Requirement'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default PetRequirementsFieldArray;
