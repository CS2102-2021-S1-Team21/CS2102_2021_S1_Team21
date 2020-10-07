import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import { Box, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import api from '../api';

/** This is a dummy component for demo purposes. The actual one will look quite different. */
const ReviewsSection = (props) => {
  const { handle } = props;

  // const [average, setAverage] = useState();
  const [reviews, setReviews] = useState([]);

  makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  useEffect(() => {
    api.reviews
      .getReview(handle)
      .then((res) => {
        setReviews(res);
      })
      .then();
  }, [handle]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'postedon',
      headerName: 'Date posted',
      width: 130,
    },
    { field: 'caretakeremail', headerName: 'From', width: 170 },
    {
      field: 'servicetype',
      headerName: 'Service',
      type: 'date',
      width: 150,
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 160,
      renderCell: (params) => <Rating name="read-only" value={params.value} readOnly />,
    },
    {
      field: 'comment',
      headerName: 'Comment',
      sortable: false,
      width: 500,
    },
  ];

  return (
    <Box mt={3}>
      <Typography variant="h5">{'Reviews'}</Typography>
      <Box fontWeight={5} component="span">
        <Typography variant="subtitle1">{'Average Rating: '}</Typography>
        <Rating name="read-only" value={3} readOnly />
      </Box>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rowHeight={80}
          disableSelectionOnClick="true"
          rows={reviews}
          columns={columns}
          pageSize={5}
        />
      </div>
    </Box>
  );
};

export default ReviewsSection;
