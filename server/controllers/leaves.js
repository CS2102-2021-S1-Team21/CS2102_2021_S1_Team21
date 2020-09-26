const db = require('../db');
const sql = require('../sql');

// TODO: reduce boilerplate code

exports.apply = async (req, res) => {
  try {
    const { email, startDate, endDate } = req;
    const result = await db.query(sql.leaves.apply, [email, startDate, endDate]);
    console.log(result);
    res.json({ email: result.email, startDate: result.startDate, endDate: result.endDate });
  } catch (err) {
    console.error(err);
  }
};

exports.retrieve = async (req, res) => {
  try {
    const result = await db.query(sql.leaves.queries.retrieve);
    //   res.json({ email: result.email })
    if (result.rowCount === 0) {
      res.json({ error: 'No such pet owner exists' });
      return; // TODO: next()?
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
