import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker } from '@material-ui/pickers';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, Dialog } from '@material-ui/core';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import api from '../../api';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const LeaveDialogContent = ({ open, setOpen }) => {
  const classes = useStyles();
  const [selectedDateFrom, handleDateChangeFrom] = useState(new Date());
  const [selectedDateTo, handleDateChangeTo] = useState(new Date());

  const handleCancel = () => {
    setOpen(false);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setOpen(false);
    try {
      const body = {
        startDate: format(selectedDateFrom, 'yyyy/MM/dd'),
        endDate: format(selectedDateTo, 'yyyy/MM/dd'),
        email: 'wincent@gmail.com',
        isEmergency: 'FALSE',
      };
      api.leaves.applyLeave(body);
      console.log(body);
    } catch (err) {
      console.log(err.message);
    }
    // TODO: set up backend api request
  };

  return (
    <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{'Leave Form'}</DialogTitle>
      <DialogContent>
        <DialogContentText>{'From:\r'}</DialogContentText>
        <KeyboardDatePicker
          clearable
          value={selectedDateFrom}
          onChange={(date) => handleDateChangeFrom(date)}
          minDate={new Date()}
          format="yyyy/MM/dd"
        />
      </DialogContent>
      <DialogContent>
        <DialogContentText>{'Until:\r'}</DialogContentText>
        <KeyboardDatePicker
          clearable
          value={selectedDateTo}
          onChange={(date) => handleDateChangeTo(date)}
          minDate={selectedDateFrom}
          minDateMessage="Date should not be earlier than start Date"
          format="yyyy/MM/dd"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          {'Cancel'}
        </Button>
        <Button onClick={handleApply} color="primary">
          {'Apply'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LeaveDialogContent.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

LeaveDialogContent.defaultProps = {
  open: false,
  setOpen: () => null,
};

export default LeaveDialogContent;
