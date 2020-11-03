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
import api from '../../api';
import { useStore } from '../../utilities/store';
import WriteReviewDialog from './Components/writeReviewDialog';
import { useHistory } from 'react-router-dom';

const moment = require('moment');

// TODO need to ensure that ONLY MARK AS COMPLETED AFTER PAYMENT
// if not when updating bids cannot fetch transationdatetime and will cause invalid date error

const Past = () => {
  const [allBids, setAllBids] = useState([]);
  const [rating, setRating] = React.useState();
  const store = useStore();
  const history = useHistory();

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
      console.log(body.submittedAt);
      console.log(bid.transactiondatetime);
      console.log(body.transactionDateTime);
      console.log(`reviewDateTime${body.reviewDateTime}`);
      await api.bids.updateBids(body);
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
                    <PetsIcon color="primary" fontSize="large"/>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography component="span" variant="h3" color="Primary">
                        {`${bids.petname}`}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="textPrimary">
                          {`Caretaker: `}
                        </Typography>
                        {`${bids.caretakerusername}`}
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
