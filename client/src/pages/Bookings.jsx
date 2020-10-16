import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Browse from './Bookings/Browse';
import Upcoming from './Bookings/Upcoming';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Bookings = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <h1> My Bookings </h1>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}  variant="scrollable"
          scrollButtons="auto" aria-label="PetOwner Tabs">
          <Tab label="Browse" {...a11yProps(0)} />
          <Tab label="Upcoming" {...a11yProps(1)} />
          <Tab label="Pending" {...a11yProps(2)} />
          <Tab label="Past" {...a11yProps(3)} />
          <Tab label="Failed" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Browse/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Upcoming/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Pending
      </TabPanel>
      <TabPanel value={value} index={3}>
        Past
      </TabPanel>
      <TabPanel value={value} index={4}>
        Failed
      </TabPanel>
    </div>
  );
}

export default Bookings;