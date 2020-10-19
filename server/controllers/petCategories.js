const db = require('../db');

exports.index = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM Pet_Category');
    res.json({
      totalCount: result.rowCount,
      rows: result.rows,
    });
  } catch (err) {
    next(err);
  }
};
