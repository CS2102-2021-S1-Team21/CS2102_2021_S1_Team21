const db = require('../db');

exports.index = async (req, res) => {
  try {
    const result = await db.query(`SELECT ROW_NUMBER() OVER () AS id,* FROM leaderboard`);
    // Unnecessary.. but I already coded it to test
    const resultMonth = await db.query(
      `SELECT TO_CHAR(NOW() - interval '1' month, 'Month') AS "month", 
      TO_CHAR(NOW() - interval '1' month, 'YYYY') AS "year"`,
    );
    if (result.rowCount === 0) {
      res.json({ info: 'No job records exist this month' });
      return; // TODO: next()?
    }
    res.json({
      resultMonth: `${resultMonth.rows[0].month} ${resultMonth.rows[0].year}`,
      result: result.rows,
    });
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};

exports.performance = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT ROW_NUMBER() OVER () AS id, * FROM admin_summary`,
    );
    if (result.rowCount === 0) {
      res.json({ info: 'No caretakers exist this month' });
      return; // TODO: next()?
    }
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
