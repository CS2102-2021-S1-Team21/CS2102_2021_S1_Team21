const db = require('../db');

exports.apply = async (req, res) => {
  try {
    const {
      petName,
      petOwnerUsername,
      caretakerUsername,
      dailyPrice,
      submittedAt,
      startDate,
      endDate,
      transferType,
      remarks,
    } = req.body;
    const result = await db.query(
      'INSERT INTO Bids (petName, petOwnerUsername, caretakerUsername, dailyPrice, submittedAt, startDate, endDate, transferType, remarks) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        petName,
        petOwnerUsername,
        caretakerUsername,
        dailyPrice,
        submittedAt,
        startDate,
        endDate,
        transferType,
        remarks,
      ],
    );
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(`biddingerr${err}`);
  }
};

exports.petOwnerRetrieve = async (req, res) => {
  try {
    const { petOwnerUsername } = req.params;
    const result = await db.query(
      `SELECT *, to_char(startDate, 'yyyy-MM-dd') AS start, to_char(endDate, 'yyyy-MM-dd') AS end FROM Bids WHERE petOwnerUsername = $1`,
      [petOwnerUsername],
    );
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};

exports.caretakerRetrieve = async (req, res) => {
  try {
    const { caretakerUsername } = req.params;
    const result = await db.query(
      `SELECT *, to_char(startDate, 'yyyy-MM-dd') AS start, to_char(endDate, 'yyyy-MM-dd') AS end FROM Bids WHERE caretakerUsername = $1`,
      [caretakerUsername],
    );
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};

exports.updateBids = async (req, res) => {
  try {
    const {
      petName,
      petOwnerUsername,
      caretakerUsername,
      submittedAt,
      startDate,
      endDate,
      status,
      transactionDateTime,
      paymentMethod,
      totalAmount,
      rating,
      comment,
      reviewDateTime,
    } = req.body;
    console.log(`body1 ${req.body.petName}`);
    const result = await db.query(
      `UPDATE Bids SET 
        status = $7,
        transactionDateTime =$8,
        paymentMethod = $9,
        totalAmount = $10,
        rating = $11,
        comment = $12,
        reviewDateTime = $13
      WHERE (petname = $1 
        AND petOwnerUsername = $2
        AND caretakerUsername = $3
        AND submittedAt = $4
        AND startDate = DATE($5) 
        AND endDate = DATE($6))`,
      [
        petName,
        petOwnerUsername,
        caretakerUsername,
        submittedAt,
        startDate,
        endDate,
        status,
        transactionDateTime,
        paymentMethod,
        totalAmount,
        rating,
        comment,
        reviewDateTime,
      ],
    );
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};

exports.retrieve = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM Bids;`);
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
