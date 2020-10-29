const bcrypt = require('bcrypt');
const db = require('../db');

const { errorCodes, messages } = require('../constants');

// Signup
exports.create_user = async (req, res, next) => {
  const {
    accountType,
    caretakerType,
    username,
    email,
    name,
    password,
    bio,
    phonenumber,
    address,
    postalcode,
    ccnumber,
    ccname,
    ccexpirydate,
    cccvvcode,
    caresForCategories,
  } = req.body;

  try {
    const passwordDigest = bcrypt.hash(password, 10);

    const result = await db.query(
      'SELECT * FROM insert_new_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
      [
        username,
        email,
        passwordDigest,
        name,
        bio,
        phonenumber,
        address,
        postalcode,
        ccnumber,
        ccname,
        ccexpirydate,
        cccvvcode,
        caresForCategories,
        accountType,
        caretakerType,
      ],
    );

    const newUser = result.rows[0]; // Assumption: Only one user inserted
    res.json({
      success: `New account created! Username: ${newUser.username}; Email: ${newUser.email}`,
      ...newUser,
      categories: newUser.categories.filter((categoryName) => categoryName !== null), // Empty array if no categories inserted
    });
  } catch (err) {
    console.error(err);
    if (err.code === errorCodes.DUPLICATE_KEY_VALUE) {
      res.status(400).json({ error: messages.DUPLICATE_USER });
      return;
    }
    // TODO: check if other errors are possible
    next(err);
  }
};

// Delete user
exports.delete_user = async (req, res) => {
  try {
    const { username } = req.params;
    const result = await db.query('UPDATE app_user SET deletedAt = NOW() WHERE username = $1', [
      username,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.json({ error: 'An unexpected error occurred' });
  }
};

// Admin Signup

exports.create_admin_user = async (req, res, next) => {
  const { username, email, password, name } = req.body;
  try {
    const passwordDigest = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO PCS_Administrator VALUES ($1, $2, $3, $4, NULL, NOW()) RETURNING username, email, name',
      [username, email, passwordDigest, name],
    );

    const newUser = result.rows[0]; // Assumption: Only one row
    res.json({
      success: `New admin account for "${newUser.username}" created!`,
      ...newUser,
    });
  } catch (err) {
    if (err.code === errorCodes.DUPLICATE_KEY_VALUE) {
      res.status(400).json({ error: messages.DUPLICATE_USER });
      return;
    }
    next(err);
  }
};