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

const ProfileSettings = () => {
  const UpdateSchema = Yup.object({
    name: Yup.string().required(),
    username: Yup.string().required(),
    phonenumber: Yup.string().required(),
    bio: Yup.string().required(),
    address: Yup.string().required('You must register an address'),
    postalcode: Yup.string().required('You must register an postal code'),
    email: Yup.string().email().required('Please enter a valid email address'),
    passworddigest: Yup.string(),
    confirmpassword: Yup.string().oneOf([Yup.ref('passworddigest'), null], 'Passwords must match'),
  });

  const history = useHistory();
  const { user: userAccount } = useStore();
  const [user, setUser] = useState();

  const handleSubmit = async (input) => {
    try {
      await api.profileSettings.updateUserDetails(input.values);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClickDelete = async () => {
    try {
      if (!window.confirm(`Are you sure you want to delete your account?`)) return;
      // set deletedAt, then delete session and finally push to login page
      await api.auth.deleteUser(userAccount.username).then(api.auth.logout());
      history.push('/login');
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    api.profileSettings.getUserDetails(userAccount.username).then((res) => {
      setUser(res);
    });
  }, [userAccount]);

  // hacky solution to get the forms to render after userAccount has been retrieved
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
                <Grid item xs={12} md={6}>
                  <Field name="name" label="Profile Name" component={FormTextField} required />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Field
                    name="username"
                    label="Username"
                    disabled
                    component={FormTextField}
                    required
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Field
                    name="phonenumber"
                    label="Phone Number"
                    component={FormTextField}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field name="bio" label="About" multiline component={FormTextField} required />
                </Grid>
                <Grid item xs={12} md={5}>
                  <Field name="address" label="Address" component={FormTextField} required />
                </Grid>
                <Grid item xs={6} md={2}>
                  <Field name="postalcode" label="Postal Code" component={FormTextField} required />
                </Grid>
                <Grid item xs={6} md={5}>
                  <Field name="email" label="Email" component={FormTextField} required />
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
          {/* If PetOwner, render PetOwnerForm */}
          {userAccount.isPetOwner && <PetOwnerForm username={userAccount.username} />}
          {/* If Caretaker, render CaretakerForm */}
          {(userAccount.isPartTimeCaretaker || userAccount.isFullTimeCaretaker) && (
            <CaretakerForm username={userAccount.username} />
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileSettings;
