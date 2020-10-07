const petOwners = {};

petOwners.queries = {
  index: 'SELECT * FROM pet_owners',
  view: 'SELECT * FROM pet_owners WHERE username LIKE $1',
};

module.exports = petOwners;
