import { Grid, Link, makeStyles, Tooltip, Typography } from '@material-ui/core';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import BathtubIcon from '@material-ui/icons/Bathtub';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import GitHubIcon from '@material-ui/icons/GitHub';
import HotelIcon from '@material-ui/icons/Hotel';
import HotTubIcon from '@material-ui/icons/HotTub';
import PeopleIcon from '@material-ui/icons/People';
import PetsIcon from '@material-ui/icons/Pets';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 4),
  },
  item: {
    display: 'flex',
  },
  icon: {
    margin: theme.spacing(0, 1),
    color: theme.palette.background.paper,
  },
  typography: {
    display: 'inline',
    color: theme.palette.getContrastText(theme.palette.grey[800]),
  },
  personIcon1: {
    // fontSize: theme.spacing(3),
    margin: theme.spacing(0, 0, 0, 1),
    color: theme.palette.background.paper,
  },
  personIcon: {
    // fontSize: theme.spacing(3),
    margin: theme.spacing(0),
    color: theme.palette.background.paper,
  },
}))

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Grid container spacing={4}>
        <Grid item className={classes.item}>
          <GitHubIcon fontSize="small" className={classes.icon} />
          <Typography variant="body2" className={classes.typography}>
            {"Project maintained on "}
            <Link href="https://github.com/CS2102-2021-S1-Team21/CS2102_2021_S1_Team21">{"GitHub"}</Link> 
          </Typography>
        </Grid>
        
        <Grid item className={classes.item}>
          <PetsIcon fontSize="small" className={classes.icon} />
          <Typography variant="body2" className={classes.typography}>
            {"Favicon credit: "}
            <Link href="https://www.flaticon.com/authors/freepik" title="Freepik">{"Freepik"}</Link>
          </Typography>
        </Grid>

        <Grid item className={classes.item}>
          <PeopleIcon fontSize="small" className={classes.icon} />
          <Typography variant="body2" className={classes.typography}>
            {"Contributors: "}
          </Typography>
          <a href="https://github.com/dorcastan">
            <Tooltip title="Dorcas Tan">
              <HotelIcon className={classes.personIcon1} />
            </Tooltip>
          </a>
          <a href="https://github.com/Wincenttjoi">
            <Tooltip title="Wincent Tjoi">
              <HotTubIcon className={classes.personIcon} />
            </Tooltip>
          </a>
          <a href="https://github.com/kelvinvin">
            <Tooltip title="Kelvin Wong">
              <ChildFriendlyIcon className={classes.personIcon} />
            </Tooltip>
          </a>
          <a href="https://github.com/YangJiyu98">
            <Tooltip title="Yang Jiyu">
              <BathtubIcon className={classes.personIcon} />
            </Tooltip>
          </a>
          <a href="https://github.com/esatria001">
            <Tooltip title="Enelton Satria">
              <AccessibleForwardIcon className={classes.personIcon} />
            </Tooltip>
          </a>
        </Grid>
      </Grid>
    </div>
  )
}

export default Footer;
