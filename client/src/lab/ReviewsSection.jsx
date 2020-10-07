import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import { Card, Box, CardContent, Container, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import api from '../api';

/** This is a dummy component for demo purposes. The actual one will look quite different. */
const ReviewsSection = (props) => {
  const { handle } = props;

  const [average, setAverage] = useState();
  const [reviews, setReviews] = useState();

  makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  function getDemoReviews() {
    const demoData = [
      { rating: 5, comment: 'yeahh', date: '27/05/2020', by: 'thomas' },
      { rating: 1, comment: 'nah', date: '27/05/2020', by: 'tim' },
      { rating: 3, comment: 'ok', date: '27/05/2020', by: 'tom' },
    ];
    for (let i = 1; i <= demoData.length; i++) {
      demoData[i - 1].id = i;
    }
    return demoData;
  }

  useEffect(() => {
    // api.reviews.getReviews(handle).then((res) => {
    //   setReviews(res);
    // });
  }, [handle]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 180,
      renderCell: (params) => <Rating name="read-only" value={params.value} readOnly />,
    },
    { field: 'by', headerName: 'From', width: 170 },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      width: 130,
    },
    {
      field: 'comment',
      headerName: 'Comment',
      sortable: false,
      width: 500,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  return (
    <Box mt={3}>
      <Typography variant="h5">{'Reviews'}</Typography>
      <Box component="span">
        <Typography variant="subtitle1">{'Average Rating: '}</Typography>
        <Rating name="read-only" value={3} readOnly />
      </Box>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rowHeight={80}
          disableSelectionOnClick="true"
          rows={getDemoReviews()}
          columns={columns}
          pageSize={5}
        />
      </div>
    </Box>
  );
};

export default ReviewsSection;
