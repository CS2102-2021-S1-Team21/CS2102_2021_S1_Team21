const petOwners = {};

petOwners.queries = {
  index: 'SELECT * FROM pet_owners',
  view:
    'SELECT * FROM AppUser WHERE username = $1 AND $1 IN (SELECT petOwnerUsername from Pet_Owner)',
};

module.exports = petOwners;
