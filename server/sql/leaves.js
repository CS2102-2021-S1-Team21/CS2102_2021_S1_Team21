const leaves = {};

leaves.queries = {
  apply:
    'INSERT INTO applies_for_leave_period (email, startDate, endDate) VALUES ($1, $2, $3) RETURNING *',
  retrieve: 'SELECT * FROM applies_for_leave_period'
};

module.exports = leaves;
