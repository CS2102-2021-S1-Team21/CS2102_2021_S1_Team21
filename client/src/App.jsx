import DateFnsUtils from '@date-io/date-fns';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import AppRouter from './components/AppRouter';
import theme from './utilities/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <AppRouter />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
