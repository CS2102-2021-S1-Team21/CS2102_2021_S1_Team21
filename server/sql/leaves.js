const leaves = {};

leaves.queries = {
  apply:
    'INSERT INTO Applies_For_Leave_Period (email, startDate, endDate) VALUES ($1, $2, $3) RETURNING *',
  retrieve: 'SELECT * FROM Applies_For_Leave_Period',
};

module.exports = leaves;
