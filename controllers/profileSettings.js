const bcrypt = require('bcrypt');
const _ = require('lodash');
const db = require('../db');

exports.view = async (req, res) => {
  try {
    const { username } = req.params;
    const result = await db.query(`SELECT * FROM app_user WHERE username = $1`, [username]);
    const accountDetails = result.rows[0];
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(_.omit(accountDetails, ['passworddigest']));
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};

exports.edit = async (req, res) => {
  try {
    const { username, passworddigest, bio, phonenumber, address, postalcode, name } = req.body;
    let result;
    if (passworddigest) {
      const hashPwd = await bcrypt.hash(passworddigest, 10);
      result = await db.query(
        `UPDATE app_user SET passworddigest = $2, name = $3, bio = $4, phonenumber = $5, address = $6, postalcode = $7
      WHERE username = $1
      RETURNING *`, 
        [username, hashPwd, name, bio, phonenumber, address, postalcode],
      );
    } else {
      result = await db.query(
        `UPDATE app_user SET name = $2, bio = $3, phonenumber = $4, address = $5, postalcode = $6
        WHERE username = $1
        RETURNING *`,
        [username, name, bio, phonenumber, address, postalcode],
      );
    }
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


exports.adminView = async (req, res) => {
  try {
    const { username } = req.params;
    const result = await db.query(`SELECT * FROM pcs_administrator WHERE username = $1`, [username]);
    const accountDetails = result.rows[0];
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(_.omit(accountDetails, ['passworddigest']));
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};

exports.adminEdit = async (req, res) => {
  try {
    const { username, passworddigest, name } = req.body;
    let result;
    if (passworddigest) {
      const hashPwd = await bcrypt.hash(passworddigest, 10);
      result = await db.query(
        `UPDATE pcs_administrator SET passworddigest = $2, name = $3
      WHERE username = $1
      RETURNING *`, 
        [username, hashPwd, name],
      );
    } else {
      result = await db.query(
        `UPDATE pcs_administrator SET name = $2
        WHERE username = $1
        RETURNING *`,
        [username, name],
      );
    }
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Admin not found' });
      return;
    }
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.json({ error: 'An unexpected error occurred' });
  }
};
