import React, { useEffect, useState } from 'react';
import { Button, Container, TextField, Typography, Card, CardContent } from '@material-ui/core';
import { useStore } from '../../utilities/store';
import api from '../../api';

const PetOwnerForm = (props) => {
  const { username } = props;
  const [creditCard, setCreditCard] = useState(['test']);

  useEffect(() => {
    api.petOwners.getPetOwnerCreditCard(username).then((res) => {
      setCreditCard(res);
      console.log(res);
    });
  }, []);

  const handleUpdate = async (cc) => {
    try {
      await api.profileSettings.updateCc(cc);
    } catch (err) {
      console.log(err.message);
    }
  };

  return <h1>{'Pet Owner Form'}</h1>;
};

export default PetOwnerForm;
