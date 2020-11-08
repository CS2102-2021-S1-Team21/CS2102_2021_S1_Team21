import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { format } from 'date-fns';
import api from '../../api';
import { useSnackbarContext } from '../../utilities/snackbar';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: 50,
  },
  container: {
    maxHeight: 800,
  },
  button: {
    marginTop: 20,
  },
});

const LeaveRequest = () => {
  const classes = useStyles();
  const showSnackbar = useSnackbarContext();
  const [pendingLeaves, setPendingLeaves] = useState([]);

  useEffect(() => {
    showSnackbar(api.leaves.getAllPendingLeaves()).then((res) => {
      setPendingLeaves(res);
    });
  }, []);
  console.log(pendingLeaves);

  const handleApproval = async (index) => {
    const item = pendingLeaves[index];
    const start = format(new Date(item.startdate), 'yyyy-MM-dd');
    const end = format(new Date(item.enddate), 'yyyy-MM-dd');
    try {
      await showSnackbar(api.leaves.updateLeaveApproved(item.caretakerusername, start, end));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{'Caretaker Username'}</TableCell>
            <TableCell>{'Start Date'}</TableCell>
            <TableCell>{'End Date'}</TableCell>
            <TableCell>{''}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingLeaves.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.caretakerusername}
              </TableCell>
              <TableCell>{row.start}</TableCell>
              <TableCell>{row.end}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleApproval(index)}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  {'Approve'}
                </Button>
                {/* {renderEmergency(row.isemergency)} */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaveRequest;
