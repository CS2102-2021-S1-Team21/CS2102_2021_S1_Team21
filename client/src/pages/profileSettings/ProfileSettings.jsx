import React from 'react';
import { useStore } from '../../utilities/store';
import { Container } from '@material-ui/core';
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
          role={
            userAccount.isFullTimeCaretaker || userAccount.isPartTimeCaretaker
              ? 'caretaker'
              : 'petowner'
          }
        />
      )}

      {userAccount.isAdmin && <AdminProfileSettings username={userAccount.username} />}
    </Container>
  );
};

export default ProfileSettings;
