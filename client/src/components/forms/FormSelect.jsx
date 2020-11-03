import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import { getIn } from 'formik';
import React from 'react';

/**
 * A styled Select that displays error messages based on Formik's current state.
 * Additional props are forwarded to the underlying FormControl component.
 *
 * To be used as a custom component for Formik's <Field>, e.g.
 * ```
 * <Field
 *   name="petType"
 *   label="Pet Type"
 *   component={FormSelect}
 *   options={[
 *     { value: 'miniDog', label: 'Small Doggy' },
 *     { value: 'dogLarge', label: 'Big Doggy', },
 *     { value: 'cat', label: 'Kitty', },
 *   ]}
 * />
 * ```
 */
const FormSelect = ({
  field,
  form,
  label,
  options,
  SelectProps,
  onChangeCallback = () => {},
  ...otherProps
}) => {
  const errorMessage = getIn(form.errors, field.name);
  const shouldShowError = getIn(form.touched, field.name) && !!errorMessage;
  const helperText = shouldShowError ? errorMessage : otherProps.helperText;

  // TODO: add flow/proptypes and make `options` required

  const handleChange = (e) => {
    field.onChange(e);
    onChangeCallback(e.target.value);
  };

  return (
    <FormControl variant="outlined" {...otherProps} error={shouldShowError} fullWidth>
      <InputLabel htmlFor={field.name} id={`${field.name}-label`}>
        {label}
      </InputLabel>
      <Select
        {...field}
        onChange={handleChange}
        disabled={form.isSubmitting}
        {...SelectProps} // allow the above props to be overridden
        labelId={`${field.name}-label`}
        label={label} // required for layout purposes
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

export default FormSelect;
