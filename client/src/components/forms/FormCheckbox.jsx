import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@material-ui/core';
import { getIn } from 'formik';
import React from 'react';

/**
 * A styled Checkbox that synchronises with Formik.
 * Additional props are forwarded to the underlying FormControlLabel component.
 *
 * To be used as a custom component for Formik's <Field>, e.g.
 * ```
 * <Field
 *   name="isVerified"
 *   label="Is Verified"
 *   component={FormCheckbox}
 * />
 * ```
 */
const FormCheckbox = ({ field, form, label, CheckboxProps, ...otherProps }) => {
  const errorMessage = getIn(form.errors, field.name);
  const shouldShowError = getIn(form.touched, field.name) && !!errorMessage;
  const helperText = shouldShowError ? errorMessage : otherProps.helperText;

  return (
    <FormControl>
      <FormControlLabel
        {...field}
        {...otherProps}
        id={field.name}
        label={label}
        control={<Checkbox {...CheckboxProps} checked={field.value} name={field.name} />}
      />
      {helperText && <FormHelperText error={shouldShowError}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default FormCheckbox;
