import { Box, Container, Grid, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import * as Yup from 'yup';
import api from '../../api';
import FormTextField from '../../components/forms/FormTextField';
import SubmitButton from '../../components/forms/SubmitButton';
import { useSnackbarContext } from '../../utilities/snackbar';

const DEFAULT_ADMIN = {
  username: '',
  email: '',
  name: '',
  password: '',
  passwordConfirmation: ''
}

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
});

const NewAdmin = () => {
  const showSnackbar = useSnackbarContext();

  const handleSubmit = async (values) => {
    showSnackbar(api.users.addAdmin(_.omit(values, 'passwordConfirmation'))).catch(() => {});
  };

  return (
    <Container>
      <Box marginY={4}>
        <Typography component="h1" variant="h4">
          {'Create New Admin Account'}
        </Typography>
      </Box>

      <Formik onSubmit={handleSubmit} initialValues={DEFAULT_ADMIN} validationSchema={validationSchema}>
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Field
                name="name"
                label="Enter name of new admin"
                component={FormTextField}
              />
            </Grid>
            {/* Next item for spacing only */}
            <Grid item xs={0} md={6} />
            <Grid item xs={12} md={6}>
              <Field
                name="username"
                label="Enter a username"
                component={FormTextField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                name="email"
                label="Enter email address of new admin"
                type="email"
                component={FormTextField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                name="password"
                label="Enter password"
                type="password"
                component={FormTextField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                name="passwordConfirmation"
                label="Confirm password"
                type="password"
                component={FormTextField}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SubmitButton>
                {'Create Account'}
              </SubmitButton>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  )
}

export default NewAdmin;
