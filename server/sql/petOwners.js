const petOwners = {};

petOwners.queries = {
  index: 'SELECT * FROM pet_owners',
  view:
    'SELECT * FROM AppUser WHERE username LIKE $1 AND $1 IN (SELECT petOwnerUsername from Caretaker)',
};

module.exports = petOwners;
