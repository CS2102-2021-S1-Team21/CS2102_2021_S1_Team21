const db = require('../db');

const { messages, errorCodes } = require('../constants');

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
      totalAmount
    } = req.body;
    const result = await db.query(
      'INSERT INTO Bids (petName, petOwnerUsername, caretakerUsername, dailyPrice, submittedAt, startDate, endDate, transferType, remarks, totalAmount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
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
        totalAmount
      ],
    );
    console.log(result.rows);
    res.json({ success: `Bid applied successfully!`, result: result.rows });
  } catch (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    }
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

exports.updateBids = async (req, res, next) => {
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
    console.log(result.rows.transactiondatetime);
    res.json({ success: 'Bid successfully updated!', result: result.rows });
  } catch (err) {
    if (err.code === errorCodes.TRANSACTION_DATE_TIME_NOT_VALID_DATETIME) {
      console.error('ERROR: ', err.message);

      res.status(400).json({ error: messages.PAYMENT_NOT_DONE });
      return;
    }
    next(err);

    // res.json({ error: 'An unexpected error occurred' });
  }
};

exports.delete = async (req, res) => {
  try {
    const {
      petName,
      petOwnerUsername,
      caretakerUsername,
      submittedAt,
      startDate,
      endDate,
    } = req.params;
    const result = await db.query(
      `DELETE FROM Bids
       WHERE petname = $1 
         AND petOwnerUsername = $2
         AND caretakerUsername = $3
         AND submittedAt = $4
         AND startDate = DATE($5) 
         AND endDate = DATE($6)
       RETURNING *`,
      [petName, petOwnerUsername, caretakerUsername, submittedAt, startDate, endDate],
    );
    if (result.rowCount === 0) {
      res.json({
        error: 'Unable to delete bid',
      });
      return;
    }
    res.json({
      success: 'Bid successfully deleted!',
    });
  } catch (err) {
    res.json({
      error: 'An unexpected error occurred',
    });
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
