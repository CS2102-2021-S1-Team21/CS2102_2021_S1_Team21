import {
  Button,
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
import { useSnackbarContext } from '../../utilities/snackbar';
import { useStore } from '../../utilities/store';

const Upcoming = () => {
  const [allBids, setAllBids] = useState([]);

  const store = useStore();
  const history = useHistory();
  const showSnackbar = useSnackbarContext();

  const updateBids = (username) => {
    api.bids.getPetOwnerBids(store.user.username).then((x) => setAllBids(x));
  };

  useEffect(() => {
    updateBids(store.user.username);
  }, [updateBids, store.user.username]);

  const handleClick = async (bid) => {
    try {
      const params = {
        petName: bid.petname,
        petOwnerUsername: bid.petownerusername,
        caretakerUsername: bid.caretakerusername,
        submittedAt: moment(bid.submittedat).format('YYYY-MM-DD HH:mm:ss.SSS'),
        startDate: bid.start,
        endDate: bid.end,
      };
      await showSnackbar(api.bids.deleteBid(params)).then(() => updateBids(store.user.username));
    } catch (err) {
      console.error(err.message);
    }
  };

  console.log(`all bids${allBids}`);

  return (
    <>
      <Paper style={{ margin: 30, padding: 30 }}>
        <Typography>{'Status: Pending'}</Typography>
      </Paper>
      <List>
        {allBids
          .filter((bids) => bids.status === 'Pending')
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
                        <Typography component="span" variant="body2" color="textPrimary">
                          {`Caretaker: `}
                        </Typography>
                        {`${bids.caretakerusername}`}
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Button
                      variant="outlined"
                      onClick={() => handleClick(bids)}
                    >
                      {'Cancel'}
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
