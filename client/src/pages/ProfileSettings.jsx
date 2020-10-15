import React, { useEffect, useState } from 'react';
import { Container, TextField, Typography, Card, CardContent } from '@material-ui/core';
import { useStore } from '../utilities/store';
import api from '../api';

const ProfileSettings = () => {
  const { user, isPetOwner, isFullTimeCaretaker, isPartTimeCaretaker } = useStore();

  const [userProfile, setUser] = useState({
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

  useEffect(() => {
    api.profileSettings.getUserDetails(user.username).then((res) => {
      setUser(res);
    });
  }, [user]);

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <form>
            <Typography variant="h4" style={{ marginTop: 30, marginBottom: 30 }}>
              {'Edit Profile'}
            </Typography>
            {/* Find a way to rerender after state change */}
            <TextField
              id="profileName"
              style={{ marginBottom: 34 }}
              label="Profile Name"
              variant="outlined"
              defaultValue={userProfile.name}
              fullWidth
              disabled
            />
            <TextField
              id="bio"
              style={{ marginBottom: 34 }}
              label="About"
              variant="outlined"
              defaultValue={userProfile.bio}
              fullWidth
              multiline
            />
            <TextField
              id="address"
              style={{ marginBottom: 34 }}
              label="Address"
              variant="outlined"
              defaultValue={userProfile.address}
              fullWidth
            />
            <TextField
              id="postalCode"
              style={{ marginBottom: 34 }}
              label="Postal Code"
              variant="outlined"
              defaultValue={userProfile.postalcode}
              fullWidth
            />
            <TextField
              id="phoneNumber"
              style={{ marginBottom: 34 }}
              label="Phone Number"
              variant="outlined"
              defaultValue={userProfile.phonenumber}
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

            {/* Caretaker attributes */}
            {/* <div>{userProfile.isPetOwner ? cardForm : </div> */}
            <Typography variant="h6" style={{ marginTop: 30 }}>
              {'Services I Offer'}
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileSettings;
