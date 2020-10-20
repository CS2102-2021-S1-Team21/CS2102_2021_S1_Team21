import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import api from '../../api';
import TransferList from './TransferList';

const CaretakerForm = ({ username }) => {
  const [petCategories, setPetCategories] = useState([]);

  useEffect(() => {
    api.caresFor.getCaretakerCaresFor(username).then((res) => {
      setPetCategories(res);
    });
  }, [username]);

  const handleSubmit = async (values) => {
    try {
      await api.caresFor.editCaretakerCaresFor(username, values);
    } catch (err) {
      console.log(err.message);
    }
  };

  // hacky solution..
  if (petCategories.length === 0) {
    return null;
  }
  return (
    <Box>
      <Typography variant="h6" style={{ marginTop: 30, marginBottom: 30 }}>
        {'Update Suitable Pets'}
      </Typography>{' '}
      <TransferList categories={petCategories} handleSubmit={handleSubmit} />
    </Box>
  );
};

export default CaretakerForm;
