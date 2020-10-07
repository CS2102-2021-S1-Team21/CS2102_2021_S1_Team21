CREATE DATABASE cs2102;

/**
CREATE TABLE here
**/

/* 
 * This is a dummy table for demo purposes. `psql < database.sql`
 */
CREATE TABLE pet_owners
(
  email VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
);

CREATE TABLE AppUser
(
  username VARCHAR PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  passwordDigest VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  deletedAt TIMESTAMP,
  bio VARCHAR,
  phoneNumber VARCHAR NOT NULL,
  address VARCHAR NOT NULL,
  postalCode VARCHAR NOT NULL
);

