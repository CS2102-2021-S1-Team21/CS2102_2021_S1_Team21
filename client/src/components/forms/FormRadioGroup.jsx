import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { getIn } from 'formik';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  outlinedCheckboxGroup: {
    padding: theme.spacing(2, 1, 2, 2),
    // Taken from https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/OutlinedInput/OutlinedInput.js
    border: `1px solid rgba(0, 0, 0, 0.23)`,
  },
}));

/**
 * A styled group of Radio buttons.
 * Additional props are forwarded to the underlying FormControl component.
 *
 * To be used as a custom component for Formik's <Field>, e.g.
 * ```
 * <Field
 *   name="petType"
 *   label="Pet Type"
 *   component={FormRadioGroup}
 *   options={[
 *     { value: 'miniDog', label: 'Small Doggy' },
 *     { value: 'dogLarge', label: 'Big Doggy', },
 *     { value: 'cat', label: 'Kitty', },
 *   ]}
 * />
 * ```
 */
const FormRadioGroup = ({
  field,
  form,
  label,
  options,
  useRowLayout = true,
  FormControlLabelProps,
  RadioProps,
  ...otherProps
}) => {
  const classes = useStyles();

  const errorMessage = getIn(form.errors, field.name);
  const shouldShowError = getIn(form.touched, field.name) && !!errorMessage;
  const helperText = shouldShowError ? errorMessage : otherProps.helperText;

  // TODO: create styles for other variants (non-outlined)

  return (
    <Paper variant="outlined" className={classes.outlinedCheckboxGroup}>
      <FormControl disabled={form.isSubmitting} {...otherProps} error={shouldShowError} fullWidth>
        <FormLabel id={`${field.name}-label`}>{label}</FormLabel>
        <RadioGroup {...field} aria-labelledby={`${field.name}-label`} row={useRowLayout}>
          {options.map((option) => (
            <FormControlLabel
              {...FormControlLabelProps}
              id={field.name}
              key={option.value}
              value={option.value}
              label={option.label}
              control={<Radio {...RadioProps} />}
            />
          ))}
        </RadioGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Paper>
  );
};

export default FormRadioGroup;
