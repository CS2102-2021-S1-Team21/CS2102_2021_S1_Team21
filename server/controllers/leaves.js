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
    const result = await db.query(sql.leaves.queries.retrieve);

    //   res.json({ email: result.email })
    if (result.rowCount === 0) {
      res.json({ error: 'No such caretaker exists' });
      return; // TODO: next()?
    }
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
