import React, { useEffect, useState } from 'react';
import { Button, Container, TextField, Typography, Card, CardContent } from '@material-ui/core';
import { useStore } from '../../utilities/store';
import api from '../../api';

const PetOwnerForm = (props) => {
  const { username } = props;
  const [petCategories, setPetCategories] = useState(['test']);

  useEffect(() => {
    api.caretakers.getCaretakerCaresFor(username).then((res) => {
      setPetCategories(res);
    });
  }, []);

  console.log(petCategories);

  const handleUpdate = async (cc) => {
    try {
      await api.profileSettings.updateCc(cc);
    } catch (err) {
      console.log(err.message);
    }
  };
  return <h1>{'Caretaker Form'}</h1>;
};

export default PetOwnerForm;
