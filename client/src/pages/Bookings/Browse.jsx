import { Button, Card, CardActions, CardContent, Typography, 
    List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import FormCheckbox from '../../components/forms/FormCheckbox';
import Paper from '@material-ui/core/Paper';
import SimpleRating from './Browse/SimpleRating';
import SelectPet from './Browse/SelectPet';



// import api from '../../api';

/** This is a dummy component for demo purposes. The actual one will look quite different. */
const Browse = () => {
  const [petOwner, setPetOwner] = useState({ name: 'Bugs Bunny', email: 'hello@world.org', pet: 'porky' });

  const bookingArray = [
    { name: 'damith', rating: 1, reading: 3, id: 20055 },
    { name: 'damith1', rating: 2, reading: 5, id: 20053 },
    { name: 'damith2', rating: 3, reading: 6, id: 45652 },
    { name: 'damith3', rating: 4, reading: 3, id: 24055 },
    { name: 'damith4', rating: 5, reading: 5, id: 21053 },
    { name: 'damith5', rating: 5, reading: 6, id: 43652 }
];
  const [rating, setRating] = React.useState(2);

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());



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
            <Card style={{ margin: 30 , padding: 30}}>
                <CardContent>
                    <Typography>{'I am looking to book a caretaker for: '}</Typography>
                    <SelectPet/>
                    <Typography>{'From:'}</Typography>
                    <KeyboardDatePicker
                        value={dateFrom}
                        onChange={(date) => setDateFrom(date)}
                        minDate={new Date()}
                        format="yyyy/MM/dd"
                    />
                    <Typography>{'To:'}</Typography>
                    <KeyboardDatePicker
                        value={dateTo}
                        onChange={(date) => setDateTo(date)}
                        minDate={dateFrom}
                        minDateMessage="Date should not be earlier than start Date"
                        format="yyyy/MM/dd"
                    />

                    <Typography>{'Minimum rating: '}</Typography>
                    <SimpleRating rating = {rating} setRating = {setRating}  />
                </CardContent>
                <CardActions>
                    <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        console.log('hello')
                    }}
                    >
                    {'SEARCH'}
                    </Button>
                </CardActions>
            </Card>
            <List>
                { bookingArray.filter((caretaker) => caretaker.rating >= rating).map((caretaker) => {
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

export default Browse;