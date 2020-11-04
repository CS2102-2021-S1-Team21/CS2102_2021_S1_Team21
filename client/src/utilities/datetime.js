import { format, getYear as dateFnsGetYear } from 'date-fns';

export const ISO_DATE_FORMAT = 'yyyy-MM-dd';

export const TIME_FORMAT = 'hh:mm a';
export const TIME_INPUT_FORMAT = 'hh:mm a';
export const DATE_FORMAT = 'd MMM yyyy (EEE)';
export const DATE_INPUT_FORMAT = 'dd/MM/yyyy';
export const DATETIME_FORMAT = `${DATE_FORMAT}, ${TIME_FORMAT}`;
export const DATETIME_INPUT_FORMAT = `${DATE_INPUT_FORMAT} ${TIME_INPUT_FORMAT}`;

/** A wrapper around date-fns's `getYear` that allows other types of parameters (e.g. strings). */
export const getYear = (date) => dateFnsGetYear(new Date(date));

/** Allows other date types, e.g. strings, to be formatted consistently across the application */
export const formatDate = (date) => format(new Date(date), DATE_FORMAT);
