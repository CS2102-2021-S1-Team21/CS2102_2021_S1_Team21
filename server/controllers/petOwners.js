const db = require('../db');

// TODO: reduce boilerplate code

exports.index = async (req, res) => {
  // console.log(sql.petOwners.queries.index);
  try {
    const result = await db.query('SELECT * FROM pet_owners');
    // console.log(result);
    res.json({ totalCount: result.rowCount, entries: result.rows });
  } catch (err) {
    console.error(err);
  }
};

exports.view = async (req, res) => {
  const { email } = req.params;
  try {
    const result = await db.query('SELECT * FROM pet_owners WHERE email LIKE $1', [email]);
    if (result.rowCount === 0) {
      res.json({ error: 'No such pet owner exists' });
      return; // TODO: next()?
    }
    res.json(result);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
