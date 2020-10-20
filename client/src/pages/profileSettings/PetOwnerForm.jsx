import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import api from '../../api';
import FormTextField from '../../components/forms/FormTextField';
import FormDatePicker from '../../components/forms/FormDatePicker';
import SubmitButton from '../../components/forms/SubmitButton';

const PetOwnerForm = (username) => {
  const [creditCard, setCreditCard] = useState();

  useEffect(() => {
    api.petOwners.getCreditCard(username).then((res) => {
      setCreditCard(res);
    });
  }, [username]);

  const handleSubmit = async (input) => {
    try {
      await api.petOwners.editCreditCard(input.values);
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!creditCard) {
    return 'loading..';
  }

  return (
    <Box mt={8}>
      <Formik initialValues={creditCard} onSubmit={(values) => handleSubmit({ values })}>
        <Form>
          <Typography variant="h6" style={{ marginTop: 30, marginBottom: 30 }}>
            {'Update Credit Card'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Field name="ccname" label="Cardholder Name" component={FormTextField} required />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="ccnumber"
                label="Credit Card Number"
                component={FormTextField}
                required
              />
            </Grid>
            <Grid item xs={2}>
              <Field name="cccvvcode" label="CVV Code" component={FormTextField} required />
            </Grid>
            <Grid item xs={2}>
              <Field
                name="ccexpirydate"
                label="Expiry Date"
                views={['month']}
                component={FormDatePicker}
                format="MM/yy"
                required
              />
            </Grid>
            <SubmitButton>{'Update'}</SubmitButton>
          </Grid>
        </Form>
      </Formik>
    </Box>
  );
};

export default PetOwnerForm;
