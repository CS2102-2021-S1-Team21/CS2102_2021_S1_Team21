import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography, Card, CardContent } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { useStore } from '../../utilities/store';
import api from '../../api';
import PetOwnerForm from './PetOwnerForm';
import CaretakerForm from './CaretakerForm';
import FormTextField from '../../components/forms/FormTextField';
import SubmitButton from '../../components/forms/SubmitButton';

const ProfileSettings = () => {
  const { user: userAccount } = useStore();
  const [user, setUser] = useState();

  const handleSubmit = async (input) => {
    try {
      await api.profileSettings.updateUserDetails(input.values);
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
    return 'loading..';
  }
  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography variant="h6" style={{ marginTop: 30, marginBottom: 30 }}>
            {'Edit Profile'}
          </Typography>
          <Formik initialValues={user} onSubmit={(values) => handleSubmit({ values })}>
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field name="name" label="Profile Name" component={FormTextField} required />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    name="username"
                    label="Username"
                    disabled
                    component={FormTextField}
                    required
                  />
                </Grid>
                <Grid item xs={3}>
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
                <Grid item xs={8}>
                  <Field name="address" label="Address" component={FormTextField} required />
                </Grid>
                <Grid item xs={4}>
                  <Field name="postalcode" label="Postal Code" component={FormTextField} required />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="passworddigest"
                    label="New Password"
                    component={FormTextField}
                    type="password"
                  />
                </Grid>
                <SubmitButton>{'Update'}</SubmitButton>
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
