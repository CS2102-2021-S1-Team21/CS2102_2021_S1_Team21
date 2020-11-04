import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon
} from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import api from '../../api';
import { useStore } from '../../utilities/store';
import WriteReviewDialog from './Components/writeReviewDialog';
import { useSnackbarContext } from '../../utilities/snackbar';
import { formatDate } from '../../utilities/datetime';
import SecondaryInfo from './Components/SecondaryInfo';

// TODO need to ensure that ONLY MARK AS COMPLETED AFTER PAYMENT
// if not when updating bids cannot fetch transationdatetime and will cause invalid date error

const Past = () => {
  const [allBids, setAllBids] = useState([]);
  const [rating, setRating] = React.useState();
  const store = useStore();
  const history = useHistory();
  const showSnackbar = useSnackbarContext();

  useEffect(() => {
    api.bids.getPetOwnerBids(store.user.username).then((x) => setAllBids(x));
  }, [store.user.username]);

  const handleClick = async (bidRating, comment, bid) => {
    try {
      const body = {
        petName: bid.petname,
        petOwnerUsername: bid.petownerusername,
        caretakerUsername: bid.caretakerusername,
        submittedAt: moment(bid.submittedat).format('YYYY-MM-DD HH:mm:ss.SSS'),
        startDate: bid.start,
        endDate: bid.end,
        status: bid.status,
        transactionDateTime: moment(bid.transactiondatetime).format('YYYY-MM-DD HH:mm:ss.SSS'),
        paymentMethod: bid.paymentmethod,
        totalAmount: null,
        rating: bidRating,
        comment,
        reviewDateTime: moment.utc(moment(), 'YYYY-MM-DD HH:mm:ss.SSS'),
      };
      await showSnackbar(api.bids.updateBids(body));
    } catch (err) {
      console.log(`err${err.message}`);
    }
  };

  return (
    <>
      <Paper style={{ margin: 30, padding: 30 }}>
        <Typography>{'Status: Completed'}</Typography>
      </Paper>
      <List>
        {allBids
          .filter((bids) => bids.status === 'Completed')
          .map((bids) => {
            return (
              <Paper style={{ margin: 30, padding: 30 }} key={bids.id}>
                <ListItem 
                  alignItems="flex-start"
                  button
                  onClick={() => history.push(`/profile/${bids.caretakerusername}`)}
                >
                  <ListItemIcon>
                    <PetsIcon color="primary" fontSize="large" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography component="span" variant="h3" color="Primary">
                        {`${bids.petname}`}
                      </Typography>
                    }
                    secondary={
                      <>
                        <SecondaryInfo label="Caretaker: " content={bids.caretakerusername} />
                        <br />
                        <SecondaryInfo label="Start Date: " content={formatDate(bids.startdate)} />
                        <br />
                        <SecondaryInfo label="End Date: " content={formatDate(bids.enddate)} />
                        <br />
                        <SecondaryInfo label="Transfer Type: " content={bids.transfertype} />
                        <br />
                        <SecondaryInfo label="Remarks: " content={bids.remarks} />
                        <br />
                        <SecondaryInfo label="Total Amount: " content={`$${bids.totalamount}`} />
                        <br />
                        <SecondaryInfo label="Payment Date: " content={formatDate(bids.transactiondatetime)} />
                        <br />
                        <SecondaryInfo label="Payment Method: " content={bids.paymentmethod || 'Not selected yet'} />
                        <br />
                        <SecondaryInfo label="Review Date: " content={formatDate(bids.reviewdatetime)} />
                        <br />
                        <SecondaryInfo label="Review Comments: " content={bids.comment} />
                        <br />
                        <SecondaryInfo label="Rating: " content={bids.rating} />
                      </>
                    }
                  />
                  <ListItemText />
                  <ListItemSecondaryAction>
                    <WriteReviewDialog
                      rating={rating}
                      setRating={setRating}
                      handleUpdateBid={handleClick}
                      bids={bids}
                      isDisabled={bids.reviewdatetime}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
            );
          })}
      </List>
    </>
  );
};

export default Past;
