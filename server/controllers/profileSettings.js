const db = require('../db');

exports.put = async (req, res) => {
  try {
    const { username } = req.body;
    const result = await db.query(
      'INSERT INTO indicates_availability_period (caretakerUsername, startDate, endDate) VALUES ($1, $2, $3) RETURNING *',
      [caretakerUsername, startDate, endDate],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
};

exports.view = async (req, res) => {
  try {
    const { username } = req.params;
    const result = await db.query(
      `SELECT * FROM app_user WHERE username = $1`,
      [username]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};