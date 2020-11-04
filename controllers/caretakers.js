const db = require('../db');

exports.index = async (req, res) => {
  try {
    const { minRating, petCategory, startDate, endDate, offset } = req.query;
    const result = await db.query(
      `
      SELECT username, average_rating(username) AS totalAverageRating, name, bio
      FROM Caretaker CT INNER JOIN App_User ON App_User.username = CT.caretakerUsername
      WHERE average_rating(CT.caretakerUsername) >= $1
        AND EXISTS (
          SELECT 1 FROM Cares_For CF WHERE CF.caretakerUsername = CT.caretakerUsername AND CF.categoryName = $2
      ) AND NOT EXISTS (
        -- No approved Leave Applications
        SELECT 1 FROM Applies_For_Leave_Period L 
        WHERE L.caretakerUsername = CT.caretakerUsername
            AND L.isApproved -- make them continue to show up until leave approved? (TODO: confirm)
            AND ((L.startDate < $3 AND L.endDate >= $3) OR (L.startDate >= $3 AND L.startDate <= $4))
      ) AND (
        -- Either Full-Time Caretaker or Part-Timer who is available from startDate to endDate
        CT.caretakerUsername IN (SELECT caretakerUsername FROM Full_Time_Employee) 
        OR EXISTS (
            SELECT 1 FROM Indicates_Availability_Period A
            WHERE A.caretakerUsername = CT.caretakerUsername AND A.startDate < $3 AND A.endDate > $4
        )
      ) AND (
        -- Max number of pets allowed at any point
        CASE 
        WHEN EXISTS (SELECT 1 FROM Full_Time_Employee FT WHERE FT.caretakerUsername = CT.caretakerUsername) 
          OR average_rating(CT.caretakerUsername) >= 4
          THEN 5 
        ELSE 2
        END
        ) >= ALL (
        -- number of accepted bids on every day in the given time period
        SELECT COUNT(*)
        FROM (SELECT day FROM generate_series($3, $4, '1 day'::interval) day) dates
        INNER JOIN Bids ON dates.day BETWEEN Bids.startDate AND Bids.endDate
        WHERE Bids.caretakerUsername = CT.caretakerUsername
        GROUP BY caretakerUsername, day -- Note: caretakerUsername kept here for consistency
      )
      ORDER BY totalAverageRating DESC -- NULLS first to give chance to newer caretakers
      LIMIT 10
      OFFSET $5
    `,
      [minRating, petCategory, startDate, endDate, offset],
    );
    res.json({ totalCount: result.rowCount, entries: result.rows });
    console.log(result.rowCount)
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
