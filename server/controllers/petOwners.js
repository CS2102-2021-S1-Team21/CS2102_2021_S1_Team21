const db = require('../db');

// TODO: reduce boilerplate code

exports.index = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM pet_owner');
    res.json({ totalCount: result.rowCount, entries: result.rows });
  } catch (err) {
    next(err);
  }
};

exports.new = async (req, res, next) => {
  const { name, username } = req.body;
  try {
    const result = await db.query('INSERT INTO pet_owner VALUES ($1, $2)', [name, username]);
    res.json(result);
  } catch (err) {
    // handle duplicate key value error
    if (err.code === '23505') {
      res.status(400).json({ error: 'Username is taken' });
      return;
    }
    next(err);
  }
};

exports.view = async (req, res, next) => {
  const { username } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM App_User WHERE username = $1 AND $1 IN (SELECT petOwnerUsername from Pet_Owner)',
      [username],
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Pet owner not found' });
      return;
    }
    res.json(result);
  } catch (err) {
    console.error('ERROR: ', err.message);
    next(err);
  }
};

exports.viewCc = async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username);

    const result = await db.query('SELECT * FROM pet_owner WHERE petownerusername = $1', [
      username,
    ]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Pet owner not found' });
      return;
    }
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
};
