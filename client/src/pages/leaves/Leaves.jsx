import { Box, Button, Dialog } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DialogActions from '@material-ui/core/DialogActions';
import LeaveDialogContent from './LeaveDialogContent';

const columns = [
  { id: 'startDate', label: 'Start Date', minWidth: 170 },
  { id: 'endDate', label: 'End Date', minWidth: 100 },
  {
    id: 'isApproved',
    label: 'Approval Status',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(startDate, endDate, isApproved) {
  return { startDate, endDate, isApproved };
}

const rows = [
  createData('2020-11-09', '2020-11-11', 'Not approved'),
  createData('09 November 2020', '11 November 2020', 'Pending'),
  createData('What format should we use', 'HUH', 'Approved'),
];

const useStyles = makeStyles({
  root: {
    width: '80%',
  },
  container: {
    maxHeight: 440,
  },
});

const style = {
  marginBottom: '20px',
};

/** This is a dummy component for demo purposes. The actual one will look quite different. */
const Leaves = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleApply = () => {
    setOpen(false);
    // TODO: set up backend api request
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      <h1>{'Leaves taken: __ days\r'}</h1>
      <br />
      <Button variant="contained" color="primary" onClick={handleClickOpen} style={style}>
        {'Apply Leave\r'}
      </Button>
      <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
        <LeaveDialogContent />
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            {'Cancel\r'}
          </Button>
          <Button onClick={handleApply} color="primary">
            {'Apply\r'}
          </Button>
        </DialogActions>
      </Dialog>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default Leaves;
