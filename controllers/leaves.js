const db = require('../db');

const { errorDetails } = require('../constants');

exports.apply = async (req, res, next) => {
  try {
    const { caretakerUsername, startDate, endDate, isEmergency } = req.body;
    const result = await db.query(
      'INSERT INTO applies_for_leave_period (caretakerUsername, startDate, endDate, isEmergency) VALUES ($1, $2, $3, $4) RETURNING *',
      [caretakerUsername, startDate, endDate, isEmergency],
    );
    res.json({ success: "You have successfully applied for leave, please check again soon if it has been approved.", result: result.rows });
  } catch (err) {
    console.log(err)
    if (err.where === errorDetails.LEAVE_OVERLAPPING_DATE) {
      res.status(400).json({
        error: 'Leave application has overlapping date with an existing leave',
      });
      return;
    }
    if (err.where === errorDetails.LEAVE_CONSECUTIVE_DAYS) {
      res.status(400).json({
        error: 'Unable to apply for this leave. You have to work for at least 2 sets of 150 consecutive days.',
      });
      return;
    }
    if (err.where === errorDetails.LEAVE_HAVE_PET) {
      res.status(400).json({
        error: 'Unable to apply for this leave. Ensure that you apply leave on days without any pet duty.',
      });
      return;
    }
    next(err);
  }
};

exports.cancel = async (req, res) => {
  try {
    const { caretakerUsername, startDate, endDate } = req.body;
    const result = await db.query(
      `DELETE FROM applies_for_leave_period WHERE caretakerusername = $1 AND startdate = $2 AND endDate = $3`,
      [caretakerUsername, startDate, endDate]
    );
    res.json({ success: "You have successfully cancelled your leave application", result: result.rows });
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
}

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
    const result = await db.query(
      `UPDATE applies_for_leave_period SET isapproved = true WHERE (caretakerUsername = $1 AND startDate = $2 AND endDate = $3)`,
      [caretakerUsername, startDate, endDate],
    );
    res.json({ success: "You have successfully approved the leave application", result: result.rows });
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
