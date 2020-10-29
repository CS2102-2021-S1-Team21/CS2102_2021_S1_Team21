import { Grid, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import api from '../api';
import FormCheckboxGroup from '../components/forms/FormCheckboxGroup';
import FormDatePicker from '../components/forms/FormDatePicker';
import FormSelect from '../components/forms/FormSelect';
import FormTextArea from '../components/forms/FormTextArea';
import FormTextField from '../components/forms/FormTextField';
import SubmitButton from '../components/forms/SubmitButton';
import NoAuthAppShell from '../components/NoAuthAppShell';

// Utility Functions

function isCaretaker(accountType) {
  return ['careTaker', 'both'].includes(accountType);
}

function isPetOwner(accountType) {
  return ['petOwner', 'both'].includes(accountType);
}

// Constants

const DEFAULT_VALUES = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  name: '',
  bio: '',
  phonenumber: '',
  address: '',
  postalcode: '',
  accountType: '',
  caretakerType: '',
  ccnumber: '',
  ccname: '',
  ccexpirydate: '',
  cvvcode: '',
  caresForCategories: [],
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required()
    .matches(
      /^[\w-.]+$/,
      'Username can only contain alphanumeric characters, dots (.), dashes (-), and underscores (-)',
    ),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  passwordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Password confirmation must match password'),
  name: Yup.string().required(),
  bio: Yup.string().required().max(255),
  phonenumber: Yup.string().required(),
  address: Yup.string().required(),
  postalcode: Yup.number().required(),
  accountType: Yup.string().required(),
  caretakerType: Yup.string().when('accountType', {
    is: isCaretaker,
    then: Yup.string().required('Care Taker Type is required for Care Taker Accounts'),
    otherwise: Yup.string().oneOf(
      [''],
      'Care Taker Type must be empty if Account Type is "Pet Owner only"',
    ),
  }),
  ccnumber: Yup.string().matches(/^[0-9]+$/),
  ccname: Yup.string(),
  ccexpirydate: Yup.date(),
  cvvcode: Yup.string().matches(/^[0-9]{3}$/, 'CVV Code must contain exactly 3 digits'),
  caresForCategories: Yup.array().of(Yup.string()),
});

// Component

const Registration = () => {
  const history = useHistory();

  const [petCategories, setPetCategories] = useState([]);

  useEffect(() => {
    api.petCategories.getPetCategories().then((response) => setPetCategories(response.rows));
  }, []);

  const initialValues = { ...DEFAULT_VALUES, isDeleted: false };

  const handleSubmit = async (values) => {
    console.log(values);
    await api.users
      .signup(_.omit(values, 'passwordConfirmation'))
      .then((response) => {
        console.log(response);
        history.push('/login');
      })
      .catch(console.error);
  };

  return (
    <NoAuthAppShell>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={12}>
                <Typography component="h1" variant="h2">
                  {'New PCS Account'}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <h1>{'Account Details'}</h1>
                <Field
                  name="username"
                  label="Enter a username"
                  component={FormTextField}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  name="email"
                  label="Enter your email address"
                  type="email"
                  component={FormTextField}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  name="password"
                  label="Enter new password"
                  type="password"
                  component={FormTextField}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  name="passwordConfirmation"
                  label="Confirm password"
                  type="password"
                  component={FormTextField}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  name="accountType"
                  label="Account Type"
                  component={FormSelect}
                  options={[
                    { value: 'petOwner', label: 'Pet Owner only' },
                    { value: 'careTaker', label: 'Care Taker only' },
                    { value: 'both', label: 'Both Pet Owner and Care Taker' },
                  ]}
                  onChangeCallback={(value) => {
                    if (value === 'petOwner') {
                      formik.setFieldValue('caretakerType', DEFAULT_VALUES.caretakerType);
                      formik.setFieldValue('caresForCategories', DEFAULT_VALUES.caresForCategories);
                    } else if (value === 'careTaker') {
                      formik.setFieldValue('ccnumber', DEFAULT_VALUES.ccnumber);
                      formik.setFieldValue('ccname', DEFAULT_VALUES.ccname);
                      formik.setFieldValue('ccexpirydate', DEFAULT_VALUES.ccexpirydate);
                      formik.setFieldValue('cvvcode', DEFAULT_VALUES.cvvcode);
                    }
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                {isCaretaker(formik.values.accountType) && (
                  <Field
                    name="caretakerType"
                    label="Care Taker Type"
                    component={FormSelect}
                    options={[
                      { value: '', label: 'Not applicable' },
                      { value: 'fullTime', label: 'Full Time Care Taker' },
                      { value: 'partTime', label: 'Part Time Care Taker' },
                    ]}
                    required
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                <h1>{'Profile Details'}</h1>
                <Field
                  name="name"
                  label="Enter your full name"
                  component={FormTextField}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="bio"
                  label="Write a few sentences to introduce yourself"
                  component={FormTextArea}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="address"
                  label="Enter your address"
                  component={FormTextArea}
                  rows={2}
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <Field name="postalcode" label="Postal Code" component={FormTextField} required />
              </Grid>

              <Grid item xs={6}>
                <Field name="phonenumber" label="Phone Number" component={FormTextField} required />
              </Grid>

              {isPetOwner(formik.values.accountType) && (
                <>
                  <Grid item xs={12} sm={6}>
                    <h1>{'Add Credit Card'}</h1>
                    <Field
                      name="ccnumber"
                      label="Enter credit card number"
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="ccname"
                      label="Enter name on credit card"
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="ccexpirydate"
                      label="Enter credit card expiry date"
                      views={['month']}
                      component={FormDatePicker}
                      format="MM/yy"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="cvvcode" label="CVV code" component={FormTextField} />
                  </Grid>
                </>
              )}

              {isCaretaker(formik.values.accountType) && (
                <>
                  <Grid item xs={12}>
                    <h1>{'Care Taker Details'}</h1>
                    <Field
                      name="caresForCategories"
                      label="Select the Pet Categories that you can take care of"
                      component={FormCheckboxGroup}
                      options={petCategories.map((category) => ({
                        value: category.categoryname,
                        label: category.categoryname,
                      }))}
                      useRowLayout={false}
                      required
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12} sm={6} md={4}>
                <SubmitButton>{'Create Account'}</SubmitButton>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </NoAuthAppShell>
  );
};

export default Registration;
