const db = require('../db');

exports.index = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM cares_for');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.json({ error: 'An unexpected error occurred' });
  }
};

exports.view = async (req, res) => {
  try {
    const { username } = req.params;
    const selectedResult = await db.query(
      'SELECT categoryname FROM cares_for WHERE caretakerUsername = $1',
      [username],
    );
    const notSelectedResult = await db.query(
      `SELECT DISTINCT categoryname 
      FROM Pet_Category
      EXCEPT 
      SELECT categoryname 
      FROM cares_for 
      WHERE caretakerUsername = $1`,
      [username],
    );
    res.json({ selectedResult: selectedResult.rows, notSelectedResult: notSelectedResult.rows });
  } catch (err) {
    console.error(err);
    res.json({ error: 'An unexpected error occurred' });
  }
};

exports.edit = async (req, res) => {
  try {
    const { username } = req.params;
    // Delete all existing associated categories
    await db.query('DELETE FROM cares_for WHERE caretakerusername = $1', [username]);
    // Insert each selected category
    const updatedCategories = await Promise.all(
      req.body.map(async (category) => {
        const insertResult = await db.query(
          'INSERT INTO cares_for VALUES ($2, $1) RETURNING categoryname',
          [username, category],
        );
        return insertResult.rows[0];
      }),
    );
    res.json(updatedCategories.rows);
  } catch (err) {
    console.error(err);
    res.json({ error: 'An unexpected error occurred' });
  }
};
