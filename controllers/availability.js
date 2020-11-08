const db = require('../db');

const { errorDetails } = require('../constants');

exports.apply = async (req, res, next) => {
  try {
    const { caretakerUsername, startDate, endDate } = req.body;
    const result = await db.query(
      'INSERT INTO indicates_availability_period (caretakerUsername, startDate, endDate) VALUES ($1, $2, $3) RETURNING *',
      [caretakerUsername, startDate, endDate],
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err)
    if (err.where && err.where.startsWith(errorDetails.AVAILABILITY_OVERLAPPING_DATE)) {
      res
        .status(400)
        .json({ error: 'You have an existing availability that overlaps with this availability application' });
      return;
    }
    if (err.constraint === errorDetails.AVAILABILITY_DATERANGE_LIMIT) {
      res
        .status(400)
        .json({ error: 'You can only indicate availability until the end of next year' });
      return;
    }
    next(err);
  }
};

exports.retrieve = async (req, res, next) => {
  try {
    const { caretakerUsername } = req.params;
    const result = await db.query(
      `SELECT *, to_char(startDate, 'dd/MM/yyyy') as start, to_char(endDate, 'dd/MM/yyyy') as end FROM indicates_availability_period WHERE caretakerUsername = $1 ORDER BY startDate DESC`,
      [caretakerUsername],
    );
    res.json(result.rows);
  } catch (err) {
    res.json({ error: 'An unexpected error occurred' });
    next(err);
  }
};
