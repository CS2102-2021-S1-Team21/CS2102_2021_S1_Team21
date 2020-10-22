const bcrypt = require('bcrypt');
const db = require('../db');

exports.view = async (req, res) => {
  try {
    const { username } = req.params;
    const result = await db.query(`SELECT * FROM app_user WHERE username = $1`, [username]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};

exports.edit = async (req, res) => {
  try {
    const { username, passworddigest, bio, phonenumber, address, postalcode } = req.body;
    const hashPwd = await bcrypt.hash(passworddigest, 10);
    const result = await db.query(
      `UPDATE app_user SET passworddigest = $2, bio = $3, phonenumber = $4, address = $5, postalcode = $6 
      WHERE username = $1
      RETURNING *`,
      [username, hashPwd, bio, phonenumber, address, postalcode],
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.json({ error: 'An unexpected error occurred' });
  }
};
