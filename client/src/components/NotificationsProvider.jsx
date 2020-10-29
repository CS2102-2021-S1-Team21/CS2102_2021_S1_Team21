import { Snackbar } from '@material-ui/core';
import React, { useState } from 'react';
import Alert from './Alert';
import { SnackbarProvider } from '../utilities/snackbar';

const DEFAULT_SNACKBAR_CONTENT = { message: '', severity: '' };

/**
 * Process an API response (or any promise) and displays the relevant message
 * in a snackbar if any of the following keys are set: 'error', 'warning', 'info', 'success'.
 *
 * Only the first message is displayed, i.e. if both 'error' and 'success' are present,
 * an error snackbar will be shown.
 */
const NotificationsProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState(DEFAULT_SNACKBAR_CONTENT);

  const updateSnackbar = (newContent) => {
    setSnackbarContent(newContent);
    setSnackbarOpen(true);
  };

  const handlePromise = (promise) =>
    promise.then((response) => {
      if (response.error) {
        updateSnackbar({ message: response.error, severity: 'error' });
        throw Error(response.error); // Component should see this as an error
      } else if (response.warning) {
        updateSnackbar({ message: response.warning, severity: 'warning' });
      } else if (response.info) {
        updateSnackbar({ message: response.info, severity: 'info' });
      } else if (response.success) {
        updateSnackbar({ message: response.success, severity: 'success' });
      } else {
        setSnackbarOpen(false);
      }
      return response;
    });
  // TODO: catch 500 errors

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <SnackbarProvider value={handlePromise}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={8_000}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbarContent.severity} onClose={handleSnackbarClose}>
          {snackbarContent.message}
        </Alert>
      </Snackbar>
    </SnackbarProvider>
  );
};

export default NotificationsProvider;
