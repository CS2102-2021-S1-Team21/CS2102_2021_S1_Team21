exports.errorCodes = {
  DUPLICATE_KEY_VALUE: '23505',
  TRANSACTION_DATE_TIME_NOT_VALID_DATETIME: '22007',
};

exports.errorDetails = {
  PET_DUPLICATE_KEY: 'Key (petownerusername, name)=',
  REQUIREMENT_DUPLICATE_KEY: 'Key (requirementtype, petname, petownerusername)=',
  AVAILABILITY_OVERLAPPING_DATE: 'PL/pgSQL function availability_overlapping_date()',
  LEAVE_OVERLAPPING_DATE: 'PL/pgSQL function leave_constraints() line 15 at RAISE',
  LEAVE_HAVE_PET: 'PL/pgSQL function leave_constraints() line 26 at RAISE',
  LEAVE_CONSECUTIVE_DAYS: 'PL/pgSQL function leave_constraints() line 64 at RAISE',
  NOT_ADMIN_CONSTRAINT: 'PL/pgSQL function not_admin()',
  NOT_USER_CONSTRAINT: 'PL/pgSQL function not_user()',
  AVAILABILITY_DATERANGE_LIMIT: 'indicates_availability_period_enddate_check',
};

exports.messages = {
  PET_NOT_FOUND: 'Sorry, we could not find a pet with this name',
  DUPLICATE_PET: 'A pet with the same name already exists',
  DUPLICATE_PET_REQUIREMENT: 'A pet cannot have two requirements with the same requirement type',
  DUPLICATE_USER: 'A user with this username or email already exists',
  PAYMENT_NOT_DONE: 'Pet owner has not made payment yet',
};
