import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import api from '../api';
import FormTextField from '../components/forms/FormTextField';
import SubmitButton from '../components/forms/SubmitButton';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(4),
  },
}));

const DEFAULT_VALUES = {
  username: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const initialValues = { ...DEFAULT_VALUES, isDeleted: false };

  const handleSubmit = async ({ username, password }) => {
    api.auth.login({ username, password }).then(() => history.push('/'));
    // TODO: error handling
  };

  return (
    <Box className={classes.container}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h2">
                {'Log In'}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <h1>{'Username / Email Address:'}</h1>
              <Field
                name="username"
                label="Enter your username or email"
                component={FormTextField}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <h1>{'Password:'}</h1>
              <Field
                name="password"
                label="Enter your password"
                component={FormTextField}
                type="password"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <SubmitButton>{'Log In'}</SubmitButton>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Box>
  );
};

export default Login;
