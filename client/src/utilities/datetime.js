import { getYear as dateFnsGetYear } from 'date-fns';

export const TIME_FORMAT = 'hh:mm a';
export const TIME_INPUT_FORMAT = 'hh:mm a';
export const DATE_FORMAT = 'dd MM yyyy (EEE)';
export const DATE_INPUT_FORMAT = 'dd/MM/yyyy';
export const DATETIME_FORMAT = `${DATE_FORMAT}, ${TIME_FORMAT}`;
export const DATETIME_INPUT_FORMAT = `${DATE_INPUT_FORMAT} ${TIME_INPUT_FORMAT}`;

/** A wrapper around date-fns's `getYear` that allows other types of parameters (e.g. strings). */
export const getYear = (date) => dateFnsGetYear(new Date(date));
