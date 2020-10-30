import {
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import api from '../../api';
import { useStore } from '../../utilities/store';

const Failed = () => {
  const [allBids, setAllBids] = useState([]);
  const store = useStore();

  useEffect(() => {
    api.bids.getPetOwnerBids(store.user.username).then((x) => setAllBids(x));
  }, [store.user.username]);

  console.log(`all bids${allBids}`);

  return (
    <>
      <Paper style={{ margin: 30, padding: 30 }}>
        <Typography>{'Status: Expired/Rejected'}</Typography>
      </Paper>
      <List>
        {allBids
          .filter((bids) => bids.status === 'Expired' || bids.status === 'Rejected')
          .map((bids) => {
            return (
              <Paper style={{ margin: 30, padding: 30 }} key={bids.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={`${bids.caretakerusername}`}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          // className={classes.inline}
                          color="textPrimary"
                        >
                          {`Secondary text `}
                        </Typography>
                        {`Secondary`}
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

export default Failed;
