const db = require('../db');

exports.put = async (req, res) => {
  try {
    const { username, email, passworddigest, bio, phonenumber, address, postalcode } = req.body;
    const result = await db.query(
      'UPDATE app_user SET passworddigest = $1, bio = $2, phonenumber = $3, address = $4, postalcode = $5 WHERE username == $1',
      [passworddigest, bio, phonenumber, address, postalcode],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
};

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
