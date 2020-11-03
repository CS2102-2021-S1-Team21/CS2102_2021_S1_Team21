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
