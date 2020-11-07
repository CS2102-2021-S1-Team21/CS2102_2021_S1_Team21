import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Container, makeStyles, Paper } from '@material-ui/core';
import api from '../../api';
import { useSnackbarContext } from '../../utilities/snackbar';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();
  const showSnackbar = useSnackbarContext();
  const [rows, setRows] = useState([]);
  const [reportMonth, setMonth] = useState([]);
  const [performanceRow, setPerformanceRow] = useState([]);

  const columns = [
    { field: 'rank', headerName: 'Rank', description: 'Based on Cumulative Score', width: 90 },
    { field: 'caretakerusername', headerName: 'Username', width: 150, sortable: false },
    {
      field: 'role',
      headerName: 'Role',
      width: 100,
    },
    {
      field: 'satisfactionscore',
      headerName: 'Customer Satisfaction',
      description: 'Average rating of caretaker multiplied by 10',
      width: 200,
    },
    {
      field: 'efficiencyscore',
      headerName: 'Efficiency',
      description:
        'Relative number of jobs taken by a caretaker this month compared to the average of their role, multiplied by 25',
      width: 150,
    },
    {
      field: 'popularityscore',
      headerName: 'Popularity',
      description:
        'Relative number of bids received by a caretaker this month compared to the average of their role, multiplied by 25',
      width: 150,
    },
    {
      field: 'totalscore',
      headerName: 'Cumulative Score',
      description: 'Sum of other scores',
      width: 200,
    },
  ];

  const columnsPerformance = [
    { field: 'caretakerusername', headerName: 'Username', width: 150, sortable: false },
    {
      field: 'role',
      headerName: 'Role',
      width: 100,
    },
    {
      field: 'jobcount',
      headerName: 'Job Count',
      description: '',
      width: 100,
    },
    {
      field: 'bidcount',
      headerName: 'Bid Count',
      description:
        '',
      width: 100,
    },
    {
      field: 'averagerating',
      headerName: 'Rating',
      description:
        '',
      width: 100,
    },
    {
      field: 'petdaycount',
      headerName: 'Pet Day',
      description: 'Total Number of Pet Day the caretaker serviced last month',
      width: 100,
    },
    {
      field: 'invoiceamount',
      headerName: 'Invoice Amount',
      description: 'Total Monthly Revenue earned by each Caretaker. This is the amount the Petowner paid for the service and is calculated using the formula: Number of service days x Daily Price.',
      width: 150,
    },
    {
      field: 'basesalary',
      headerName: 'Base Salary',
      description: 'Only Full Time Employees have $2,500 base monthly salary',
      width: 150,
    },
    {
      field: 'variablesalary',
      headerName: 'Variable Salary',
      description: '',
      width: 150,
    },
    {
      field: 'variablepercentage',
      headerName: 'Variable %',
      description: 'For Part Timers, the variable percentage is 80% if the total Monthly Invoice Amount > $500. Else, the variable percentage is lower at 60%. For Full Timers, if their Invoice Amount > $2,500, they will be entitled 50% of the share for the excess portions.',
      width: 150,
    },
    {
      field: 'totalsalary',
      headerName: 'Total Salary',
      description: 'Sum of the Base Salary and Variable Salary',
      width: 150,
    },
    {
      field: 'profitmargin',
      headerName: 'Profit Margin',
      description: 'The monthly revenue (Total Invoice) - total monthly salary paid to each employee (Total Salary)',
      width: 150,
    },
    {
      field: 'performance',
      headerName: 'Performance',
      description: 'Excellent performance if the monthly Profit Margin > $500. Good performance for Profit Margin between $0 and $499. Underperforming for those who fall below $0 (only applicable for full-timers)',
      width: 200,
    },
  ];

  useEffect(() => {
    showSnackbar(api.adminDashboard.getPerformance()).then((res) => {
      setPerformanceRow(res);
    });
  }, []);

  useEffect(() => {
    showSnackbar(api.adminDashboard.getCaretakerRanking()).then((res) => {
      if (res.info) return; // hacky way to check for no results
      setRows(res.result);
      setMonth(res.resultMonth);
    });
  }, []);

  return (
    <Container>
      <Paper className={classes.paper}>
        <h1>
          {'Caretaker Performance for '}
          {reportMonth}
        </h1>
        <div style={{ height: 640, width: '100%' }}>
          <DataGrid disableSelectionOnClick="true" rows={performanceRow} columns={columnsPerformance} pageSize={10} />
        </div>
      </Paper>
      <Paper className={classes.paper}>
        <h1>
          {'Leaderboard for '}
          {reportMonth}
        </h1>
        <div style={{ height: 640, width: '100%' }}>
          <DataGrid disableSelectionOnClick="true" rows={rows} columns={columns} pageSize={20} />
        </div>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
