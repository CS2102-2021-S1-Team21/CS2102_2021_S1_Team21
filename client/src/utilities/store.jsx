import React, { useContext } from 'react';

const StoreContext = React.createContext({});

export const StoreProvider = (props) => <StoreContext.Provider {...props} />;

export const useStore = () => useContext(StoreContext);
