import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SimpleRating from './SimpleRating';

export default function WriteReviewDialog({
  rating,
  setRating,
  handleUpdateBid,
  bids,
  isDisabled,
}) {
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleComment = () => {
    handleUpdateBid(rating, comment, bids);
    setOpen(false);
  };

  return (
    <div>
      <Button disabled={isDisabled} variant="outlined" color="primary" onClick={handleClickOpen}>
        {'Comment\r'}
      </Button>
      <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{'Comment'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {'Leave a comment for the caretaker after the job has been completed.\r'}
          </DialogContentText>
          <SimpleRating rating={rating} setRating={setRating} />
          <TextField
            autoFocus
            multiline
            rows={4}
            margin="dense"
            id="name"
            label="Say something nice! Or not..."
            type="email"
            fullWidth
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            {'Cancel\r'}
          </Button>
          <Button onClick={handleComment} color="primary">
            {'Comment\r'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
