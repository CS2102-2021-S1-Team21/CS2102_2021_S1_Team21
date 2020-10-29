const _ = require('lodash');
const db = require('../db');

exports.index = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM App_User');
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
      `SELECT *, 
        EXISTS (SELECT 1 FROM caretaker WHERE caretakerusername = $1) AS isCaretaker,
        EXISTS (SELECT 1 FROM pet_owner WHERE petownerusername = $1) AS isPetOwner
        FROM App_User 
        WHERE username = $1 AND deletedAt IS NULL`,
      [username],
    );
    if (result.rowCount === 0) {
      res.json({ error: 'No such user exists' });
      return; // TODO: next()?
    }
    res.json(_.omit(result.rows[0], ['passworddigest', 'deletedat']));
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
