const db = require('../db');

exports.index = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Bidded_For_Job');
    res.json({ totalCount: result.rowCount, entries: result.rows });
  } catch (err) {
    console.error(err);
    res.json({ error: 'An unexpected error occurred' });
  }
};

exports.view = async (req, res) => {
  const { username } = req.params;
  try {
    const result = await db.query(
      "SELECT ROW_NUMBER() OVER (ORDER BY reviewDateTime) AS id, *, to_char(reviewDateTime, 'DD/MM/YYYY') AS postedOn FROM Bidded_For_Job WHERE caretakerUsername = $1",
      [username],
    );
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