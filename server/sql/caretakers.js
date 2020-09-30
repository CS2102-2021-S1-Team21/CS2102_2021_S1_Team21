const caretakers = {};

caretakers.queries = {
  index: 'SELECT * FROM Caretaker',
  view: 'SELECT * FROM Caretaker WHERE email LIKE $1',
};

/*
petOwners.functions = {
  updatePets: "SELECT update_pets($1, $2)"
}
*/

module.exports = caretakers;
