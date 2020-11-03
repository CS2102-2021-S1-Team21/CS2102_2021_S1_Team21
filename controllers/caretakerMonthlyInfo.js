const db = require('../db');

exports.getPetDay = async (req, res) => {
  const { caretakerusername } = req.params;
  try {
    const result = await db.query(`SELECT COALESCE(caretakerusername, caretakerusername2) AS caretakerusername, 
    COALESCE(role,role2) AS role, jobCount, bidCount, averageRating, petDayCount, salary 
    FROM  
    (SELECT  caretakerusername, 
    CASE  
    WHEN caretakerusername IN (SELECT * FROM part_time_employee) THEN 'PT' 
    WHEN caretakerusername IN (SELECT * FROM full_time_employee) THEN 'FT' 
    ELSE 'null' 
    END AS role, 
    COUNT(*) AS jobCount, 
    AVG(rating) AS averageRating, 
    SUM(bids.startDate - bids.endDate) AS petDayCount, 
    CASE 
    WHEN caretakerusername IN (SELECT * FROM part_time_employee) THEN 0.75 * SUM(totalAmount) 
    WHEN caretakerusername IN (SELECT * FROM full_time_employee) THEN 3000 + 0.8 * MIN(petDayCount - 60),0) / 60 * SUM(totalAmount) 
    ELSE 0 
    END AS salary 
    FROM Bids 
    WHERE status='Completed' AND endDate BETWEEN date_trunc('month', CURRENT_DATE - interval '1' month) AND date_trunc('month', CURRENT_DATE) 
    GROUP BY caretakerusername) t1  
    FULL OUTER JOIN 
    (SELECT  
    caretakerusername AS caretakerusername2, 
    CASE  
    WHEN caretakerusername IN (SELECT * FROM part_time_employee) THEN 'PT' 
    WHEN caretakerusername IN (SELECT * FROM full_time_employee) THEN 'FT' 
    ELSE 'null' 
    END AS role2, 
    COUNT(*) AS bidCount 
    FROM Bids 
    WHERE submittedAt BETWEEN date_trunc('month', CURRENT_DATE - interval '1' month) AND date_trunc('month', CURRENT_DATE) 
    GROUP BY caretakerusername) t2 
    ON t1.caretakerusername = t2.caretakerusername2 AND t1.caretakerusername = $1 `, [caretakerusername]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.json({ error: 'An unexpected error occurred' });
  }
};
