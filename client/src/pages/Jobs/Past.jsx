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
import api from '../../api';
import { useStore } from '../../utilities/store';
import { useHistory } from 'react-router-dom';


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
                onClick={() => history.push(`/pet-owners/${bid.petownerusername}/pets/${bid.petname}`)}>
                  <ListItemIcon>
                    <PetsIcon color="primary" fontSize="large"/>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography component="span" variant="h3" color="Primary">
                        {`${bid.petname}`}
                      </Typography>
                    }
                    secondary={
                      <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        {`Pet Owner: `}
                      </Typography>
                      {`${bid.petownerusername}`}
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
