import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { addHours } from 'date-fns/';
import api from '../../api';
import { useStore } from '../../utilities/store';

const Upcoming = () => {
  const [bids, setBids] = useState([]);
  const [rating, setRating] = React.useState(2);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const store = useStore();

  useEffect(() => {
    api.bids.getCaretakerBids(store.user.username).then((x) => setBids(x));
  }, [store.user.username]);

  const handleAccept = async (bid) => {
    const newSubmittedAt = bid.submittedat.replace(/'/g, '"').replace(' ', 'T0');
    try {
      const body = {
        petName: bid.petname,
        petOwnerUsername: bid.petownerusername,
        caretakerUsername: bid.caretakerusername,
        submittedAt: addHours(bid.submittedat, 8),
        startDate: bid.start,
        endDate: bid.end,
        status: 'Accepted',
        transactionDateTime: null,
        paymentMethod: null,
        totalAmount: null,
        rating: null,
        comment: null,
        reviewDateTime: null,
      };
      console.log(`bids ${addHours(bid.submittedat, 8)}`);
      await api.bids.updateBids(body);
    } catch (err) {
      console.log(`err${err.message}`);
    }
  };

  return (
    <>
      <Paper style={{ margin: 30, padding: 30 }}>
        <Typography>{'Status: Pending'}</Typography>
      </Paper>
      <List>
        {bids
          .filter((bid) => bid.status === 'Pending')
          .map((bid) => {
            return (
              <Paper style={{ margin: 30, padding: 30 }} key={bids.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Typography component="span" variant="h3" color="Primary">
                        {`${bid.petname}`}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="textPrimary">
                          {`${bid.petownerusername}`}
                        </Typography>
                        {` Secondary`}
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        handleAccept(bid);
                      }}
                    >
                      {'Accept'}
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        try {
                          const body = {
                            petName: bids.petName,
                            petOwnerUsername: bids.petOwnerUsername,
                            caretakerUsername: bids.caretakerUsername,
                            submittedAt: bids.submittedAt,
                            startDate: bids.startDate,
                            endDate: bids.endDate,
                            status: 'Rejected',
                            transactionDateTime: null,
                            paymentMethod: null,
                            totalAmount: null,
                            rating: null,
                            comment: null,
                            reviewDateTime: null,
                          };
                          api.bids.updateBids(body);
                        } catch (err) {
                          console.log(err.message);
                        }
                      }}
                    >
                      {'Reject'}
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
            );
          })}
      </List>
    </>
  );
};

export default Upcoming;
