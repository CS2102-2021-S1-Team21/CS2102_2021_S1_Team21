exports.errorCodes = {
  DUPLICATE_KEY_VALUE: '23505',
};

exports.errorDetails = {
  PET_DUPLICATE_KEY: 'Key (petownerusername, name)=',
  REQUIREMENT_DUPLICATE_KEY: 'Key (requirementtype, petname, petownerusername)=',
  AVAILABILITY_OVERLAPPING_DATE: 'PL/pgSQL function availability_overlapping_date()',
};

exports.messages = {
  PET_NOT_FOUND: 'Sorry, we could not find a pet with this name',
  DUPLICATE_PET: 'A pet with the same name already exists',
  DUPLICATE_PET_REQUIREMENT: 'A pet cannot have two requirements with the same requirement type',
};
