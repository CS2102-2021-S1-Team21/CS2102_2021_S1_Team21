import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography, Paper } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import api from '../../api';
import { formatDate } from '../../utilities/datetime';
import { useSnackbarContext } from '../../utilities/snackbar';
import { useStore } from '../../utilities/store';
import SecondaryInfo from './Components/SecondaryInfo';
import SelectPaymentMethod from './Components/selectPaymentMethod';

const Upcoming = () => {
  const [allBids, setAllBids] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentMethodOptions, setPaymentMethodOptions] = useState([]);
  const store = useStore();
  const history = useHistory();
  const showSnackbar = useSnackbarContext();

  useEffect(() => {
    api.bids.getPetOwnerBids(store.user.username).then((response) => setAllBids(response));
    api.paymentMethod.getPaymentMethods().then((x) => setPaymentMethodOptions(x));
  }, [store.user.username]);

  console.log(allBids);

  const handleClick = async (bidPaymentMethod, bid) => {
    try {
      const body = {
        petName: bid.petname,
        petOwnerUsername: bid.petownerusername,
        caretakerUsername: bid.caretakerusername,
        submittedAt: moment(bid.submittedat).format('YYYY-MM-DD HH:mm:ss.SSS'),
        startDate: bid.start,
        endDate: bid.end,
        status: bid.status,
        transactionDateTime: moment.utc(moment(), 'YYYY-MM-DD HH:mm:ss.SSS'),
        paymentMethod: bidPaymentMethod,
        totalAmount: null,
        rating: null,
        comment: null,
        reviewDateTime: null,
      };
      await showSnackbar(api.bids.updateBids(body));
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
        {allBids
          .filter((bids) => bids.status === 'Accepted')
          .map((bid) => {
            return (
              <Paper style={{ margin: 30, padding: 30 }} key={bid.id}>
                <ListItem 
                  alignItems="flex-start"
                  button
                  onClick={() => history.push(`/profile/${bid.caretakerusername}`)}
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
                        <SecondaryInfo label="Caretaker: " content={bid.caretakerusername} />
                        <br />
                        <SecondaryInfo label="Start Date: " content={formatDate(bid.startdate)} />
                        <br />
                        <SecondaryInfo label="End Date: " content={formatDate(bid.enddate)} />
                        <br />
                        <SecondaryInfo label="Transfer Type: " content={bid.transfertype} />
                        <br />
                        <SecondaryInfo label="Remarks: " content={bid.remarks} />
                        <br />
                        <SecondaryInfo label="Total Amount: " content={`$${bid.totalamount}`} />
                        {bid.transactiondatetime && 
                          <>
                            <br />
                            <SecondaryInfo label="Payment Date: " content={formatDate(bid.transactiondatetime)} />
                          </>}
                        <br />
                        <SecondaryInfo label="Payment Method: " content={bid.paymentmethod || 'Not selected yet'} />
                      </>
                    }
                  />
                  <ListItemText />
                  <ListItemSecondaryAction>
                    <SelectPaymentMethod
                      paymentMethodOptions={paymentMethodOptions}
                      setPaymentMethod={setPaymentMethod}
                      handleUpdateBid={handleClick}
                      bids={bid}
                      isDisabled={bid.transactiondatetime}
                    />
                    {/* <Button
                      size="small"
                      
                      disabled={bids.transactiondatetime}
                      onClick={() => {
                        handleClick(bids);
                      }}
                    > */}
                    {/* {'Choose Payment Method'} */}
                    {/* </Button> */}
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
