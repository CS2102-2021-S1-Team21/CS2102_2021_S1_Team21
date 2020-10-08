const db = require('../db');

// TODO: reduce boilerplate code

exports.apply = async (req, res) => {
  try {
    const { caretakerUsername, startDate, endDate, isEmergency } = req.body;
    const result = await db.query(
      'INSERT INTO applies_for_leave_period (caretakerUsername, startDate, endDate, isEmergency) VALUES ($1, $2, $3, $4) RETURNING *',
      [caretakerUsername, startDate, endDate, isEmergency],
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
      `SELECT *, to_char(startDate, 'dd/MM/yyyy') as start, to_char(endDate, 'dd/MM/yyyy') as end FROM applies_for_leave_period WHERE caretakerUsername LIKE $1 ORDER BY startDate DESC`,
      [caretakerUsername],
    );
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
