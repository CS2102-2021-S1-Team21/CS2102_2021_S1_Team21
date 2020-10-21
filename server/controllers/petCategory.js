const db = require('../db');

exports.index = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Pet_Category');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
};

exports.retrieve = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const result = await db.query(`SELECT dailyPrice FROM Pet_Category WHERE categoryName = $1`, [
      categoryName,
    ]);
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
