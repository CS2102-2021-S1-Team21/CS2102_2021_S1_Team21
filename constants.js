exports.errorCodes = {
  DUPLICATE_KEY_VALUE: '23505',
};

exports.errorDetails = {
  PET_DUPLICATE_KEY: 'Key (petownerusername, name)=',
  REQUIREMENT_DUPLICATE_KEY: 'Key (requirementtype, petname, petownerusername)=',
  AVAILABILITY_OVERLAPPING_DATE: 'PL/pgSQL function availability_overlapping_date()',
  LEAVE_CONSTRAINTS: 'PL/pgSQL function leave_constraints()',
  NOT_ADMIN_CONSTRAINT: 'PL/pgSQL function not_admin()',
  NOT_USER_CONSTRAINT: 'PL/pgSQL function not_user()',
  TRANSACTION_DATE_TIME_NOT_VALID_DATETIME: ' invalid input syntax for type timestamp: "Invalid date',
};

exports.messages = {
  PET_NOT_FOUND: 'Sorry, we could not find a pet with this name',
  DUPLICATE_PET: 'A pet with the same name already exists',
  DUPLICATE_PET_REQUIREMENT: 'A pet cannot have two requirements with the same requirement type',
  DUPLICATE_USER: 'A user with this username or email already exists',
};
