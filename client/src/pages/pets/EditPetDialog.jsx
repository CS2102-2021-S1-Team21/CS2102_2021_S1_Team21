import { Dialog, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import FormDatePicker from '../../components/forms/FormDatePicker';
import FormRadioGroup from '../../components/forms/FormRadioGroup';
import FormSelect from '../../components/forms/FormSelect';
import FormTextField from '../../components/forms/FormTextField';
import SubmitButton from '../../components/forms/SubmitButton';

const EditPetDialog = ({ pet, petCategories, onClose, handleSubmit }) => {
  if (!pet) return null;

  const initialValues = pet;

  return (
    <Dialog open={!!pet} onClose={onClose}>
      <DialogTitle>{'Edit Pet'}</DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(pet.name, values)}>
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field name="name" label="Pet Name" component={FormTextField} required />
              </Grid>
              <Grid item xs={12}>
                <Field name="breed" label="Breed" component={FormTextField} required />
              </Grid>
              <Grid item xs={12}>
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

export default EditPetDialog;
