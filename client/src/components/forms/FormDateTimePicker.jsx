import { KeyboardDateTimePicker } from '@material-ui/pickers';
import React from 'react';
import { DATETIME_INPUT_FORMAT } from '../../utilities/datetime';

/**
 * A styled DateTimePicker that synchronises with Formik.
 * Additional props are forwarded to the underlying KeyboardDateTimePicker.
 *
 * To be used as a custom component for Formik's <Field>, e.g.
 * ```
 * <Field
 *   name="startDateTime"
 *   label="Start Date and Time"
 *   component={FormDateTimePicker}
 * />
 * ```
 */
const FormDateTimePicker = ({ field, form, ...otherProps }) => {
  const handleChange = (date) => {
    form.setFieldValue(field.name, date);
  };

  return (
    <KeyboardDateTimePicker
      {...field}
      disabled={form.isSubmitting}
      inputVariant="outlined"
      format={DATETIME_INPUT_FORMAT}
      onChange={handleChange}
      {...otherProps} // allow the above props to be overridden
      id={field.name}
      value={field.value || null}
      fullWidth
    />
  );
};

export default FormDateTimePicker;
