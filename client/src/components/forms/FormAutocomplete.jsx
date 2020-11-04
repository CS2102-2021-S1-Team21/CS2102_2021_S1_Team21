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

  return (
    <Autocomplete 
      freeSolo
      {...AutocompleteProps}
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          {...field}
          disabled={form.isSubmitting}
          variant="outlined"
          {...otherProps} // allow the above props to be overridden
          id={field.name}
          value={field.value || ''} // MUI's TextField requires empty input to be indicated by an empty string
          error={shouldShowError}
          helperText={shouldShowError ? errorMessage : otherProps?.helperText}
          fullWidth
        />
      )}
    />
  );
};

export default FormTextField;
