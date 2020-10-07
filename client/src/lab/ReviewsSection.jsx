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
  const [avg, setAverage] = useState(5);

  makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  useEffect(() => {
    api.reviews.getReview(handle).then((res) => {
      setReviews(res[1]);
      setAverage(res[0]);
    });
  }, [handle]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, hide: true },
    {
      field: 'postedon',
      headerName: 'Date posted',
      width: 130,
    },
    { field: 'caretakerUsername', headerName: 'From', width: 170 },
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
      <Box display="flex">
        <Typography variant="subtitle1">{'Average Rating: '}</Typography>
        <Rating name="read-only" value={avg} readOnly />
      </Box>
      <div style={{ height: 525, width: '100%' }}>
        <DataGrid
          rowHeight={90}
          headerHeight={0}
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
