import React, { useEffect, useState } from 'react';
import { Button, Container, TextField, Typography, Card, CardContent } from '@material-ui/core';
import { useStore } from '../../utilities/store';
import api from '../../api';
import PetOwnerForm from './PetOwnerForm';
import CaretakerForm from './CaretakerForm';

const ProfileSettings = () => {
  const { user: userAccount } = useStore();
  const [user, setUser] = useState({
    username: 'demo',
    name: 'Martin Benz',
    email: 'demo@world.org',
    passwordDigest: '$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW	',
    address: 'demoland',
    bio: ' i like carrots',
    phonenumber: '999',
    postalcode: '63411212411',
  });
  const [services, setServices] = useState([]);
  const [cardRecord, setCardRecord] = useState([]);

  const style = {
    float: 'right',
    marginBottom: '20px',
  };

  const handleUpdate = async () => {
    try {
      console.log(user);
      await api.profileSettings.updateUserDetails(user);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    api.profileSettings.getUserDetails(userAccount.username).then((res) => {
      setUser(res);
    });
  }, [userAccount]);

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography variant="h4" style={{ marginTop: 30, marginBottom: 30 }}>
            {'Edit Profile'}
          </Typography>
          {/* Find a way to rerender after state change */}
          <form>
            <TextField
              id="profileName"
              style={{ marginBottom: 34 }}
              label="Profile Name"
              variant="outlined"
              defaultValue={user.name}
              fullWidth
              disabled
            />
            <TextField
              id="bio"
              style={{ marginBottom: 34 }}
              label="About"
              variant="outlined"
              defaultValue={user.bio}
              fullWidth
              multiline
            />
            <TextField
              id="address"
              style={{ marginBottom: 34 }}
              label="Address"
              variant="outlined"
              defaultValue={user.address}
              fullWidth
            />
            <TextField
              id="postalCode"
              style={{ marginBottom: 34 }}
              label="Postal Code"
              variant="outlined"
              defaultValue={user.postalcode}
              fullWidth
            />
            <TextField
              id="phoneNumber"
              style={{ marginBottom: 34 }}
              label="Phone Number"
              variant="outlined"
              defaultValue={user.phonenumber}
              fullWidth
            />
            <TextField
              id="newPassword"
              style={{ marginBottom: 34 }}
              label="New Password"
              variant="outlined"
              defaultValue="FakePassword"
              type="password"
              fullWidth
            />
            <TextField
              id="confirmPassword"
              style={{ marginBottom: 34 }}
              label="Confirm New Password"
              variant="outlined"
              defaultValue="FakePassword"
              type="password"
              fullWidth
            />
            {/* If PetOwner, render PetOwnerForm */}
            {userAccount.isPetOwner && <PetOwnerForm username={userAccount.username} />}
            {/* If Caretaker, render CaretakerForm */}
            {(userAccount.isPartTimeCaretaker || userAccount.isFullTimeCaretaker) && (
              <CaretakerForm username={userAccount.username} />
            )}
            <Button variant="contained" color="primary" onClick={handleUpdate} style={style}>
              {'Update\r'}
            </Button>{' '}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileSettings;
