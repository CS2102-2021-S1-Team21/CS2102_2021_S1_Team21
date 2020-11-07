import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getIn } from 'formik';
import React from 'react';

/**
 * A styled Autocomplete that displays error messages based on Formik's current state.
 * Additional props are forwarded to the underlying TextField component.
 *
 * To be used as a custom component for Formik's <Field>, e.g.
 * ```
 * <Field
 *   name="petRequirements"
 *   label="Pet Requirements"
 *   component={FormAutocomplete}
 * />
 * ```
 */
const FormTextField = ({ field, form, options, AutocompleteProps, ...otherProps }) => {
  const errorMessage = getIn(form.errors, field.name);
  const shouldShowError = getIn(form.touched, field.name) && !!errorMessage;

  const handleInputChange = (e, value) => {
    form.setFieldValue(field.name, value);
  };

  return (
    <Autocomplete 
      freeSolo
      {...AutocompleteProps}
      // Display original value if matching option not found.
      // MUI's TextField requires empty input to be indicated by an empty string.
      value={options.find((option) => option.value === field.value) || field.value || ''} 
      inputValue={field.value}
      onInputChange={handleInputChange}
      options={options}
      getOptionLabel={(option) => {
        // initial value may be a raw string
        return typeof option === 'string' ? option : option.label;
      }}
      fullWidth
      renderInput={(params) => 
        <TextField
          {...params}
          disabled={form.isSubmitting}
          variant="outlined"
          {...otherProps} // allow the above props to be overridden
          id={field.name}
          error={shouldShowError}
          helperText={shouldShowError ? errorMessage : otherProps?.helperText}
        />
      }
    />
  );
};

export default FormTextField;
