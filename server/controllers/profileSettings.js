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

exports.putProfile = async (req, res) => {
  try {
    const { username, passworddigest, bio, phonenumber, address, postalcode } = req.body;
    const result = await db.query(
      'UPDATE app_user SET passworddigest = $2, bio = $3, phonenumber = $4, address = $5, postalcode = $6 WHERE username = $1',
      [username, passworddigest, bio, phonenumber, address, postalcode],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
};

exports.putCc = async (req, res) => {
  try {
    const { username, ccNumber, ccName, ccExpiryDate, ccCvvCode } = req.body;
    const result = await db.query(
      'UPDATE pet_owner SET ccNumber = $2, ccName = $3, ccExpiryDate = $4, ccCvvCode = $5 WHERE username = $1',
      [username, ccNumber, ccName, ccExpiryDate, ccCvvCode],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
};

// Not yet sure how to insert multiple rows from petCategories
exports.putCares = async (req, res) => {
  try {
    const { username, petCategories } = req.body;
    const result = await db.query('DELETE FROM cares_for WHERE username = $1', [username]);
    // .then(
    //   'INSERT INTO cares_for WHERE username = $1', [username]
    // );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
};
