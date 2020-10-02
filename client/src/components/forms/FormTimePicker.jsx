import { KeyboardTimePicker } from '@material-ui/pickers';
import React from 'react';
import { TIME_INPUT_FORMAT } from '../../utilities/datetime';

/**
 * A styled DateTimePicker that synchronises with Formik.
 * Additional props are forwarded to the underlying KeyboardTimePicker.
 *
 * To be used as a custom component for Formik's <Field>, e.g.
 * ```
 * <Field
 *   name="startTime"
 *   label="Start Time"
 *   component={FormTimePicker}
 * />
 * ```
 */
const FormTimePicker = ({ field, form, ...otherProps }) => {
  const handleChange = (date) => {
    form.setFieldValue(field.name, date);
  };

  return (
    <KeyboardTimePicker
      {...field}
      disabled={form.isSubmitting}
      inputVariant="outlined"
      format={TIME_INPUT_FORMAT}
      onChange={handleChange}
      {...otherProps} // allow the above props to be overridden
      id={field.name}
      value={field.value || null}
      fullWidth
    />
  );
};

export default FormTimePicker;
