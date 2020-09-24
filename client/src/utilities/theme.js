import { createMuiTheme } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  // TODO: decide on app colour scheme
  palette: {
    primary: {
      main: deepOrange[500],
    },
  },
});

export default theme;
