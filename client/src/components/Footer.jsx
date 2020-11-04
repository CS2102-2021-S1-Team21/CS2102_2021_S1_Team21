import { Box, Grid, Link, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import PetsIcon from '@material-ui/icons/Pets';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 4),
  },
  item: {
    display: 'flex',
  },
  icon: {
    margin: theme.spacing(0, 1),
  },
  typography: {
    display: 'inline',
    padding: theme.spacing(0),
  }
}))

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Grid container spacing={4}>
        <Grid item className={classes.item}>
          <GitHubIcon fontSize="small" className={classes.icon} />
          <Typography className={classes.typography}>
            {"Project maintained on "}
            <Link href="https://github.com/CS2102-2021-S1-Team21/CS2102_2021_S1_Team21">{"GitHub"}</Link> 
          </Typography>
        </Grid>
        
        <Grid item className={classes.item}>
          <PetsIcon fontSize="small" className={classes.icon} />
          <Typography className={classes.typography}>
            {"Favicon credit: "}
            <Link href="https://www.flaticon.com/authors/freepik" title="Freepik">{"Freepik"}</Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default Footer;
