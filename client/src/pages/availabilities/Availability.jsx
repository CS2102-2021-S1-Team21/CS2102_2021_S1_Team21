import {
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import AvailabilityDialog from './AvailabilityDialog';
import { useStore } from '../../utilities/store';
import api from '../../api';
import { useSnackbarContext } from '../../utilities/snackbar';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.5)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  table: {
    minWidth: 350
  },
});

const style = {
  float: 'right',
  marginBottom: '20px',
};

const Availability = () => {
  const classes = useStyles();
  const store = useStore();
  const showSnackbar = useSnackbarContext();

  const [open, setOpen] = useState(false);
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    showSnackbar(api.availability.getAvailability(store.user.username)).then((x) =>
      setAvailability(x),
    );
  }, [store.user.username]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Container>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h4">{'My Availability'}</Typography>
          <p>{'Note:'}</p>
          <p>
            {'- Availability cannot have overlapping dates.'}
          </p>
          <p>
            {
              '- You can only indicate availability until the end of next year ie. 31st December next year.'
            }
          </p>
          <Button variant="contained" color="primary" onClick={handleClickOpen} style={style}>
            {'Add availability\r'}
          </Button>
          <AvailabilityDialog setOpen={setOpen} open={open} />
          <TableContainer component={Paper} >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">{'Available From'}</TableCell>
                  <TableCell align="center">{'Available To'}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {availability.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.start}</TableCell>
                    <TableCell align="center">{row.end}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Availability;
