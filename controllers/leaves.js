const db = require('../db');

const { errorDetails } = require('../constants');

exports.apply = async (req, res, next) => {
  try {
    const { caretakerUsername, startDate, endDate, isEmergency } = req.body;
    const result = await db.query(
      'INSERT INTO applies_for_leave_period (caretakerUsername, startDate, endDate, isEmergency) VALUES ($1, $2, $3, $4) RETURNING *',
      [caretakerUsername, startDate, endDate, isEmergency],
    );
    res.json(result.rows);
  } catch (err) {
    if (err.where.startsWith(errorDetails.LEAVE_CONSTRAINTS)) {
      res.status(400).json({
        error: 'Leave application invalid. Please check that you meet the required conditions',
      });
      return;
    }
    next(err);
  }
};

exports.retrieve = async (req, res) => {
  try {
    const { caretakerUsername } = req.params;
    const result = await db.query(
      `SELECT *, to_char(startDate, 'dd/MM/yyyy') as start, to_char(endDate, 'dd/MM/yyyy') as end FROM applies_for_leave_period WHERE caretakerUsername = $1 ORDER BY startDate DESC`,
      [caretakerUsername],
    );
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};

exports.retrieveAllPending = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT *, to_char(startDate, 'dd/MM/yyyy') as start, to_char(endDate, 'dd/MM/yyyy') as end FROM applies_for_leave_period WHERE isApproved = False ORDER BY startDate ASC`,
    );
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};

exports.updateApproval = async (req, res) => {
  try {
    const { caretakerUsername, startDate, endDate } = req.params;
    console.log(caretakerUsername, startDate, endDate);
    const result = await db.query(
      `UPDATE applies_for_leave_period SET isapproved = true WHERE (caretakerUsername = $1 AND startDate = $2 AND endDate = $3)`,
      [caretakerUsername, startDate, endDate],
    );
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
