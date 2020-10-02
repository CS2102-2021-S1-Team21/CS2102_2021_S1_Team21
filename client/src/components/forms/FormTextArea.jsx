import { TextField } from '@material-ui/core';
import { getIn } from 'formik';
import React from 'react';

/**
 * A styled TextArea that displays error messages based on Formik's current state.
 * Additional props are forwarded to the underlying TextField.
 *
 * To be used as a custom component for Formik's <Field>, e.g.
 * ```
 * <Field
 *   name="remarks"
 *   label="Remarks"
 *   component={FormTextArea}
 * />
 * ```
 */
const FormTextArea = ({ field, form, ...otherProps }) => {
  const errorMessage = getIn(form.errors, field.name);
  const shouldShowError = getIn(form.touched, field.name) && !!errorMessage;

  return (
    <TextField
      {...field}
      disabled={form.isSubmitting}
      variant="outlined"
      rows={3}
      {...otherProps} // allow the above props to be overridden
      id={field.name}
      value={field.value || ''} // MUI's TextField requires empty input to be indicated by an empty string
      error={shouldShowError}
      helperText={shouldShowError ? errorMessage : otherProps?.helperText}
      fullWidth
      multiline
    />
  );
};

export default FormTextArea;
