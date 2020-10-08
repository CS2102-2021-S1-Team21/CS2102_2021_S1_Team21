const db = require('../db');

// TODO: reduce boilerplate code

exports.apply = async (req, res) => {
  try {
    const { email, startDate, endDate, isEmergency } = req.body;
    const result = await db.query(
      'INSERT INTO applies_for_leave_period (email, startDate, endDate, isEmergency) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, startDate, endDate, isEmergency],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
};

exports.retrieve = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await db.query(
      `SELECT *, to_char(startDate, 'dd/MM/yyyy') as start, to_char(endDate, 'dd/MM/yyyy') as end FROM applies_for_leave_period WHERE email LIKE $1 ORDER BY startDate DESC`,
      [email],
    );
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
