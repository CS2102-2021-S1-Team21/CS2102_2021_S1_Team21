const db = require('../db');

exports.index = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Caretaker');
    res.json({ totalCount: result.rowCount, entries: result.rows });
    console.log(result.rows);
  } catch (err) {
    console.error(err);
  }
};

exports.browse = async (req, res) => {
  try {
    const { startDate, endDate, petCategory, rating } = req.body;
    const result = await db.query(
      `SELECT t0.caretakerusername, startdate, enddate, totalaveragerating, categoryname
        FROM
        full_time_employee AS t0
        LEFT JOIN 
        applies_for_leave_period AS t1 
          ON t0.caretakerusername = t1.caretakerusername
        INNER JOIN 
        caretaker AS t2 
          ON t0.caretakerusername = t2.caretakerusername
        INNER JOIN 
        Cares_for as t3 
          ON t0.caretakerusername = t3.caretakerusername
        WHERE (($1 < t1.startdate AND $2 < t1.startdate ) OR (t1.startdate IS NULL OR t1.enddate IS NULL)
        OR ($1 > t1.enddate AND $2 > t1.enddate)) AND $4 > t2.totalAverageRating AND $3 = t3.categoryname
      UNION
      SELECT t0.caretakerusername, startdate, enddate, totalaveragerating, categoryname
        FROM
        part_time_employee AS t0
        LEFT JOIN 
        indicates_availability_period AS t1 
          ON t0.caretakerusername = t1.caretakerusername
        INNER JOIN 
        caretaker AS t2 
          ON t0.caretakerusername = t2.caretakerusername
        INNER JOIN 
        Cares_for as t3 
          ON t0.caretakerusername = t3.caretakerusername
        WHERE $4 > t2.totalAverageRating AND $3 = t3.categoryname
        ;`,
      [startDate, endDate, petCategory, rating],
    );
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
};

exports.view = async (req, res) => {
  const { username } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM App_User WHERE username = $1 AND $1 IN (SELECT caretakerUsername from Caretaker)',
      [username],
    );
    if (result.rowCount === 0) {
      res.json({ error: 'No such caretaker exists' });
      return; // TODO: next()?
    }
    const user = result.rows[0];
    res.json(user);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
