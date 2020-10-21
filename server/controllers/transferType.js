const db = require('../db');

exports.retrieve = async (req, res) => {
  try {
    const result = await db.query('SELECT unnest(enum_range(NULL::Transfer_Type))');
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
};
