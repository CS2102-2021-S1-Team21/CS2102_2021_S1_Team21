const db = require('../db');

exports.retrieve = async (req, res) => {
  try {
    const { petOwnerUsername } = req.params;
    const result = await db.query(`SELECT * FROM pet WHERE petOwnerUsername = $1`, [
      petOwnerUsername,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
