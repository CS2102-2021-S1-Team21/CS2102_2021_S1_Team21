import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Container, makeStyles, Paper } from '@material-ui/core';
import api from '../../api';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
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
    api.adminDashboard.getCaretakerRanking().then((res) => {
      console.log(res.result);
      setRows(res.result);
      setMonth(res.resultMonth);
      console.log(res.resultMonth);
    });
  }, []);

  return (
    <Container>
      <Paper className={classes.paper}>
        <h1>
          {'Leaderboard for '}
          {reportMonth}
        </h1>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid disableSelectionOnClick="true" rows={rows} columns={columns} pageSize={10} />
        </div>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
