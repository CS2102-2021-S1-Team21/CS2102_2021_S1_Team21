const _ = require('lodash');

const db = require('../db');
const { errorCodes, errorDetails, messages } = require('../constants');

exports.index = async (req, res, next) => {
  // Assumption: petOwnerUsername exists in database
  const { petOwnerUsername } = req.params;
  try {
    const result = await db.query(
      `
        SELECT P.*, ARRAY_AGG(ARRAY[R.requirementType, R.description]) AS requirements
        FROM Pet P LEFT OUTER JOIN Requirement R ON P.petOwnerUsername = R.petOwnerUsername AND P.name = R.petName
        WHERE P.petOwnerUsername = $1 AND deletedAt IS NULL
        GROUP BY P.petOwnerUsername, P.name
        ORDER BY name
      `,
      [petOwnerUsername],
    );
    res.json({
      totalCount: result.rowCount,
      rows: result.rows.map((row) => ({
        ..._.omit(row, 'deletedat'),
        requirements: row.requirements
          .filter((r) => r[0] !== null) // ignore nulls from ARRAY[] function
          .map((requirement) => ({
            requirementtype: requirement[0],
            description: requirement[1],
          })),
      })),
    });
  } catch (err) {
    next(err);
  }
};

exports.view = async (req, res, next) => {
  const { petOwnerUsername, petName } = req.params;
  try {
    const result = await db.query(
      'SELECT *, age(yearOfBirth) FROM Pet WHERE petOwnerUsername = $1 AND name = $2 AND deletedAt IS NULL',
      [petOwnerUsername, petName],
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: messages.PET_NOT_FOUND });
      return;
    }
    const requirementsResult = await db.query(
      'SELECT requirementtype, description FROM Requirement WHERE petOwnerUsername = $1 AND petName = $2',
      [petOwnerUsername, petName],
    );
    res.json({ ..._.omit(result.rows[0], 'deletedat'), requirements: requirementsResult.rows });
  } catch (err) {
    next(err);
  }
};

exports.new = async (req, res, next) => {
  const {
    petOwnerUsername,
    name,
    yearofbirth,
    breed,
    gender,
    categoryname,
    requirements,
  } = req.body;

  const client = await db.connect();
  try {
    // Start of transaction
    await client.query('BEGIN');
    const petResult = await client.query(
      'INSERT INTO Pet VALUES ($1, $2, $3, $4, NULL, $5, $6) RETURNING *',
      [petOwnerUsername, name, yearofbirth, breed, gender, categoryname],
    );
    const insertedPet = petResult.rows[0];
    const insertedRequirements = await Promise.all(
      requirements.map(async (requirement) => {
        const data = await client.query(
          'INSERT INTO Requirement VALUES ($1, $2, $3, $4) RETURNING requirementtype, description',
          [
            requirement.requirementtype,
            requirement.description,
            insertedPet.name,
            insertedPet.petownerusername,
          ],
        );
        return data.rows[0];
      }),
    );
    await client.query('COMMIT');
    // End of transaction
    res.json({ ..._.omit(insertedPet, 'deletedat'), requirements: insertedRequirements });
  } catch (err) {
    await client.query('ROLLBACK');
    if (err.code === errorCodes.DUPLICATE_KEY_VALUE) {
      if (err.detail.startsWith(errorDetails.PET_DUPLICATE_KEY)) {
        // Assumption: Only pet owners will add pets for themselves
        res.status(400).json({ error: messages.DUPLICATE_PET });
      } else if (err.detail.startsWith(errorDetails.REQUIREMENT_DUPLICATE_KEY)) {
        res.status(400).json({ error: messages.DUPLICATE_PET_REQUIREMENT });
      }
      return;
    }
    // TODO: handle 'No such gender / category' errors
    next(err);
  } finally {
    client.release();
  }
};

exports.edit = async (req, res, next) => {
  const { petOwnerUsername, petName } = req.params;
  // Note: Not allowed to change petOwnerUsername
  const { name, yearofbirth, breed, gender, categoryname, requirements } = req.body;

  // TODO: check what happens if this errors out
  const client = await db.connect();
  try {
    // Start of transaction
    await client.query('BEGIN');
    const petResult = await client.query(
      `
        UPDATE Pet 
        SET name = $3, yearOfBirth = $4, breed = $5, gender = $6, categoryName = $7
        WHERE petOwnerUsername = $1 AND name = $2 AND deletedAt IS NULL
        RETURNING *
      `,
      [petOwnerUsername, petName, name, yearofbirth, breed, gender, categoryname],
    );
    if (petResult.rowCount === 0) {
      await client.query('ROLLBACK');
      res.status(404).json({ error: messages.PET_NOT_FOUND });
      return;
    }

    const updatedPet = petResult.rows[0];
    // Delete all existing requirements (to avoid duplicate entries)
    await client.query(`DELETE FROM Requirement WHERE petOwnerUsername = $1 AND petName = $2`, [
      updatedPet.petownerusername,
      updatedPet.name,
    ]);
    // Add new/updated requirements based on API request
    const updatedRequirements = await Promise.all(
      requirements.map(async (requirement) => {
        const insertResult = await client.query(
          'INSERT INTO Requirement VALUES ($1, $2, $3, $4) RETURNING requirementtype, description',
          [
            requirement.requirementtype,
            requirement.description,
            updatedPet.name,
            updatedPet.petownerusername,
          ],
        );
        return insertResult.rows[0];
      }),
    );
    await client.query('COMMIT');
    // End of transaction
    res.json({ ..._.omit(updatedPet, 'deletedat'), requirements: updatedRequirements });
  } catch (err) {
    await client.query('ROLLBACK');
    if (err.code === errorCodes.DUPLICATE_KEY_VALUE) {
      if (err.detail.startsWith(errorDetails.PET_DUPLICATE_KEY)) {
        res.status(400).json({ error: messages.DUPLICATE_PET });
      } else if (err.detail.startsWith(errorDetails.REQUIREMENT_DUPLICATE_KEY)) {
        res.status(400).json({ error: messages.DUPLICATE_PET_REQUIREMENT });
      }
      return;
    }
    // TODO: handle 'No such gender / category' errors
    next(err);
  } finally {
    client.release();
  }
};

exports.delete = async (req, res, next) => {
  // TODO: add deletedAt to primary key (so that they can re-add pets with same name)
  const { petOwnerUsername, petName } = req.params;
  try {
    // Note: Requirements are not deleted from database (only delete if DB admin decides to manually delete the pet)
    const result = await db.query(
      'UPDATE Pet SET deletedAt = NOW() WHERE petOwnerUsername = $1 AND name = $2 AND deletedAt IS NULL RETURNING *',
      [petOwnerUsername, petName],
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: messages.PET_NOT_FOUND });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.retrieve = async (req, res) => {
  try {
    const { petOwnerUsername } = req.params;
    const result = await db.query(`SELECT * FROM pet WHERE petOwnerUsername = $1`, [
      petOwnerUsername,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR: ', err.message);
    res.json({ error: 'An unexpected error occurred' });
  }
};
