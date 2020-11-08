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
import { useSnackbarContext } from '../../utilities/snackbar';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const style = {
  float: 'right',
  marginBottom: '20px',
};

const Leaves = () => {
  const classes = useStyles();
  const store = useStore();
  const showSnackbar = useSnackbarContext();

  const [open, setOpen] = useState(false);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    showSnackbar(api.leaves.getLeaves(store.user.username)).then((x) => setLeaves(x));
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

  const cancelLeave = async (row) => {
    try {
  
      const body = {
        caretakerUsername: row.caretakerusername,
        startDate: row.start,
        endDate: row.end
      }    
      console.log(body)
      showSnackbar(api.leaves.cancelLeave(body));
    } catch (err) {
      console.log(err.message);
    }
  }

  // const handleApply = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const body = {
  //       startDate: format(selectedDateFrom, 'yyyy-MM-dd'),
  //       endDate: format(selectedDateTo, 'yyyy-MM-dd'),
  //       caretakerUsername: store.user.username,
  //       isEmergency: 'FALSE',
  //     };
  //     await showSnackbar(api.leaves.applyLeave(body));
  //     setOpen(false);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  return (
    <Container>
      <h1>{'Leave Application\r'}</h1>
      <Card>
        <CardContent>
          <p>{'Note:'}</p>
          <p>{'- You must work for a minimum of 2 sets of 150 consecutive days a year. '}</p>
          <p>{'- Leave cannot have overlapping dates'}</p>
          <p>{'- You cannot apply for leave when you are in charge of any pet during the leave period'}</p>
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
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left">{row.start}</TableCell>
                <TableCell align="right">{row.end}</TableCell>
                <TableCell align="right">{renderEmergency(row.isemergency)}</TableCell>
                <TableCell align="right">{renderApproval(row.isapproved)}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="secondary" onClick={() => cancelLeave(row)}>
                    {"Cancel"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Leaves;
