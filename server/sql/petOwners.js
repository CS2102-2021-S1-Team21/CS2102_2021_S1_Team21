const petOwners = {};

petOwners.queries = {
  index: 'SELECT * FROM pet_owners',
  view: 'SELECT * FROM pet_owners WHERE email LIKE $1',
};

/*
petOwners.functions = {
  updatePets: "SELECT update_pets($1, $2)"
}
*/

module.exports = petOwners;
