import { Button, Card, CardActions, CardContent, Typography, 
    List, ListItem, ListItemText, ListItemSecondaryAction, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Paper from '@material-ui/core/Paper';
import SimpleRating from './Browse/SimpleRating';
import SelectPet from './Browse/SelectPet';
import api from '../../api';
import { useStore } from '../../utilities/store';
import SelectTransferType from './Browse/SelectTransferType';
import { isUndefined } from 'lodash';

const Browse = () => {
    const [rating, setRating] = React.useState(2);

    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    
    const [petOptions, setPetOptions] = useState([]);
    const [pet, setPet] = useState();

    const [transferTypeOptions, setTransferTypeOptions] = useState([]);
    const [transferType, setTransferType] = useState();

    const [remarks, setRemarks] = useState();
    const [caretakers, setCaretakers] = useState([]);
    const [dailyPrice, setDailyPrice] = useState();
    const store = useStore();


    useEffect(() => {
        api.pet.getPet(store.user.username).then((x) => setPetOptions(x));
        api.transfer_type.getTransfer_types().then((x) => setTransferTypeOptions(x));
    }, [store.user.username]);

//   useEffect(() => {
//     api.caretakers.getCaretakers().then((x) => setCaretakers(x.entries));
//   }, [store.user.username]);

    useEffect(() => {
        if(pet) {
            api.pet_category.getDailyPrice(pet.categoryname).then((x) => setDailyPrice(x[0].dailyprice));
        }
    }, [pet]);

    const handleApply = async (caretaker) => {
        try {
          const body = {
            petName: pet.name,
            petOwnerUsername: store.user.username,
            caretakerUsername: caretaker.caretakerusername,
            dailyPrice: dailyPrice,
            submittedAt: new Date(),
            startDate: dateFrom,
            endDate: dateTo,
            transferType: transferType,
            remarks: remarks
          };
          await api.bids.applyBids(body);
        } catch (err) {
          console.log(err.message);
        }
      };

    return (
        <>
            <Card style={{ margin: 30 , padding: 30}}>
                <CardContent>
                    <Typography>{'I am looking to book a caretaker for: '}</Typography>
                    <SelectPet petOptions = {petOptions} pet = {pet} setPet ={setPet}/>
                    <SelectTransferType transferTypeOptions = {transferTypeOptions} transferType = {transferType} setTransferType ={setTransferType}/>
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
                    <Typography>{''}</Typography>
                    <TextField 
                        id="standard-basic" 
                        label="Remarks" 
                        onChange={(event) => {
                            setRemarks(event.target.value);
                        }} 
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
                        try {
                            // const body = {
                            //   startDate: dateFrom,
                            //   endDate: dateTo,
                            //   petCategory: pet.categoryname,
                            //   rating: rating,
                            // };
                            // api.caretakers.browseCaretakers(body).then((x) => setCaretakers(x));   
                            api.caretakers.getCaretakers().then((x) => setCaretakers(x.entries))

                        } catch (err) {
                            console.log(err.message);
                        }
                        console.log('rating:' + rating +
                        'Pet:' + pet.name + pet.categoryname + dailyPrice + 'start date: ' + dateFrom + "remarks" +remarks)
                    }}
                    >
                    {'SEARCH'}
                    </Button>
                </CardActions>
            </Card>
            <List>
                { caretakers.map((caretaker) => {
                    return (
                        <Paper style={{ margin: 30 , padding: 30}} key={caretaker.caretakerusername}>   
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                primary={
                                    <Typography
                                            component="span"
                                            variant="h3"
                                            color="Primary"
                                            >
                                            {`${caretaker.caretakerusername}`}
                                        </Typography>
                                        }
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
                                <Button onClick={() => handleApply(caretaker)} color="primary">
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