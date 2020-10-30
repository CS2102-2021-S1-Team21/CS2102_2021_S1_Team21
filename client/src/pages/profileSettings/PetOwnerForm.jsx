import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import api from '../../api';
import Loading from '../../components/Loading';
import FormTextField from '../../components/forms/FormTextField';
import FormDatePicker from '../../components/forms/FormDatePicker';
import SubmitButton from '../../components/forms/SubmitButton';
import { useSnackbarContext } from '../../utilities/snackbar';

const PetOwnerForm = (username) => {
  const showSnackbar = useSnackbarContext();
  const [creditCard, setCreditCard] = useState();

  useEffect(() => {
    showSnackbar(api.petOwners.getCreditCard(username)).then((res) => {
      setCreditCard(res);
    });
  }, [username]);

  const handleSubmit = async (input) => {
    try {
      await showSnackbar(api.petOwners.editCreditCard(input.values));
    } catch (err) {
      console.log(err.message);
    }
  };

  // hacky solution..
  if (!creditCard) {
    return <Loading />;
  }

  return (
    <Formik initialValues={creditCard} onSubmit={(values) => handleSubmit({ values })}>
      <Form>
        <Typography variant="h6" style={{ marginTop: 30, marginBottom: 30 }}>
          {'Update Payment Info'}
        </Typography>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item xs={6} md={4}>
            <Field name="ccname" label="Cardholder Name" component={FormTextField} required />
          </Grid>
          <Grid item xs={6} md={4}>
            <Field name="ccnumber" label="Credit Card Number" component={FormTextField} required />
          </Grid>
          <Grid item xs={4} md={2}>
            <Field name="cccvvcode" label="CVV Code" component={FormTextField} required />
          </Grid>
          <Grid item xs={5} md={2}>
            <Field
              name="ccexpirydate"
              label="Expiry Date"
              views={['month']}
              component={FormDatePicker}
              format="MM/yy"
              required
            />
          </Grid>
          <Grid item xs={3}>
            <SubmitButton>{'Update Payment Info'}</SubmitButton>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default PetOwnerForm;
