import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import FormCheckbox from '../components/forms/FormCheckbox';
import FormCheckboxGroup from '../components/forms/FormCheckboxGroup';
import FormDatePicker from '../components/forms/FormDatePicker';
import FormDateTimePicker from '../components/forms/FormDateTimePicker';
import FormMultiSelect from '../components/forms/FormMultiSelect';
import FormRadioGroup from '../components/forms/FormRadioGroup';
import FormSelect from '../components/forms/FormSelect';
import FormTextArea from '../components/forms/FormTextArea';
import FormTextField from '../components/forms/FormTextField';
import FormTimePicker from '../components/forms/FormTimePicker';
import SubmitButton from '../components/forms/SubmitButton';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(4),
  },
}));

const DEFAULT_VALUES = {
  petName: 'Flounder',
  remarks: '',
  petType: 'fish',
  services: ['shortTermStay', 'boarding'],
  requirements: [], // Note: Arrays MUST be initialised
  ageGroup: '', // To prevent 'MUI changing from uncontrolled to controlled component' error
  isVerified: false,
};

const validationSchema = Yup.object().shape({
  petName: Yup.string().required(),
  remarks: Yup.string().max(255),
  petType: Yup.string().required(),
  services: Yup.array().of(Yup.string()),
  startDate: Yup.date().required(),
  startTime: Yup.date(),
  startDateTime: Yup.date(),
  ageGroup: Yup.string().required(),
  requirements: Yup.array().of(Yup.string()).required(),
  isVerified: Yup.bool().equals([true]),
});

const FormTest = () => {
  const classes = useStyles();

  // We specify initial Date values here so that they will be re-computed when the component re-renders
  const initialValues = { ...DEFAULT_VALUES, startDate: new Date(), startTime: new Date() };

  // Note: this should be `async` so that Formik will set `isSubmitting` to false when the function finishes
  const handleSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(500); // to simulate network delay when making API call
    alert(`Submitting...\n${JSON.stringify(values)}`);
  };

  return (
    <Box className={classes.container}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          {/* Note: the Grids are just for styling. as an example of how to handle mobile + desktop layouts */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1">{'Forms'}</Typography>
            </Grid>
            {/* TEXT INPUTS */}
            {/* Note: `required` must be specified in both Yup validation (data) and here (UI). */}
            <Grid item xs={12}>
              <Field name="petName" label="Pet Name" component={FormTextField} required />
            </Grid>
            <Grid item xs={12}>
              <Field name="remarks" label="Remarks" component={FormTextArea} />
            </Grid>
            {/* SELECTS */}
            <Grid item xs={12}>
              <Field
                name="petType"
                label="Pet Type"
                component={FormSelect}
                options={[
                  { label: 'Small Doggy', value: 'mini-dog' },
                  { label: 'Big Doggy', value: 'dog-large' },
                  { label: 'Kitty', value: 'cat' },
                  { label: 'Fish', value: 'fish' },
                ]}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="services"
                label="Services Required"
                component={FormMultiSelect}
                options={[
                  { label: 'Dog-Walking', value: 'dogwalking' },
                  { label: 'House Visits', value: 'houseVisits' },
                  { label: 'Short-Term Stay', value: 'shortTermStay' },
                  { label: 'Boarding', value: 'boarding' },
                ]}
                required
              />
            </Grid>
            {/* DATE PICKERS */}
            <Grid item xs={12} sm={6}>
              <Field name="startDate" label="Start Date" component={FormDatePicker} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name="startTime" label="Start Time" component={FormTimePicker} />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="startDateTime"
                label="Start Date and Time"
                component={FormDateTimePicker}
              />
            </Grid>
            {/* RADIO & CHECKBOXES */}
            <Grid item xs={12} sm={6}>
              <Field
                name="ageGroup"
                label="Age Group"
                component={FormRadioGroup}
                options={[
                  { label: 'Newborn (0-1 years)', value: 'newborn' },
                  { label: 'Young (1-3 years)', value: 'young' },
                  { label: 'Middle Aged (4-10 years)', value: 'middle' },
                  { label: 'Elderly (>10 years)', value: 'elderly' },
                ]}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="requirements"
                label="Requirements"
                component={FormCheckboxGroup}
                options={[
                  { value: 'dailyWalks', label: 'Needs daily walks' },
                  { value: 'twiceDailyWalks', label: 'Needs twice-daily walks' },
                  { value: 'dietaryRestrictions', label: 'Has dietary restrictions' },
                  { value: 'allergies', label: 'Has allergies' },
                  { value: '', label: 'No special requirements' },
                ]}
                // CheckboxProps={{ size: 'small' }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Field name="isVerified" label="Verified?" component={FormCheckbox} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SubmitButton>{'Submit'}</SubmitButton>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Box>
  );
};

export default FormTest;
