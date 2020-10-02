import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { getIn } from 'formik';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  outlinedCheckboxGroup: {
    padding: theme.spacing(2, 1, 2, 2),
    // Taken from https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/OutlinedInput/OutlinedInput.js
    border: '1px solid rgba(0, 0, 0, 0.23)',
  },
}));

/**
 * A styled group of Checkboxes that behaves as a multiselect.
 * Additional props are forwarded to the underlying FormControl component.
 *
 * To be used as a custom component for Formik's <Field>, e.g.
 * ```
 * <Field
 *   name="requirements"
 *   label="Requirements"
 *   component={FormCheckboxGroup}
 *   options={[
 *     { value: 'dailyWalks', label: 'Needs daily walks' },
 *     { value: 'twiceDailyWalks', label: 'Needs twice-daily walks' },
 *   ]}
 * />
 * ```
 */
const FormCheckboxGroup = ({
  field,
  form,
  label,
  options,
  useRowLayout = true,
  FormControlLabelProps,
  CheckboxProps,
  ...otherProps
}) => {
  const classes = useStyles();

  const errorMessage = getIn(form.errors, field.name);
  const shouldShowError = getIn(form.touched, field.name) && !!errorMessage;
  const helperText = shouldShowError ? errorMessage : otherProps.helperText;

  const handleChange = (e, value) => {
    if (e.target.checked) {
      form.setFieldValue(field.name, [...field.value, value]);
    } else {
      form.setFieldValue(
        field.name,
        field.value.filter((val) => val !== value),
      );
    }
  };

  // TODO: create styles for other variants (non-outlined)
  // FIXME: accessibility

  return (
    <Paper variant="outlined" className={classes.outlinedCheckboxGroup}>
      <FormControl disabled={form.isSubmitting} {...otherProps} error={shouldShowError} fullWidth>
        <FormLabel id={`${field.name}-label`}>{label}</FormLabel>
        <FormGroup aria-labelledby={`${field.name}-label`} row={useRowLayout}>
          {options.map((option) => (
            <FormControlLabel
              {...FormControlLabelProps}
              id={option.value}
              key={option.value}
              label={option.label}
              control={
                <Checkbox
                  {...CheckboxProps}
                  checked={field.value.includes(option.value)}
                  name={field.name}
                  onChange={(e) => handleChange(e, option.value)}
                />
              }
            />
          ))}
        </FormGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Paper>
  );
};

export default FormCheckboxGroup;
