import React, { useState } from 'react';
import { Container, TextField, Typography, Card, CardContent } from '@material-ui/core';

const ProfileSettings = () => {
  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <form>
            <Typography variant="h6" style={{ marginTop: 30 }}>
              {'Profile Name'}
            </Typography>
            <TextField id="profileName" label="Profile Name" fullWidth variant="outlined" />
            <Typography variant="h6" style={{ marginTop: 30 }}>
              {'About'}
            </Typography>
            <TextField id="bio" label="About" fullWidth variant="outlined" />
            <Typography variant="h6" style={{ marginTop: 30 }}>
              {'Address'}
            </Typography>
            <TextField id="address" label="Address" fullWidth variant="outlined" />
            <Typography variant="h6" style={{ marginTop: 30 }}>
              {'Postal Code'}
            </Typography>
            <TextField id="postalCode" label="Postal Code" fullWidth variant="outlined" />
            <Typography variant="h6" style={{ marginTop: 30 }}>
              {'Phone Number'}
            </Typography>
            <TextField id="phoneNumber" label="Phone Number" fullWidth variant="outlined" />

            {/* Caretaker attributes */}
            <Typography variant="h6" style={{ marginTop: 30 }}>
              {'Services | Offer'}
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileSettings;
