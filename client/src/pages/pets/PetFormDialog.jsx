import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Field, FieldArray, Form, Formik } from 'formik';
import React from 'react';
import FormDatePicker from '../../components/forms/FormDatePicker';
import FormRadioGroup from '../../components/forms/FormRadioGroup';
import FormSelect from '../../components/forms/FormSelect';
import FormTextField from '../../components/forms/FormTextField';
import SubmitButton from '../../components/forms/SubmitButton';
import PetRequirementsFieldArray from './PetRequirementFieldArray';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
  },
}));

const PetFormDialog = ({ title, pet, petCategories, onClose, handleSubmit }) => {
  const classes = useStyles();

  if (!pet) return null;

  const initialValues = pet;

  return (
    <Dialog open={!!pet} onClose={onClose} maxWidth="md">
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5">{title}</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(pet.name, values)}>
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field name="name" label="Pet Name" component={FormTextField} required />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field name="breed" label="Breed" component={FormTextField} required />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  name="categoryname"
                  label="Category"
                  component={FormSelect}
                  options={petCategories.map((category) => ({
                    value: category.categoryname,
                    label: category.categoryname,
                  }))}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="gender"
                  label="Gender"
                  component={FormRadioGroup}
                  options={[
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                  ]}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="yearofbirth"
                  label="Year of Birth"
                  component={FormDatePicker}
                  format="yyyy"
                  views={['year']}
                  required
                />
              </Grid>

              <hr />

              <Grid item xs={12}>
                <Typography component="h2" variant="h6" className={classes.title}>
                  {'Pet Requirements'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FieldArray name="requirements" component={PetRequirementsFieldArray} />
              </Grid>
              <Grid item xs={12}>
                <SubmitButton />
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default PetFormDialog;
