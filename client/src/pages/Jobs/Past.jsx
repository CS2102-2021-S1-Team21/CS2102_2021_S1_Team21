import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import api from '../../api';
import { useStore } from '../../utilities/store';
import SecondaryInfo from './SecondaryInfo';
import { formatDate } from '../../utilities/datetime';

const Upcoming = () => {
  const [bids, setBids] = useState([]);
  const store = useStore();
  const history = useHistory();

  useEffect(() => {
    api.bids.getCaretakerBids(store.user.username).then((x) => setBids(x));
  }, [store.user.username]);

  return (
    <>
      <Paper style={{ margin: 30, padding: 30 }}>
        <Typography>{'Status: Completed'}</Typography>
      </Paper>
      <List>
        {bids
          .filter((bid) => bid.status === 'Completed')
          .map((bid) => {
            return (
              <Paper style={{ margin: 30, padding: 30 }} key={bids.id}>
                <ListItem 
                  alignItems="flex-start"
                  button
                  onClick={() => history.push(`/pet-owners/${bid.petownerusername}/pets/${bid.petname}`)}
                >
                  <ListItemIcon>
                    <PetsIcon color="primary" fontSize="large" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography component="span" variant="h3" color="Primary">
                        {`${bid.petname}`}
                      </Typography>
                    }
                    secondary={
                      <>
                        <SecondaryInfo label="Pet Owner: " content={bid.petownerusername} />
                        <br />
                        <SecondaryInfo label="Start Date: " content={formatDate(bid.startdate)} />
                        <br />
                        <SecondaryInfo label="End Date: " content={formatDate(bid.enddate)} />
                      </>
                    }
                  />
                  <ListItemText 
                    secondary={
                      <>
                        <SecondaryInfo label="Transfer Type: " content={bid.transfertype} />
                        <br />
                        <SecondaryInfo label="Remarks: " content={bid.remarks} />
                        <br />
                        <SecondaryInfo label="Total Amount: " content={`$${bid.totalamount}`} />
                        <br />
                        <SecondaryInfo label="Payment Date: " content={formatDate(bid.transactiondatetime)} />
                        <br />
                        <SecondaryInfo label="Payment Method: " content={bid.paymentmethod || 'Not selected yet'} />
                        {bids.reviewdate && 
                          <>
                            <br />
                            <SecondaryInfo label="Review Date: " content={formatDate(bids.reviewdatetime)} />
                          </>}
                        <br />
                        <SecondaryInfo label="Review Comments: " content={bids.comment || 'No comments yet'} />
                        <br />
                        <SecondaryInfo label="Rating: " content={bids.rating || 'No rating yet'} />
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
