import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function SimpleRating(props) {

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating
          name="simple-controlled"
          value={props.rating}
          onChange={(event, newValue) => {
            props.setRating(newValue)
            console.log(props.rating)
          }}
        />
      </Box>
    </div>
  );
}


