const caretakers = {};

caretakers.queries = {
  index: 'SELECT * FROM Caretaker',
  view: 'SELECT * FROM Caretaker WHERE username LIKE $1',
};

module.exports = caretakers;
