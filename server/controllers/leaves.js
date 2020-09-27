const db = require('../db');
const sql = require('../sql');

// TODO: reduce boilerplate code

exports.apply = async (req, res) => {
  try {
    const { email, startDate, endDate, isEmergency } = req.body;
    const result = await db.query(sql.leaves.queries.apply, [
      email,
      startDate,
      endDate,
      isEmergency,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
};

exports.retrieve = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await db.query(sql.leaves.queries.retrieve, [email]);
    if (result.rowCount === 0) {
      res.json({ error: 'You do not have any past leave application' });
      return; // TODO: next()?
    }
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
