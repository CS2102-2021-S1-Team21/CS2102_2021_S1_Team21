import { KeyboardDatePicker } from '@material-ui/pickers';
import { format } from 'date-fns';
import React from 'react';
import { DATE_INPUT_FORMAT } from '../../utilities/datetime';

/**
 * A styled DateTimePicker that synchronises with Formik.
 * Additional props are forwarded to the underlying KeyboardDatePicker.
 *
 * To be used as a custom component for Formik's <Field>, e.g.
 * ```
  <Field
    name="startDate"
    label="Start Date"
    component={FormDatePicker}
  />
 * ```
 */
const FormDatePicker = ({ field, form, ...otherProps }) => {
  const handleChange = (date) => {
    // format date as string to avoid timezone errors when sending API request
    form.setFieldValue(field.name, format(date, 'yyyy-MM-dd'));
  };

  // TODO: upgrade to MUI Pickers 4.0 (once it's stable) to improve accessibility

  return (
    <KeyboardDatePicker
      {...field}
      disabled={form.isSubmitting}
      inputVariant="outlined"
      format={DATE_INPUT_FORMAT}
      onChange={handleChange}
      {...otherProps} // allow the above props to be overridden
      id={field.name}
      value={field.value || null}
      fullWidth
    />
  );
};

export default FormDatePicker;
