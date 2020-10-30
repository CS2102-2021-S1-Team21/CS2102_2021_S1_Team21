import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// TODO reformat code? too much props passed in
function ConfirmationDialogRaw(props) {
  const {
    onClose,
    value: valueProp,
    open,
    options,
    setPaymentMethod,
    handleUpdateBid,
    bids,
    keepMounted,
    classes,
  } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    setPaymentMethod(value);
    handleUpdateBid(value, bids);
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
    >
      <DialogTitle id="confirmation-dialog-title">{'Payment Method'}</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option.unnest}
              key={option.unnest}
              control={<Radio />}
              label={option.unnest}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          {'Cancel\r'}
        </Button>
        <Button onClick={handleConfirm} color="primary">
          {'Confirm Payment\r'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
}));

export default function SelectPaymentMethod({
  paymentMethodOptions,
  setPaymentMethod,
  handleUpdateBid,
  bids,
  isDisabled,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        disabled={isDisabled}
        onClick={handleClickListItem}
      >
        {'Choose Payment Method'}
      </Button>
      <ConfirmationDialogRaw
        classes={{
          paper: classes.paper,
        }}
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
        options={paymentMethodOptions}
        setPaymentMethod={setPaymentMethod}
        handleUpdateBid={handleUpdateBid}
        bids={bids}
      />
    </>
  );
}
