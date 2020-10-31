import React, { useEffect, useState } from 'react';
import { Button, Grid, Container, Typography, Card, CardContent } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useStore } from '../../utilities/store';
import api from '../../api';
import UserProfileSettings from './UserProfileSettings';
import AdminProfileSettings from './AdminProfileSettings';
import Loading from '../../components/Loading';
import FormTextField from '../../components/forms/FormTextField';
import SubmitButton from '../../components/forms/SubmitButton';

const ProfileSettings = () => {
  const history = useHistory();
  const { user: userAccount } = useStore();

  return (
    <Container>
    {(userAccount.isPetOwner || userAccount.isPartTimeCaretaker || userAccount.isFullTimeCaretaker) 
    && <UserProfileSettings 
      username={userAccount.username} 
      role={userAccount.isFullTimeCaretaker | userAccount.isPartTimeCaretaker ? 'caretaker' : 'petowner'}/>}
    
    {userAccount.isAdmin 
    && <AdminProfileSettings 
      username={userAccount.username}/>}
    </Container>
  );
};

export default ProfileSettings;
