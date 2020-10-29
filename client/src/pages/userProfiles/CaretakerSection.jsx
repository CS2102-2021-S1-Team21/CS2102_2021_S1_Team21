import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import { Box, Chip, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PetsIcon from '@material-ui/icons/Pets';
import api from '../../api';
import { useSnackbarContext } from '../../utilities/snackbar';

const CaretakerSection = (props) => {
  const { handle } = props;
  const showSnackbar = useSnackbarContext();
  const [petCategories, setPetCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [avg, setAverage] = useState(0);

  makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const convertToPetChips = (categories) =>
    categories.map((s) => {
      return (
        <Box component="span" mr={1}>
          <Chip label={s.categoryname} variant="outlined" color="secondary" icon={<PetsIcon />} />
        </Box>
      );
    });

  useEffect(() => {
    showSnackbar(api.caresFor.getCaretakerCaresFor(handle)).then((res) => {
      const registeredCategories = res.selectedResult;
      setPetCategories(convertToPetChips(registeredCategories));
    });
  }, [handle, showSnackbar]);

  useEffect(() => {
    showSnackbar(api.reviews.getReview(handle)).then((res) => {
      if (res[1]) {
        setReviews(res[1]);
        setAverage(res[0]);
      }
    });
  }, [handle, showSnackbar]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, hide: true },
    {
      field: 'postedon',
      headerName: 'Date posted',
      width: 130,
    },
    { field: 'petownerusername', headerName: 'From', width: 150 },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 160,
      renderCell: (params) => (
        <Rating name="read-only" value={params.value} precision={0.5} readOnly />
      ),
    },
    {
      field: 'comment',
      headerName: 'Comment',
      sortable: false,
      width: 730,
    },
  ];

  return (
    <Box>
      <Typography variant="h6">{'Pet Categories I take care of'}</Typography>
      <Box my={1}>{petCategories}</Box>
      <Typography variant="h6">{'Reviews'}</Typography>
      <Box display="flex">
        <Typography variant="subtitle1">{'Average Rating: '}</Typography>
        <Rating name="read-only" value={avg} precision={0.5} readOnly />
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

export default CaretakerSection;
