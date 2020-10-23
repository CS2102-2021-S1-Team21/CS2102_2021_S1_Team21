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

const moment = require('moment');

const Upcoming = () => {
  const [bids, setBids] = useState([]);
  const [rating, setRating] = React.useState(2);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const store = useStore();

  useEffect(() => {
    api.bids.getCaretakerBids(store.user.username).then((x) => setBids(x));
  }, [store.user.username]);

  return (
    <>
      <Paper style={{ margin: 30, padding: 30 }}>
        <Typography>{'Status: Rejected'}</Typography>
      </Paper>
      <List>
        {bids
          .filter((bid) => bid.status === 'Rejected')
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
                </ListItem>
              </Paper>
            );
          })}
      </List>
    </>
  );
};

export default Upcoming;
