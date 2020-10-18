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
  const username = 'ladygaga';

  useEffect(() => {
    api.bids.getBids(store.user.username).then((x) => setAllBids(x));
  }, [store.user.username]);

  console.log("all bids" + allBids);


//   const fetchPetOwner = async () => {
//     api.petOwners.getPetOwner('notaphoenix@gmail.com').then((res) => {
//       setPetOwner(res);
//     });
//   };

//   useEffect(() => {
//     fetchPetOwner();
//   }, []);
//   return (
    // <Card>
    //   <CardContent>
    //     <Typography>{'Pet Owner Profile'}</Typography>
    //     <Typography color="primary">{`Name: ${petOwner.name}`}</Typography>
    //     <Typography color="secondary">{`Email: ${petOwner.email}`}</Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button
    //       size="small"
    //       variant="outlined"
    //       color="primary"
    //       onClick={() => {
    //         fetchPetOwner();
    //         // api.petOwners
    //         //   .updateOwner(owner)
    //         //   .then((res) => setPetOwner(res))
    //         //   .catch((err) => console.err(err));
    //       }}
    //     >
    //       {'Confirm'}
    //     </Button>
    //   </CardActions>
    // </Card>
//   );


    return (
        <>
            <List>
                { allBids.filter((caretaker) => caretaker.rating >= rating).map((caretaker) => {
                    return (
                        <Paper style={{ margin: 30 , padding: 30}} key={caretaker.id}>   
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                primary={`${caretaker.name}`}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            // className={classes.inline}
                                            color="textPrimary"
                                            >
                                            {`Secondary text `}
                                        </Typography>
                                        {`Secondary`}
                                    </React.Fragment>
                                }/>
                                <ListItemSecondaryAction>
                                    <Button onClick={
                                        () => {console.log(caretaker.id)}}>
                                            {'BOOK ME'}
                                    </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Paper>
                    );
                })}
            </List>
        </>
    )

};

export default Upcoming;