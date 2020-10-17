const _ = require('lodash');

const db = require('../db');
const {
  DUPLICATE_KEY_VALUE_ERR_CODE,
  PET_DUPLICATE_KEY_ERR_DETAIL,
  REQUIREMENT_DUPLICATE_KEY_ERR_DETAIL,
} = require('../constants');

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
    if (err.code === DUPLICATE_KEY_VALUE_ERR_CODE) {
      if (err.detail.startsWith(PET_DUPLICATE_KEY_ERR_DETAIL)) {
        // Assumption: Only pet owners will add pets for themselves
        res.status(400).json({ error: 'Pet with same name already exists' });
      } else if (err.detail.startsWith(REQUIREMENT_DUPLICATE_KEY_ERR_DETAIL)) {
        res
          .status(400)
          .json({ error: 'Pet cannot have two requirements with the same requirement type' });
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
      res.status(404).json({ error: 'Pet not found' });
      return;
    }
    const updatedPet = petResult.rows[0];

    // Delete any requirements that were not sent in API request
    await client.query(
      `DELETE FROM Requirement WHERE petOwnerUsername = $1 AND petName = $2 AND NOT requirementtype = ANY ($3)`,
      [
        updatedPet.petownerusername,
        updatedPet.name,
        requirements.map((requirement) => requirement.requirementtype),
      ],
    );
    // Update all other requirements based on API request
    const updatedRequirements = await Promise.all(
      requirements.map(async (requirement) => {
        // FIXME: duplicate updates
        const updateResult = await client.query(
          `
              UPDATE Requirement 
              SET requirementType = $3, description = $4 
              WHERE petOwnerUsername = $1 AND petName = $2 AND requirementType = $3
              RETURNING requirementtype, description
            `,
          [
            updatedPet.petownerusername,
            updatedPet.name,
            requirement.requirementtype,
            requirement.description,
          ],
        );
        if (updateResult.rowCount !== 0) {
          return updateResult.rows[0];
        }
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
    if (err.code === DUPLICATE_KEY_VALUE_ERR_CODE) {
      if (err.detail.startsWith(PET_DUPLICATE_KEY_ERR_DETAIL)) {
        res.status(400).json({ error: 'Pet with same name already exists' });
      } else if (err.detail.startsWith(REQUIREMENT_DUPLICATE_KEY_ERR_DETAIL)) {
        res
          .status(400)
          .json({ error: 'Pet cannot have two requirements with the same requirement type' });
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
      res.status(404).json({ error: 'Pet not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};
