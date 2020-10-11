const _ = require('lodash');

const db = require('../db');
const { DUPLICATE_KEY_VALUE_ERR_CODE } = require('../constants');

exports.index = async (req, res, next) => {
  // Assumption: petOwnerUsername exists in database
  const { petOwnerUsername } = req.params;
  try {
    const result = await db.query(
      `
        SELECT * FROM Pet 
        WHERE petOwnerUsername = $1 AND deletedAt IS NULL
        ORDER BY name
      `,
      [petOwnerUsername],
    );
    res.json({
      totalCount: result.rowCount,
      rows: result.rows.map((row) => _.omit(row, 'deletedat')),
    });
  } catch (err) {
    next(err);
  }
};

// Note: Unused method
exports.view = async (req, res, next) => {
  const { petOwnerUsername, petName } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM Pet WHERE petOwnerUsername = $1 AND name = $2 AND deletedAt IS NULL',
      [petOwnerUsername, petName],
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Pet not found' });
      return;
    }
    res.json(_.omit(result.rows[0], 'deletedat'));
  } catch (err) {
    next(err);
  }
};

exports.new = async (req, res, next) => {
  // TODO: check params
  const { petOwnerUsername, name, yearofbirth, breed, gender, categoryname } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Pet VALUES ($1, $2, $3, $4, NULL, $5, $6) RETURNING *',
      [petOwnerUsername, name, yearofbirth, breed, gender, categoryname],
    );
    res.json(_.omit(result.rows[0], 'deletedat'));
  } catch (err) {
    if (err.code === DUPLICATE_KEY_VALUE_ERR_CODE) {
      // Assumption: Only pet owners will add pets for themselves
      res.status(400).json({ error: 'Pet with same name already exists' });
      return;
    }
    // TODO: handle 'No such gender / category' errors
    next(err);
  }
};

exports.edit = async (req, res, next) => {
  const { petOwnerUsername, petName } = req.params;
  // Note: Not allowed to change petOwnerUsername
  const { name, yearofbirth, breed, gender, categoryname } = req.body;
  try {
    const result = await db.query(
      `
        UPDATE Pet 
        SET name = $3, yearOfBirth = $4, breed = $5, gender = $6, categoryName = $7
        WHERE petOwnerUsername = $1 AND name = $2 AND deletedAt IS NULL
        RETURNING *
      `,
      [petOwnerUsername, petName, name, yearofbirth, breed, gender, categoryname],
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Pet not found' });
      return;
    }
    res.json(_.omit(result.rows[0], 'deletedat'));
  } catch (err) {
    if (err.code === DUPLICATE_KEY_VALUE_ERR_CODE) {
      res.status(400).json({ error: 'Pet with same name already exists' });
      return;
    }
    // TODO: handle 'No such gender / category' errors
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  // TODO: add deletedAt to primary key (so that they can re-add pets with same name)
  const { petOwnerUsername, petName } = req.params;
  try {
    const result = await db.query(
      'UPDATE Pet SET deletedAt = NOW() WHERE petOwnerUsername = $1 AND name = $2 AND deletedAt IS NULL RETURNING *',
      [petOwnerUsername, petName],
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Pet not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};
