import React, { useContext } from 'react';

const SnackbarContext = React.createContext({});

export const SnackbarProvider = (props) => <SnackbarContext.Provider {...props} />;

/**
 * Returns a function that processes a Promise and shows the relevant snackbar
 * if the Promise resolves to an object containing one of the following keys:
 * 'error', 'warning', 'info', or 'success'.
 * @see Notifications
 */
export const useSnackbarContext = () => useContext(SnackbarContext);
