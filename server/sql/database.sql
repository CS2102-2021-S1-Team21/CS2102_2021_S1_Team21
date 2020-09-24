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
INSERT INTO pet_owners VALUES ('notaphoenix@gmail.com', 'mushu');
INSERT INTO pet_owners VALUES ('theexplorer@gmail.com', 'dora');
