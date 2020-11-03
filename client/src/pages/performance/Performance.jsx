import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Container, makeStyles, Paper } from '@material-ui/core';
import api from '../../api';
import { useSnackbarContext } from '../../utilities/snackbar';
import { useStore } from '../../utilities/store';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const Performance = () => {
  const classes = useStyles();
  const store = useStore();
  const showSnackbar = useSnackbarContext();
  const [rows, setRows] = useState([]);
  const [personalPerformanceRows, setPersonalPerformanceRows] = useState([]);
  const [reportMonth, setMonth] = useState([]);

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
      width: 200,
    },
    {
      field: 'bidcount',
      headerName: 'Bid Count',
      description:
        '',
      width: 150,
    },
    {
      field: 'averagerating',
      headerName: 'Average Rating',
      description:
        '',
      width: 150,
    },
    {
      field: 'petdaycount',
      headerName: 'Pet Day',
      description: 'Total Number of Pet Day the caretaker serviced last month',
      width: 200,
    },
    {
      field: 'invoiceamount',
      headerName: 'Invoice Amount',
      description: 'Total Monthly Revenue earned by each Caretaker. This is the amount the Petowner paid for the service and is calculated using the formula: Number of service days x Daily Price.',
      width: 200,
    },
    {
      field: 'variablepercentage',
      headerName: 'Variable %',
      description: 'For Part Timers, the variable percentage is 80% if the total Monthly Invoice Amount > $500. Else, the variable percentage is at 60%. For Full Timers, if Invoice Amount > $2,500, they will be entitled 50% of the share for the excess portions.',
      width: 200,
    },
    {
      field: 'basesalary',
      headerName: 'Base Salary',
      description: 'Only Full Time Employees have $2,500 base monthly salary',
      width: 200,
    },
    {
      field: 'variablesalary',
      headerName: 'Variable Salary',
      description: '',
      width: 200,
    },
    {
      field: 'totalsalary',
      headerName: 'Total Salary',
      description: 'Sum of the Base Salary and Variable Salary',
      width: 200,
    },
    {
      field: 'profitmargin',
      headerName: 'Profit Margin',
      description: 'The monthly revenue (Total Invoice) - total monthly salary paid to each employee (Total Salary)',
      width: 200,
    },
    {
      field: 'performance',
      headerName: 'Performance',
      description: 'Excellent performance if the monthly Profit Margin > $500. Good performance for Profit Margin between $0 and $499. Underperforming for those who fall below $0 (only applicable for full-timers)',
      width: 200,
    },
  ];

  useEffect(() => {
    showSnackbar(api.adminDashboard.getCaretakerRanking()).then((res) => {
      if (res.info) return; // hacky way to check for no results
      setRows(res.result);
      setMonth(res.resultMonth);
    });
    showSnackbar(api.caretakers.getSalary(store.user.username)).then((res) => {
      setPersonalPerformanceRows(res);
    })
  }, []);

  console.log(personalPerformanceRows)
  console.log(rows)

  return (
    <Container>
      <Paper className={classes.paper}>
      <h1>
          {'For the month of '}
          {reportMonth}
        </h1>
        <h1>
          {'My Performance'}
        </h1>
        <div style={{ height: 185, width: '100%' }}>
        <DataGrid disableSelectionOnClick="true" rows={personalPerformanceRows} columns={columnsPerformance}/>
        </div>
        <h1>
          {'Leaderboard'}
        </h1>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid disableSelectionOnClick="true" rows={rows} columns={columns} pageSize={10} />
        </div>
      </Paper>
    </Container>
  );
};

export default Performance;
