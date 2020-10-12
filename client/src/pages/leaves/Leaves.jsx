import { Button, CardContent, Container, Card } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LeaveDialogContent from './LeaveDialogContent';
import api from '../../api';
import { useStore } from '../../utilities/store';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const style = {
  float: 'right',
  marginBottom: '20px',
};

/** This is a dummy component for demo purposes. The actual one will look quite different. */
const Leaves = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [leaves, setLeaves] = useState([]);
  const store = useStore();

  useEffect(() => {
    api.leaves.getLeaves(store.user.username).then((x) => setLeaves(x));
  }, [store.user.username]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  function renderApproval(isApproved) {
    if (isApproved) {
      return <p>{'Approved'}</p>;
    }
    return <p>{'Not Approved'}</p>;
  }

  function renderEmergency(isEmergency) {
    if (isEmergency) {
      return <p>{'Yes'}</p>;
    }
    return <p>{'No'}</p>;
  }

  return (
    <Container>
      <h1>{'Leave Application\r'}</h1>
      <Card>
        <CardContent>
          <h4>{'Consecutive working day(s):'}</h4>
          <h4>{'Total set of 150 days achieved since *date of appuser created at*:'}</h4>
          <p>
            {'Note:'}
            <br />
            {
              '- You must work for a minimum of 2 sets of 150 consecutive days a year. Once your leave is approved,'
            }
            {'your consecutive working day(s) will be reset to 0.'}
            <br />
            {'- Leave cannot have overlapping dates (Even if start and end date is same) '} 
            <br />
            {
              '- Start and end date starts and ends at 8am respectively. Eg: If you want to take leave on Monday 11th January 2020, '
            }
            {' '}
            <br />
            {'you have put it as FROM: 11/01/2020 TO: 12/01/2020 (Not TO: 11/01/2020)'}
          </p>
        </CardContent>
      </Card>
      <br />
      <Button variant="contained" color="primary" onClick={handleClickOpen} style={style}>
        {'Apply Leave\r'}
      </Button>
      <LeaveDialogContent setOpen={setOpen} open={open} />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{'Start Date'}</TableCell>
              <TableCell align="right">{'End Date'}</TableCell>
              <TableCell align="right">{'Emergency Leave'}</TableCell>
              <TableCell align="right">{'Approval Status'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left">{row.start}</TableCell>
                <TableCell align="right">{row.end}</TableCell>
                <TableCell align="right">{renderEmergency(row.isemergency)}</TableCell>
                <TableCell align="right">{renderApproval(row.isapproved)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Leaves;
