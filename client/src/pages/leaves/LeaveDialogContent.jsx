import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker } from '@material-ui/pickers';

const { Fragment } = React;

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

const LeaveDialogContent = () => {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <>
      <DialogTitle id="form-dialog-title">{'Leave Form'}</DialogTitle>
      <DialogContent>
        <DialogContentText>{'Leave From:\r'}</DialogContentText>
        <KeyboardDatePicker
          clearable
          value={selectedDate}
          onChange={(date) => handleDateChange(date)}
          minDate={new Date()}
          format="MM/dd/yyyy"
        />
      </DialogContent>
      <DialogContent>
        <DialogContentText>{'Leave Until:\r'}</DialogContentText>
        <KeyboardDatePicker
          clearable
          value={selectedDate}
          onChange={(date) => handleDateChange(date)}
          minDate={new Date()}
          format="MM/dd/yyyy"
        />
      </DialogContent>
    </>
  );
};

export default LeaveDialogContent;
