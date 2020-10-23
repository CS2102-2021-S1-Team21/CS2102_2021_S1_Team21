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
var moment = require("moment");


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
    try {
      const body = {
        petName: bid.petname,
        petOwnerUsername: bid.petownerusername,
        caretakerUsername: bid.caretakerusername,
        submittedAt: moment(bid.submittedat).format("YYYY-MM-DD HH:mm:ss"),
        startDate: bid.start,
        endDate: bid.end,
        status: 'Completed',
        transactionDateTime: null,
        paymentMethod: null,
        totalAmount: null,
        rating: null,
        comment: null,
        reviewDateTime: null,
      };
      console.log(`bids ${bid.submittedat}`)
      console.log(moment(bid.submittedat).subtract(8, "hours").format("YYYY-MM-DD HH:mm:ss"));
      await api.bids.updateBids(body);
    } catch (err) {
      console.log(`err${err.message}`);
    }
  };

  return (
    <>
      <Paper style={{ margin: 30, padding: 30 }}>
        <Typography>{'Status: Accepted'}</Typography>
      </Paper>
      <List>
        {bids
          .filter((bid) => bid.status === 'Accepted')
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
                      {'Mark as Complete'}
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
