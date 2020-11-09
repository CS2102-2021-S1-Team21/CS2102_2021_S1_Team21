import React from 'react';
import { Container } from '@material-ui/core';
import { useStore } from '../../utilities/store';
import UserProfileSettings from './UserProfileSettings';
import AdminProfileSettings from './AdminProfileSettings';

const ProfileSettings = () => {
  const { user: userAccount } = useStore();

  return (
    <Container>
      {(userAccount.isPetOwner ||
        userAccount.isPartTimeCaretaker ||
        userAccount.isFullTimeCaretaker) && (
        <UserProfileSettings
          username={userAccount.username}
          isCaretaker = {userAccount.isFullTimeCaretaker || userAccount.isPartTimeCaretaker}
          isPetOwner = {userAccount.isPetOwner}
        />
      )}

      {userAccount.isAdmin && <AdminProfileSettings username={userAccount.username} />}
    </Container>
  );
};

export default ProfileSettings;
