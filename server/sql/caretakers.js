const caretakers = {};

caretakers.queries = {
  index: 'SELECT * FROM Caretaker',
  view:
    'SELECT * FROM AppUser WHERE username LIKE $1 AND $1 IN (SELECT caretakerUsername from Caretaker)',
};

module.exports = caretakers;
