const db = require('../db');

exports.apply = async (req, res) => {
  try {
    const { petName, petOwnerUsername, caretakerUsername, dailyPrice, submittedAt, startDate, endDate, transferType, remarks } = req.body;
    const result = await db.query(
      'INSERT INTO Bids (petName, petOwnerUsername, caretakerUsername, dailyPrice, submittedAt, startDate, endDate, transferType, remarks) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [petName, petOwnerUsername, caretakerUsername, dailyPrice, submittedAt, startDate, endDate, transferType, remarks],
    );
    console.log(result.rows)
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
};

exports.retrieve = async (req, res) => {
  try {
    const { petOwnerUsername } = req.params;
    const result = await db.query(
      `SELECT * FROM Bids WHERE petOwnerUsername = $1`,
      [petOwnerUsername],
    );
    console.log(result.rows)
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};

//TODO 
// controller for update