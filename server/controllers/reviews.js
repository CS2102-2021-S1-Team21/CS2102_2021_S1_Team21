const db = require('../db');
const sql = require('../sql');

// TODO: reduce boilerplate code

exports.index = async (req, res) => {
  try {
    const result = await db.query(sql.reviews.queries.index);
    // console.log(result);
    res.json({ totalCount: result.rowCount, entries: result.rows });
  } catch (err) {
    console.error(err);
    res.json({ error: 'An unexpected error occurred' });
  }
};

exports.view = async (req, res) => {
  const { email } = req.params;
  try {
    const result = await db.query(sql.reviews.queries.view, [email]);
    if (result.rowCount === 0) {
      res.json({ error: 'Reviews for this caretaker do not exist' });
      return; // TODO: next()?
    }
    const sumOfRatings = result.rows.reduce((a, b) => a + b.rating, 0);
    const avg = sumOfRatings / result.rows.length;
    res.json([avg, result.rows]);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
