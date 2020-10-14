const db = require('../db');

exports.apply = async (req, res) => {
  try {
    const { caretakerUsername, startDate, endDate } = req.body;
    const result = await db.query(
      'INSERT INTO indicates_availability_period (caretakerUsername, startDate, endDate) VALUES ($1, $2, $3) RETURNING *',
      [caretakerUsername, startDate, endDate],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
};

exports.retrieve = async (req, res) => {
  try {
    const { caretakerUsername } = req.params;
    const result = await db.query(
      `SELECT *, to_char(startDate, 'dd/MM/yyyy') as start, to_char(endDate, 'dd/MM/yyyy') as end FROM indicates_availability_period WHERE caretakerUsername = $1 ORDER BY startDate DESC`,
      [caretakerUsername],
    );
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
