import { Button, Typography, 
    List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import api from '../../api';
import { useStore } from '../../utilities/store';


const Upcoming = () => {
  const [allBids, setAllBids] = useState([]);
  const [rating, setRating] = React.useState(2);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const store = useStore();

  useEffect(() => {
    api.bids.getBids(store.user.username).then((x) => setAllBids(x));
  }, [store.user.username]);



  console.log("all bids" + allBids);

    return (
        <>
            <Paper style={{ margin: 30 , padding: 30}}>
                <Typography>{'Status: Completed'}</Typography>
            </Paper>
            <List>
                { allBids.filter((bids) => bids.status == 'Completed').map((bids) => {
                    return (
                        <Paper style={{ margin: 30 , padding: 30}} key={bids.id}>   
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={<Typography
                                        component="span"
                                        variant="body2"
                                        color="Primary"
                                        variant = "h2"
                                        >
                                        {`${bids.petname}`}
                                    </Typography>}

                                    secondary={
                                        <div>
                                            <Typography
                                                component="span"
                                                variant="body1"
                                                >
                                                {`Caretaker: ${bids.caretakerusername}
                                                 Applied on: ${bids.submittedat}
                                                 Start date: ${bids.startdate} 
                                                 End date: ${bids.enddate}
                                                 Transfer type: ${bids.transfertype}
                                                 Remarks: ${bids.remarks}`}
                                            </Typography>
                                        </div>
                                        }
                                    />
                                <ListItemText/> 
                            </ListItem>
                        </Paper>
                    );
                })}
            </List>
        </>
    )

};

export default Upcoming;