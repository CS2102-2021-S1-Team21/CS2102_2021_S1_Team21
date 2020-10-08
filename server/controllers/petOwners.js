const db = require('../db');
const sql = require('../sql');

// TODO: reduce boilerplate code

exports.index = async (req, res, next) => {
  // console.log(sql.petOwners.queries.index);
  try {
    const result = await db.query('SELECT * FROM pet_owners');
    // console.log(result);
    res.json({ totalCount: result.rowCount, entries: result.rows });
  } catch (err) {
    next(err);
  }
};

exports.new = async (req, res, next) => {
  const { name, username } = req.body;
  try {
    const result = await db.query('INSERT INTO pet_owners VALUES ($1, $2)', [name, username]);
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
    const result = await db.query(sql.petOwners.queries.view, [username]);
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
