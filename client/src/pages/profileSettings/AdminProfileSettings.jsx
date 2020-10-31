import React, { useEffect, useState } from 'react';
import { Button, Grid, Container, Typography, Card, CardContent } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useStore } from '../../utilities/store';
import api from '../../api';
import PetOwnerForm from './PetOwnerForm';
import CaretakerForm from './CaretakerForm';
import Loading from '../../components/Loading';
import FormTextField from '../../components/forms/FormTextField';
import SubmitButton from '../../components/forms/SubmitButton';
import { useSnackbarContext } from '../../utilities/snackbar';

const AdminProfileSettings = ({username}) => {
  const UpdateSchema = Yup.object({
    name: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().email().required('Please enter a valid email address'),
    passworddigest: Yup.string(),
    confirmpassword: Yup.string().oneOf([Yup.ref('passworddigest'), null], 'Passwords must match'),
  });

  const history = useHistory();
  const [user, setUser] = useState();
  const showSnackbar = useSnackbarContext();

  const handleSubmit = async (input) => {
    try {
      await showSnackbar(api.profileSettings.updateAdminDetails(input.values));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClickDelete = async () => {
    try {
      if (!window.confirm(`Are you sure you want to delete your account?`)) return;
      // set deletedAt, then delete session and finally push to login page

      /// CHECK
      await showSnackbar(api.users.deleteAdmin(username)).then(api.auth.logout());
      history.push('/login');
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    showSnackbar(api.profileSettings.getAdminDetails(username)).then((res) => {
      setUser(res);
    });
  }, [username]);

  // hacky solution to get the forms to render after username has been retrieved
  if (!user) {
    return <Loading />;
  }
  return (
    <Container>
      <Card>
        <CardContent>
          <Formik
            initialValues={user}
            validationSchema={UpdateSchema}
            onSubmit={(values) => handleSubmit({ values })}
          >
            <Form>
              <Typography variant="h6" style={{ marginTop: 30, marginBottom: 30 }}>
                {'Update Profile'}
              </Typography>
              <Grid container spacing={2} justify="flex-end">
                <Grid item xs={12}>
                  <Field name="name" label="Profile Name" component={FormTextField} required />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="username"
                    label="Username"
                    disabled
                    component={FormTextField}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field name="email" label="Email" component={FormTextField} disabled required />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="passworddigest"
                    label="New Password"
                    component={FormTextField}
                    type="password"
                    initialValue=""
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="confirmpassword"
                    label="Confirm New Password"
                    component={FormTextField}
                    type="password"
                    initialValue=""
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => handleClickDelete()}
                  >
                    {'Delete Account'}
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <SubmitButton>{'Update Profile'}</SubmitButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminProfileSettings;
