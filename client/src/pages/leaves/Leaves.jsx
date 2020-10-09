import { Button, Container } from '@material-ui/core';
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
      <h1>{'Leaves taken: __ days\r'}</h1>
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
              <TableRow key={row.index}>
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
