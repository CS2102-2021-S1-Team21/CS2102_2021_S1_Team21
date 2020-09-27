import { Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import { getIn } from 'formik';
import React from 'react';

/**
 * A styled MultiSelect that displays error messages based on Formik's current state.
 * Additional props are forwarded to the underlying FormControl component.
 *
 * To be used as a custom component for Formik's <Field>, e.g.
 * ```
 * <Field
 *   name="services"
 *   label="Services Provided"
 *   component={FormMultiSelect}
 *   options={[
 *     { value: 'homeVisit', label "Home Visit" }
 *   ]}
 * />
 * ```
 */
const FormMultiSelect = ({ field, form, label, options, SelectProps, ...otherProps }) => {
  const errorMessage = getIn(form.errors, field.name);
  const shouldShowError = getIn(form.touched, field.name) && !!errorMessage;
  const helperText = shouldShowError ? errorMessage : otherProps.helperText;

  // TODO: add flow/proptypes and make `options` required

  const findLabel = (value) => options.find((option) => option.value === value)?.label;
  // TODO: show all options if element is focused
  const renderValue = (selected) =>
    selected.map((value) => <Chip key={value} label={findLabel(value)} />);

  return (
    <FormControl variant="outlined" {...otherProps} error={shouldShowError} fullWidth>
      <InputLabel htmlFor={field.name} id={`${field.name}-label`}>
        {label}
      </InputLabel>
      <Select
        {...field}
        disabled={form.isSubmitting}
        {...SelectProps} // allow the above props to be overridden
        id={field.name}
        labelId={`${field.name}-label`}
        label={label} // required for layout purposes
        multiple
        renderValue={renderValue}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default FormMultiSelect;
